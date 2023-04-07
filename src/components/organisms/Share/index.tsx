import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setTimeline, setTimelineAll } from "store/postsSlice";
import { setShare } from "store/menuSlice";
import { setToast } from "store/toastSlice";
import { theme } from "themes";
import styled from "styled-components";
import Icon from "components/atoms/Icon";
import Input from "components/atoms/Input";
import Text from "components/atoms/Text";
import TextArea from "components/atoms/TextArea";
import IconButton from "components/molecules/IconButton";
import ImagePreview from "components/molecules/ImagePreview";
import Separator from "components/atoms/Separator";
import { formatDistance } from "date-fns";
import { ja } from "date-fns/locale";
import axios from "axios";

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ShareRoot = styled.div`
  padding: 16px;
  display: block;
  background-color: #fff;
  overflow: scroll;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 1024px) {
    width: 80%;
    height: 80%;
    border-radius: 10px;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CloseButtonWrapper = styled.div`
  text-align: left;
  margin-bottom: 20px;
`;

const PostWrapper = styled.div`
  display: flex;
`;

const PostUserAvatarWrapper = styled.div`
  flex-grow: 0;
  flex-basis: 40px;
  margin-right: 12px;
  align-items: center;
  @media screen and (min-width: 1024px) {
    flex-basis: 48px;
  }
`;

const PostContentWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 0px;
  justify-content: center;
  font-size: 14px;
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const PostUserAvatar = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  @media screen and (min-width: 1024px) {
    width: 48px;
    height: 48px;
  }
`;

const PostContentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 5px;
`;

const PostUser = styled.div``;

const PostContentCenter = styled.div`
  display: block;
  margin-bottom: 10px;
`;

const PostShopname = styled.div`
  margin-bottom: 10px;
`;

const PostDesc = styled.div`
  white-space: pre-wrap;
  margin-bottom: 10px;
`;

const PostConectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  flex-grow: 0;
  flex-basis: 40px;
  margin-right: 12px;
  margin-bottom: 20px;
  align-items: center;
  @media screen and (min-width: 1024px) {
    flex-basis: 48px;
  }
`;

const PostConect = styled.span`
  width: 2px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.border};
`;

const ShareWrapper = styled.div`
  display: flex;
`;

const ShareUserAvatarWrapper = styled.div`
  flex-grow: 0;
  flex-basis: 40px;
  margin-right: 12px;
  align-items: center;
  @media screen and (min-width: 1024px) {
    flex-basis: 48px;
  }
`;

const ShareContentWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 0px;
  justify-content: center;
  font-size: 14px;
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const ShareUserAvatar = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  @media screen and (min-width: 1024px) {
    width: 48px;
    height: 48px;
  }
`;

type InputWrapperProps = {
  visible: boolean;
};

const InputWrapper = styled.div<InputWrapperProps>`
  height: 50px;
  display: ${({ visible }) => (visible ? "none" : "")};
`;

const TextAreaWrapper = styled.div`
  height: 150px;
`;

const ErrorMessageWrapper = styled.div`
  margin: 10px 0;
  width: 80%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageButtonWrapper = styled.div`
  flex: 1;
`;

const ShareButtonWrapper = styled.div`
  flex: 3;
`;

const ImageButtomIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.chat};
  width: 38px;
  height: 38px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.chatIcon};
  }
