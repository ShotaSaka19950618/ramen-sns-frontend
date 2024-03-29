import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setAuthUser } from "store/authSlice";
import { setShare, setSetting } from "store/menuSlice";
import type { Menu } from "types";
import { theme } from "themes";
import styled from "styled-components";
import AppLogo from "components/atoms/AppLogo";
import Icon from "components/atoms/Icon";
import IconButton from "components/molecules/IconButton";
import DropdownMenu from "components/molecules/DropdownMenu";
import { destroyCookie } from "nookies";

type SidebarLinkItemProps = {
  active: boolean;
};

const SidebarRoot = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const SidebarNav = styled.nav`
  display: block;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
`;

const SidebarLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SidebarLogo = styled.div`
  width: 50px;
  height: 50px;
`;

const SidebarLinkList = styled.ul`
  list-style: none;
`;

const SidebarLinkItem = styled.li<SidebarLinkItemProps>`
  color: ${({ theme }) => theme.colors.black};
  font-size: 30px;
  display: flex;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
  transition: background-color 0.3s linear;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryActive};
  }
`;

const SidebarShareButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SidebarUserWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SidebarUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryActive};
  }
`;

const SidebarUserAvatar = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  width: 48px;
  height: 48px;
`;

const SideberDropDownContainer = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50px;
  width: 250px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
`;

const SidebarMobile = () => {
  const IMAGE_FOLDER = process.env.NEXT_PUBLIC_IMAGE_FOLDER;
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = router.asPath;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleDropdownClose);
    return () => document.removeEventListener("mousedown", handleDropdownClose);
  }, []);

  const handleShareOpen = () => {
    dispatch(
      setShare({
        open: true,
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
  };

  const handleDropdownOpen = () => {
    setShowDropdown(true);
  };

  const handleDropdownClose = (event: Event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const menuList: Menu[] = [
    {
      iconType: "Home",
      action: () => {
        router.push("/");
      },
      text: "ホーム",
      active: currentPath === "/",
    },
    {
      iconType: "Notifications",
      action: () => {
        router.push("/notifications");
      },
      text: "通知",
      active: currentPath === "/notifications",
    },
    {
      iconType: "Bookmark",
      action: () => {
        router.push("/bookmark");
      },
      text: "ブックマーク",
      active: currentPath === "/bookmark",
    },
    {
      iconType: "Person",
      action: () => {
        router.push(`/profile/${authUser?._id}`);
      },
      text: "プロフィール",
      active: currentPath === `/profile/${authUser?._id}`,
    },
    {
      iconType: "Settings",
      action: () => {
        dispatch(
          setSetting({
            open: true,
          })
        );
      },
      text: "設定",
      active: false,
    },
  ];

  const dropdownMenu = [
    {
      item: "サインアウト",
      onclick: async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        dispatch(setAuthUser(null));
        destroyCookie(null, "accessToken");
      },
    },
  ];

  return (
    <SidebarRoot>
      <SidebarNav>
        <SidebarLogoWrapper>
          <SidebarLogo>
            <AppLogo color="blue" />
          </SidebarLogo>
        </SidebarLogoWrapper>
        <SidebarLinkList>
          {menuList.map((menu) => {
            return (
              <SidebarLinkItem
                active={menu.active}
                onClick={menu.action}
                key={menu.text}
              >
                <Icon
                  iconType={menu.iconType}
                  active={menu.active}
                  fontSize="30px"
                  width="30px"
                  height="30px"
                />
              </SidebarLinkItem>
            );
          })}
        </SidebarLinkList>
        <SidebarShareButton>
          <IconButton
            iconType="RamenDining"
            onClick={handleShareOpen}
            color={theme.colors.white}
            backgroundColor={theme.colors.primary}
            hbackgroundColor={theme.colors.primaryActive}
            width="90%"
            height="50px"
          />
        </SidebarShareButton>
        <SidebarUserWrapper>
          {authUser && (
            <SidebarUser onClick={handleDropdownOpen}>
              <SidebarUserAvatar>
                <Image
                  src={IMAGE_FOLDER + authUser.profilePicture}
                  alt=""
                  fill
                  sizes="auto"
                />
              </SidebarUserAvatar>
            </SidebarUser>
          )}
          {showDropdown && (
            <>
              <Modal />
              <SideberDropDownContainer ref={dropdownRef}>
                <DropdownMenu menu={dropdownMenu} />
              </SideberDropDownContainer>
            </>
          )}
        </SidebarUserWrapper>
      </SidebarNav>
    </SidebarRoot>
  );
};

export default SidebarMobile;
