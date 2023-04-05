import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setToast } from "store/toastSlice";
import { Notification, User } from "types";
import { theme } from "themes";
import styled from "styled-components";
import Icon from "components/atoms/Icon";
import Text from "components/atoms/Text";
import DropdownMenu from "components/molecules/DropdownMenu";
import { formatDistance } from "date-fns";
import { ja } from "date-fns/locale";
import axios from "axios";

const NotificationRoot = styled.article`
  position: relative;
  display: block;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  cursor: pointer;
`;

const NotificationWrapper = styled.div`
  padding: 16px;
  display: flex;
`;

const NotificationUserAvatarContainer = styled.div`
  flex-grow: 0;
  flex-basis: 40px;
  margin-right: 12px;
  align-items: center;
  @media screen and (min-width: 1024px) {
    flex-basis: 48px;
  }
`;

const NotificationContentContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0px;
  justify-content: center;
  font-size: 14px;
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const NotificationUserAvatar = styled.div`
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

const NotificationContentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 5px;
`;

const NotificationUser = styled.div``;

const NotificationMore = styled.div`
  color: ${({ theme }) => theme.colors.subtext};
  border-radius: 50%;
  transition: background-color 0.3s linear;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const NotificationContentCenter = styled.div`
  margin-bottom: 10px;
`;

const NotificationDesc = styled.div`
  white-space: pre-wrap;
  margin-bottom: 10px;
`;

const NotificationDropDownContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 250px;
`;

type NotificationProps = {
  notification: Notification;
  user: User;
};

const Notification = (props: NotificationProps) => {
  const { notification, user } = props;
  const IMAGE_FOLDER = process.env.NEXT_PUBLIC_IMAGE_FOLDER;
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const currentUserid = authUser?._id || "";
  const [follow, setFollow] = useState(user.followers.includes(currentUserid));
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("mousedown", handleDropdownClose);
    return () => document.removeEventListener("mousedown", handleDropdownClose);
  }, []);

  const time = (() => {
    if (typeof notification.createdAt === "string") {
      return formatDistance(new Date(), Date.parse(notification.createdAt), {
        locale: ja,
      });
    } else {
      return "";
    }
  })();

  const menu = [
    {
      item: follow ? "フォロー解除" : "フォロー",
      onclick: async () => {
        const result = await axios
          .put(
            `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/users/${authUser?._id}/follow`,
            {
              targetUserid: notification.useridSend,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then((response) => response.data);
        if (result.success) {
          setFollow(!follow);
          dispatch(
            setToast({
              open: true,
              type: "success",
              message: result.message,
            })
          );
        }
      },
    },
  ];

  const handleDropdownOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShowDropdown(true);
  };

  const handleDropdownClose = (event: Event) => {
    event.stopPropagation();
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  return (
    <NotificationRoot
      onClick={() =>
        notification.postid
          ? router.push(`/status/${notification.postid}`)
          : router.push(`/profile/${user._id}`)
      }
    >
      <NotificationWrapper>
        <NotificationUserAvatarContainer>
          <NotificationUserAvatar
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/profile/${user._id}`);
            }}
          >
            <Image
              src={IMAGE_FOLDER + user.profilePicture}
              alt=""
              fill
              sizes="auto"
            />
          </NotificationUserAvatar>
        </NotificationUserAvatarContainer>
        <NotificationContentContainer>
          <NotificationContentTop>
            <NotificationUser>
              <Text color={theme.colors.subtext}>{time}</Text>
            </NotificationUser>
            <NotificationMore onClick={handleDropdownOpen}>
              <Icon iconType="MoreHoriz" fontSize="18px" />
            </NotificationMore>
          </NotificationContentTop>
          <NotificationContentCenter>
            <NotificationDesc>
              <Text color={theme.colors.text} fontWeight="550">
                {user.name}
              </Text>
              <Text color={theme.colors.text}>さんが{notification.desc}</Text>
            </NotificationDesc>
            <NotificationDesc>
              <Text color={theme.colors.subtext}>{notification.postDesc}</Text>
            </NotificationDesc>
          </NotificationContentCenter>
        </NotificationContentContainer>
      </NotificationWrapper>
      {showDropdown && (
        <NotificationDropDownContainer ref={dropdownRef}>
          <DropdownMenu menu={menu} />
        </NotificationDropDownContainer>
      )}
    </NotificationRoot>
  );
};

export default Notification;
