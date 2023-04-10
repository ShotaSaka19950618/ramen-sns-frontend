import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setSetting } from "store/menuSlice";
import { setToast } from "store/toastSlice";
import { setReacquisition } from "store/dataSlice";
import { theme } from "themes";
import styled from "styled-components";
import Title from "components/atoms/Title";
import Icon from "components/atoms/Icon";
import axios from "axios";
import Input from "components/atoms/Input";
import Text from "components/atoms/Text";
import TextArea from "components/atoms/TextArea";
import Button from "components/atoms/Button";

const FormWrapper = styled.form`
  width: 100%;
`;

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

const SettingRoot = styled.div`
  display: block;
  background-color: #fff;
  overflow: scroll;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 1024px) {
    width: 50%;
    height: 85%;
    border-radius: 10px;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SettingTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const CloseButtonWrapper = styled.div`
  margin-right: 10px;
`;

const ProfileCover = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  margin-bottom: 80px;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ProfileCoverIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const ProfileAvatar = styled.div`
  position: absolute;
  left: 20px;
  top: 200px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #fff;
  z-index: 100;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ProfileAvatarIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const InputWrapper = styled.div`
  width: 90%;
  height: 50px;
  margin: 10px auto;
`;

const TextAreaWrapper = styled.div`
  width: 90%;
  height: 120px;
  margin: 10px auto;
`;

const ErrorMessageWrapper = styled.div`
  width: 90%;
  margin: 10px auto;
`;

const SettingBottom = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 30px;
  margin-bottom: 20px;
