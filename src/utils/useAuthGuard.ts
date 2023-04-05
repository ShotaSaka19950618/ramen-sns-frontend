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
import axios from "axios";
import { parseCookies } from "nookies";

const useAuthGuard = (): void => {
  const accessToken = parseCookies().accessToken;
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const dispatch = useDispatch();
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
        if (accessToken) {
          const getAuthUser = async () => {
            const authUser = await axios
              .get(
                `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/auth/user`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then((response) => response.data);
            if (authUser.success) {
              dispatch(setToken(accessToken));
              dispatch(setAuthUser(authUser.data));
              dispatch(setIsLoading(false));
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
        if (accessToken) {
          const getAuthUser = async () => {
            const authUser = await axios
              .get(
                `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/auth/user`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then((response) => response.data);
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
    authUser,
    accessToken,
    currentPath,
  ]);
};

export default useAuthGuard;
