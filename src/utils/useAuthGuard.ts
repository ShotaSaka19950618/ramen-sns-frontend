import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "store";
import {
  AuthState,
  setAuthUser,
  setToken,
  setIsLoading,
  setIsSigninLoading,
} from "store/authSlice";
import axios from "axios";
import { parseCookies } from "nookies";

const useAuthGuard = (): void => {
  const router = useRouter();
  const accessToken = parseCookies().accessToken;
  const dispatch = useDispatch();
  const { auth } = useSelector<AppState, { auth: AuthState }>((state) => ({
    auth: state.auth,
  }));
  const redirectTopPage = useCallback(() => {
    router.push("/");
  }, [router]);
  const redirectSigninPage = useCallback(() => {
    router.push("/signin");
  }, [router]);
  const currentPath = router.pathname;

  useEffect(() => {
    if (!auth.authUser) {
      if (currentPath === "/signin" || currentPath === "/register") {
        dispatch(setIsSigninLoading(true));
        if (accessToken) {
          const getAuthUser = async () => {
            const authUser = await axios.post(
              "/api/auth/user",
              {},
              {
                headers: {
                  Authorization: accessToken,
                },
              }
            ).then((response) => response.data);
            if (authUser.success) {
              dispatch(setToken(accessToken));
              dispatch(setAuthUser(authUser.data));
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
            const authUser = await axios.post(
              "/api/auth/user",
              {},
              {
                headers: {
                  Authorization: accessToken,
                },
              }
            ).then((response) => response.data);
            if (authUser.success) {
              dispatch(setToken(accessToken));
              dispatch(setAuthUser(authUser.data));
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
    auth.authUser,
    accessToken,
    currentPath,
  ]);
};

export default useAuthGuard;
