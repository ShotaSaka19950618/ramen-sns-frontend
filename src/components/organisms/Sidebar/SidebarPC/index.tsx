import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "store";
import { MenuState } from "store/menuSlice";
import { PostsState, setShareOpen } from "store/postsSlice";
import type { Menu } from "types";
import styled from "styled-components";
import AppLogo from "components/atoms/AppLogo";
import Icon from "components/atoms/Icon";
import IconButton from "components/molecules/IconButton";

type SidebarLinkItemProps = {
  active: boolean;
};

type SidebarLinkTextProps = {
  active: boolean;
};

const SidebarRoot = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-width: 245px;
`;

const SidebarNav = styled.nav`
  display: block;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
`;

const SidebarLogo = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 100px;
  width: 50px;
  height: 50px;
`;

const SidebarLinkList = styled.ul`
  list-style: none;
`;
const SidebarLinkItem = styled.li<SidebarLinkItemProps>`
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 70px;
  transition: background-color 0.3s linear;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryActive};
  }
`;

const SidebarLinkText = styled.span<SidebarLinkTextProps>`
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  padding-left: 10px;
`;

const SidebarPC = () => {
  const { menu, posts } = useSelector<
  AppState,
  { menu: MenuState; posts: PostsState }
  >((state) => ({
    menu: state.menu,
    posts: state.posts,
  }));
  const dispatch = useDispatch();

  const handlerShareOpen = () => {
    dispatch(setShareOpen(!posts.shareOpen));
  };

  return (
    <SidebarRoot>
      <SidebarNav>
        <SidebarLogo>
          <AppLogo color="white" />
        </SidebarLogo>
        <SidebarLinkList>
          {menu.List.map((menu: Menu) => {
            return (
              <Link href={menu.url} key={menu.text}>
                <SidebarLinkItem active={menu.active}>
                  <Icon
                    iconType={menu.iconType}
                    active={menu.active}
                    fontSize="30px"
                    width="30px"
                    height="30px"
                  />
                  <SidebarLinkText active={menu.active}>
                    {menu.text}
                  </SidebarLinkText>
                </SidebarLinkItem>
              </Link>
            );
          })}
        </SidebarLinkList>
        <IconButton iconType="RamenDining" onClick={handlerShareOpen}>
          今日の一杯
        </IconButton>
      </SidebarNav>
    </SidebarRoot>
  );
};

export default SidebarPC;
