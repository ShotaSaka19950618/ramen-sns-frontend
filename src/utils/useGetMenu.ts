import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setTitle } from "store/menuSlice";

const useGetMenu = (): void => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = router.pathname;

  useEffect(() => {
    if (currentPath === "/") {
      dispatch(setTitle("ホーム"));
    }

    if (currentPath === "/notifications") {
      dispatch(setTitle("通知"));
    }

    if (currentPath === "/bookmark") {
      dispatch(setTitle("ブックマーク"));
    }

    if (currentPath.indexOf("/status") !== -1) {
      dispatch(setTitle("投稿"));
    }
  }, [dispatch, authUser, currentPath]);
};

export default useGetMenu;