`;

type SettingFormData = {
  name: string;
  desc: string;
};

const Setting = () => {
  const IMAGE_FOLDER = process.env.NEXT_PUBLIC_IMAGE_FOLDER;
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const reacquisition = useSelector(
    (state: RootState) => state.data.reacquisition
  );
  const dispatch = useDispatch();

  const [name, SetName] = useState(authUser?.name);
  const [desc, SetDesc] = useState(authUser?.desc);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [coverPicture, setCoverPicture] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingFormData>();

  const onSubmit = async (data: SettingFormData) => {
    const { name, desc } = data;
    const newUser = {
      userid: authUser?._id,
      name: name,
      desc: desc,
      profilePicture: authUser?.profilePicture,
      coverPicture: authUser?.coverPicture,
    };

    // プロフィル画像アップロード
    if (profilePicture) {
      const fileName = `profile/${Date.now()}-${authUser?._id}`;
      newUser.profilePicture = fileName;
      const fileData = new FormData();
      fileData.append("name", fileName);
      fileData.append("file", profilePicture);
      await axios.post("/api/fileUpload", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authToken,
        },
      });
    }

    // カバー画像アップロード
    if (coverPicture) {
      const fileName = `cover/${Date.now()}-${authUser?._id}`;
      newUser.coverPicture = fileName;
      const fileData = new FormData();
      fileData.append("name", fileName);
      fileData.append("file", coverPicture);
      await axios.post("/api/fileUpload", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authToken,
        },
      });
    }

    // ユーザー情報更新
    const result = await axios
      .put("/api/users/put", newUser, {
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
      dispatch(setReacquisition(reacquisition + 1));
      handlerSettingClose();
    }
  };

  const handlerSettingClose = () => {
    dispatch(
      setSetting({
        open: false,
      })
    );
  };

  const handleCoverPictureSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = e.target.files && e.target.files[0];
    e.target.value = "";
    setCoverPicture(fileObj);
  };

  const handleProfilePictureSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = e.target.files && e.target.files[0];
    e.target.value = "";
    setProfilePicture(fileObj);
  };

  useEffect(() => {
    if (authUser) {
      if (profilePicture) {
        setProfilePreview(URL.createObjectURL(profilePicture));
      } else {
        setProfilePreview(IMAGE_FOLDER + authUser?.profilePicture);
      }
    }
  }, [IMAGE_FOLDER, authUser, profilePicture]);

  useEffect(() => {
    if (authUser) {
      if (coverPicture) {
        setCoverPreview(URL.createObjectURL(coverPicture));
      } else {
        setCoverPreview(IMAGE_FOLDER + authUser?.coverPicture);
      }
    }
  }, [IMAGE_FOLDER, authUser, coverPicture]);

  return (
    <Modal>
      <SettingRoot>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <SettingTop>
            <CloseButtonWrapper>
              <Icon
                iconType="Close"
                fontSize="32px"
                width="38px"
                height="38px"
                hbackgroundColor={theme.colors.hover}
                onClick={handlerSettingClose}
              />
            </CloseButtonWrapper>
            <Title fontSize="20px">プロフィールを編集</Title>
          </SettingTop>
          {authUser && (
            <ProfileCover>
              <ProfileCoverIcon>
                <label htmlFor="profileCover">
                  <Icon
                    iconType="AddAPhoto"
                    color={theme.colors.white}
                    fontSize="42px"
                    width="64px"
                    height="64px"
                    backgroundColor="rgba(0, 0, 0, 0.6)"
                    hbackgroundColor="rgba(0, 0, 0, 0.3)"
                  />
                  <input
                    type="file"
                    id="profileCover"
                    accept=".png, .jpeg, .jpg"
                    style={{ display: "none" }}
                    onChange={handleCoverPictureSet}
                  />
                </label>
              </ProfileCoverIcon>
              <Image
                src={coverPreview}
                alt=""
                fill
                sizes="auto"
                priority
                style={{ objectFit: "cover" }}
              />
              <ProfileAvatar>
                <ProfileAvatarIcon>
                  <label htmlFor="coverPicture">
                    <Icon
                      iconType="AddAPhoto"
                      color={theme.colors.white}
                      fontSize="32px"
                      width="50px"
                      height="50px"
                      backgroundColor="rgba(0, 0, 0, 0.6)"
                      hbackgroundColor="rgba(0, 0, 0, 0.3)"
                    />
                    <input
                      type="file"
                      id="coverPicture"
                      accept=".png, .jpeg, .jpg"
                      style={{ display: "none" }}
                      onChange={handleProfilePictureSet}
                    />
                  </label>
                </ProfileAvatarIcon>
                <Image
                  src={profilePreview}
                  alt=""
                  fill
                  sizes="auto"
                  priority
                  style={{ objectFit: "cover" }}
                />
              </ProfileAvatar>
            </ProfileCover>
          )}
          <InputWrapper>
            <Input
              {...register("name", {
                required: {
                  value: true,
                  message: "ユーザー名が入力されていません",
                },
              })}
              name="name"
              type="text"
              value={name}
              placeholder="ユーザー名"
              borderBottom={`1px solid ${theme.colors.border}`}
              focusUnderline
              onChange={(e) => SetName(() => e.target.value)}
            />
          </InputWrapper>
          <ErrorMessageWrapper>
            {errors.name && (
              <Text color={theme.colors.danger}>{errors.name.message}</Text>
            )}
          </ErrorMessageWrapper>
          <TextAreaWrapper>
            <TextArea
              {...register("desc", {
                maxLength: {
                  value: 70,
                  message: "７０文字以下で入力してください",
                },
              })}
              name="desc"
              value={desc}
              placeholder="自己紹介"
              borderBottom={`1px solid ${theme.colors.border}`}
              focusUnderline
              onChange={(e) => SetDesc(() => e.target.value)}
            />
          </TextAreaWrapper>
          <ErrorMessageWrapper>
            {errors.desc && (
              <Text color={theme.colors.danger}>{errors.desc.message}</Text>
            )}
          </ErrorMessageWrapper>
          <SettingBottom>
            <Button
              width="150px"
              height="30px"
              color={theme.colors.white}
              backgroundColor={theme.colors.black}
              hbackgroundColor={theme.colors.hover}
              onClick={handleSubmit(onSubmit)}
            >
              保存
            </Button>
          </SettingBottom>
        </FormWrapper>
      </SettingRoot>
    </Modal>
  );
};

export default Setting;
