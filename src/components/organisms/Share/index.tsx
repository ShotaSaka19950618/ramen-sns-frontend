import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setTimeline, setShareOpen } from "store/postsSlice";
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
import axios from "axios";

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ShareRoot = styled.div`
  padding: 16px;
  display: block;
  background-color: #fff;
  width: 60%;
  height: 60%;
  border-radius: 10px;
  overflow: scroll;

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

const ShareWrapper = styled.div`
  display: flex;
`;

const ShareUserAvatarWrapper = styled.div`
  flex-grow: 0;
  flex-basis: 48px;
  margin-right: 12px;
  align-items: center;
`;

const ShareContentWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 0px;
  justify-content: center;
`;

const ShareUserAvatar = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  overflow: hidden;
  width: 54px;
  height: 54px;
`;

const InputWrapper = styled.div`
  height: 50px;
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
  const dispatch = useDispatch();
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
      dispatch(setShareOpen(false));
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
      dispatch(setTimeline(timeline.data));
    } else {
      setToast({
        open: true,
        type: "error",
        message: result.message,
      });
    }
  };

  const handlerShareClose = () => {
    dispatch(setShareOpen(false));
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
              <InputWrapper>
                <Input
                  {...register("shopname", {
                    required: {
                      value: true,
                      message: "店舗名が入力されていません",
                    },
                  })}
                  name="shopname"
                  type="text"
                  placeholder="店舗名を入力..."
                  borderBottom={`1px solid ${theme.colors.border}`}
                  focusUnderline
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