`;

type ShareFormData = {
  shopname: string;
  desc: string;
};

const Share = () => {
  const IMAGE_FOLDER = process.env.NEXT_PUBLIC_IMAGE_FOLDER;
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const share = useSelector((state: RootState) => state.menu.share);
  const dispatch = useDispatch();
  const [shopname, SetShopname] = useState(share.comment.shopname);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShareFormData>();

  const onSubmit = async (data: ShareFormData) => {
    const { shopname, desc } = data;
    const newPost = {
      userid: authUser?._id,
      shopname: shopname,
      desc: desc,
      img: "",
      commentsSend: share.comment.id,
    };
    if (file) {
      const fileName = `posts/${Date.now()}-${authUser?._id}`;
      newPost.img = fileName;
      const fileData = new FormData();
      fileData.append("name", fileName);
      fileData.append("file", file);

      await axios.post("/api/fileUpload", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authToken,
        },
      });
    }
    const result = await axios
      .post("/api/posts/post", newPost, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => response.data);
    if (result.success) {
      dispatch(
        setToast({
          open: true,
          type: "success",
          message: result.message,
        })
      );
      dispatch(
        setShare({
          open: false,
          comment: {
            id: "",
            shopname: "",
            desc: "",
            createdAt: "",
            name: "",
            username: "",
            profilePicture: "",
          },
        })
      );
      const timeline = await axios
        .post(
          `/api/posts/timeline`,
          {
            userid: authUser?._id,
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        )
        .then((response) => response.data);
      const timelineAll = await axios
        .post(
          `/api/posts/all`,
          {
            userid: authUser?._id,
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        )
        .then((response) => response.data);
      dispatch(setTimeline(timeline.data));
      dispatch(setTimelineAll(timelineAll.data));
    } else {
      setToast({
        open: true,
        type: "error",
        message: result.message,
      });
    }
  };

  const handlerShareClose = () => {
    dispatch(
      setShare({
        open: false,
        comment: {
          postid: "",
          postShopname: "",
          postDesc: "",
          userName: "",
          userUsername: "",
          userProfilePicture: "",
        },
      })
    );
  };

  const handleFileSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = e.target.files && e.target.files[0];
    e.target.value = "";
    setFile(fileObj);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  }, [file]);

  const time = (() => {
    if (!share.comment.id) {
      return;
    }
    if (typeof share.comment.createdAt === "string") {
      return formatDistance(new Date(), Date.parse(share.comment.createdAt), {
        locale: ja,
      });
    } else {
      return "";
    }
  })();

  return (
    <Modal>
      <ShareRoot>
        <CloseButtonWrapper>
          <Icon
            iconType="Close"
            fontSize="32px"
            width="38px"
            height="38px"
            hbackgroundColor={theme.colors.hover}
            onClick={handlerShareClose}
          />
        </CloseButtonWrapper>
        {share.comment.id && (
          <>
            <PostWrapper>
              <PostUserAvatarWrapper>
                <PostUserAvatar>
                  <Image
                    src={IMAGE_FOLDER + share.comment.profilePicture}
                    alt=""
                    fill
                    sizes="auto"
                  />
                </PostUserAvatar>
              </PostUserAvatarWrapper>
              <PostContentWrapper>
                <PostContentTop>
                  <PostUser>
                    <Text
                      color={theme.colors.text}
                      fontWeight="550"
                      marginRight="10px"
                    >
                      {share.comment.name}
                    </Text>
                    <Text color={theme.colors.subtext} marginRight="10px">
                      @{share.comment.username}
                    </Text>
                    <Text color={theme.colors.subtext}>・{time}</Text>
                  </PostUser>
                </PostContentTop>
                <PostContentCenter>
                  <PostShopname>
                    <Text>{share.comment.shopname}</Text>
                  </PostShopname>
                  <PostDesc>
                    <Text>{share.comment.desc}</Text>
                  </PostDesc>
                </PostContentCenter>
              </PostContentWrapper>
            </PostWrapper>
            <PostWrapper>
              <PostConectWrapper>
                <PostConect />
              </PostConectWrapper>
            </PostWrapper>
          </>
        )}
        <ShareWrapper>
          <ShareUserAvatarWrapper>
            <ShareUserAvatar>
              {authUser?.profilePicture && (
                <Image
                  src={IMAGE_FOLDER + authUser?.profilePicture}
                  alt=""
                  fill
                  sizes="auto"
                />
              )}
            </ShareUserAvatar>
          </ShareUserAvatarWrapper>
          <ShareContentWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputWrapper visible={!!share.comment.shopname}>
                <Input
                  {...register("shopname", {
                    required: {
                      value: true,
                      message: "店舗名が入力されていません",
                    },
                  })}
                  name="shopname"
                  type="text"
                  value={shopname}
                  placeholder="店舗名を入力..."
                  borderBottom={`1px solid ${theme.colors.border}`}
                  focusUnderline
                  onChange={(e) => SetShopname(() => e.target.value)}
                />
              </InputWrapper>
              <ErrorMessageWrapper>
                {errors.shopname && (
                  <Text color={theme.colors.danger}>
                    {errors.shopname.message}
                  </Text>
                )}
              </ErrorMessageWrapper>
              <TextAreaWrapper>
                <TextArea
                  {...register("desc", {
                    required: {
                      value: true,
                      message: "感想が入力されていません",
                    },
                    maxLength: {
                      value: 140,
                      message: "１４０文字以下で入力してください",
                    },
                  })}
                  name="desc"
                  placeholder="感想を入力..."
                  borderBottom={`1px solid ${theme.colors.border}`}
                  focusUnderline
                />
              </TextAreaWrapper>
              <ErrorMessageWrapper>
                {errors.desc && (
                  <Text color={theme.colors.danger}>{errors.desc.message}</Text>
                )}
              </ErrorMessageWrapper>
              {preview && (
                <>
                  <ImagePreview
                    src={preview}
                    alt=""
                    onRemove={handleFileRemove}
                  />
                  <Separator />
                </>
              )}
              <ButtonWrapper>
                <ImageButtonWrapper>
                  <ImageButtomIcon>
                    <label htmlFor="file">
                      <Icon iconType="Photo" fontSize="26px" />
                      <input
                        type="file"
                        id="file"
                        accept=".png, .jpeg, .jpg"
                        style={{ display: "none" }}
                        onChange={handleFileSet}
                      />
                    </label>
                  </ImageButtomIcon>
                </ImageButtonWrapper>
                <ShareButtonWrapper>
                  <IconButton
                    iconType="RamenDining"
                    color={theme.colors.white}
                    backgroundColor={theme.colors.primary}
                    hcolor={theme.colors.white}
                    hbackgroundColor={theme.colors.primaryActive}
                    onClick={handleSubmit(onSubmit)}
                  >
                    投稿
                  </IconButton>
                </ShareButtonWrapper>
              </ButtonWrapper>
            </form>
          </ShareContentWrapper>
        </ShareWrapper>
      </ShareRoot>
    </Modal>
  );
};

export default Share;
