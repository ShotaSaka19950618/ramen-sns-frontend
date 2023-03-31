import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setMenuOpen, setMenuList } from "store/menuSlice";

const useGetMenu = (): void => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const menuList = useSelector((state: RootState) => state.menu.List);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = router.pathname;

  useEffect(() => {
    if (authUser) {
      const newMenuList = menuList.map((menu) => {
        return menu.text === "プロフィール"
          ? { ...menu, url: `/profile/${authUser._id}` }
          : { ...menu };
      });
      if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
        dispatch(setMenuList(newMenuList));
      }
    }
  }, [dispatch, authUser, menuList]);

  useEffect(() => {
    if (currentPath === "/") {
      const newMenuList = menuList.map((menu) => {
        return menu.text === "ホーム"
          ? { ...menu, active: true }
          : { ...menu, active: false };
      });
      if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
        dispatch(setMenuOpen("ホーム"));
        dispatch(setMenuList(newMenuList));
      }
    }

    if (currentPath === "/notifications") {
      const newMenuList = menuList.map((menu) => {
        return menu.text === "通知"
          ? { ...menu, active: true }
          : { ...menu, active: false };
      });
      if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
        dispatch(setMenuOpen("通知"));
        dispatch(setMenuList(newMenuList));
      }
    }

    if (currentPath === "/bookmark") {
      const newMenuList = menuList.map((menu) => {
        return menu.text === "ブックマーク"
          ? { ...menu, active: true }
          : { ...menu, active: false };
      });
      if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
        dispatch(setMenuOpen("ブックマーク"));
        dispatch(setMenuList(newMenuList));
      }
    }

    if (currentPath === "/settings") {
      const newMenuList = menuList.map((menu) => {
        return menu.text === "設定"
          ? { ...menu, active: true }
          : { ...menu, active: false };
      });
      if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
        dispatch(setMenuOpen("設定"));
        dispatch(setMenuList(newMenuList));
      }
    }

    if (currentPath.indexOf("/status") !== -1) {
      const newMenuList = menuList.map((menu) => {
        return { ...menu, active: false };
      });
      if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
        dispatch(setMenuOpen("投稿"));
        dispatch(setMenuList(newMenuList));
      }
    }
  }, [dispatch, authUser, currentPath, menuList]);
};

export default useGetMenu;
