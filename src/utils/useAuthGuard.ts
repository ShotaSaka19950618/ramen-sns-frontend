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
  const reacquisition = useSelector(
    (state: RootState) => state.data.reacquisition
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const redirectTopPage = useCallback(() => {
    router.push("/");
  }, [router]);
  const redirectSigninPage = useCallback(() => {
    router.push("/signin");
  }, [router]);
  const currentPath = router.pathname;

  console.log(currentPath)

  useEffect(() => {
    if (currentPath === "/signin" || currentPath === "/register") {
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
  }, [
    dispatch,
    redirectSigninPage,
    redirectTopPage,
    accessToken,
    currentPath,
    reacquisition,
  ]);
};

export default useAuthGuard;
