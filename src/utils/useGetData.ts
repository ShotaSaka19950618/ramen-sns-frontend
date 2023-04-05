import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import {
  setTimeline,
  setTimelineAll,
  setBookmarks,
  setNotifications,
  setRanking,
} from "store/postsSlice";
import axios from "axios";

const useGetData = (): void => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = router.pathname;

  useEffect(() => {
    if (authUser) {
      const getTimeline = async () => {
        const timeline = await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/posts/${authUser._id}/timeline`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => response.data);
        dispatch(setTimeline(timeline.data));
      };
      getTimeline();
    }
  }, [dispatch, authUser, authToken, currentPath]);

  useEffect(() => {
    if (authUser) {
      const getTimelineAll = async () => {
        const timelineAll = await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/posts/${authUser._id}/all`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => response.data);
        dispatch(setTimelineAll(timelineAll.data));
      };
      getTimelineAll();
    }
  }, [dispatch, authUser, authToken, currentPath]);

  useEffect(() => {
    if (authUser) {
      const getBookmarks = async () => {
        const bookmarks = await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/posts/${authUser._id}/bookmark`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => response.data);
        dispatch(setBookmarks(bookmarks.data));
      };
      getBookmarks();
    }
  }, [dispatch, authUser, authToken, currentPath]);

  useEffect(() => {
    if (authUser) {
      const getNotifications = async () => {
        const notifications = await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/notifications/${authUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => response.data);
        dispatch(setNotifications(notifications.data));
      };
      getNotifications();
    }
  }, [dispatch, authUser, authToken, currentPath]);

  useEffect(() => {
    if (authUser) {
      const getRanking = async () => {
        const ranking = await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/posts/${authUser._id}/ranking`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => response.data);
        dispatch(setRanking(ranking.data));
      };
      getRanking();
    }
  }, [dispatch, authUser, authToken, currentPath]);
};

export default useGetData;
