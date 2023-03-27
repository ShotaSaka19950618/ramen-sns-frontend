import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import {
  setAuthUser,
  setToken,
  setIsLoading,
  setIsSigninLoading,
} from "store/authSlice";
import { setMenuList } from "store/menuSlice";
import axios from "axios";
import { parseCookies } from "nookies";

const useAuthGuard = (): void => {
  const accessToken = parseCookies().accessToken;
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const menuList = useSelector((state: RootState) => state.menu.List);
  const router = useRouter();
  const redirectTopPage = useCallback(() => {
    router.push("/");
  }, [router]);
  const redirectSigninPage = useCallback(() => {
    router.push("/signin");
  }, [router]);
  const currentPath = router.pathname;

  useEffect(() => {
    if (!authUser) {
      if (currentPath === "/signin" || currentPath === "/register") {
        dispatch(setIsSigninLoading(true));
        if (accessToken) {
          const getAuthUser = async () => {
            const authUser = await axios
              .post(
                "/api/auth/user",
                {},
                {
                  headers: {
                    Authorization: accessToken,
                  },
                }
              )
              .then((response) => response.data);
            if (authUser.success) {
              dispatch(setToken(accessToken));
              dispatch(setAuthUser(authUser.data));
              const newMenuList = menuList.map((menu) => {
                return menu.text === "プロフィール"
                  ? { ...menu, url: `/profile/${authUser.data._id}` }
                  : menu;
              });
              dispatch(setMenuList(newMenuList));
              redirectTopPage();
            } else {
              dispatch(setIsSigninLoading(false));
            }
          };
          getAuthUser();
        } else {
          dispatch(setIsSigninLoading(false));
        }
      } else {
        dispatch(setIsLoading(true));
        if (accessToken) {
          const getAuthUser = async () => {
            const authUser = await axios
              .post(
                "/api/auth/user",
                {},
                {
                  headers: {
                    Authorization: accessToken,
                  },
                }
              )
              .then((response) => response.data);
            if (authUser.success) {
              dispatch(setToken(accessToken));
              dispatch(setAuthUser(authUser.data));
              const newMenuList = menuList.map((menu) => {
                return menu.text === "プロフィール"
                  ? { ...menu, url: `/profile/${authUser.data._id}` }
                  : menu;
              });
              dispatch(setMenuList(newMenuList));
              dispatch(setIsLoading(false));
            } else {
              redirectSigninPage();
            }
          };
          getAuthUser();
        } else {
          redirectSigninPage();
        }
      }
    }
  }, [
    dispatch,
    redirectSigninPage,
    redirectTopPage,
    authUser,
    accessToken,
    menuList,
    currentPath,
  ]);
};

export default useAuthGuard;
