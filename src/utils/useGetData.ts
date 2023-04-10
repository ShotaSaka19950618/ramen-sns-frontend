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
} from "store/dataSlice";
import axios from "axios";

const useGetData = (): void => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const reacquisition = useSelector((state: RootState) => state.data.reacquisition);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = router.pathname;

  useEffect(() => {
    if (authUser) {
      const getTimeline = async () => {
        const timeline = await axios
          .post(
            `/api/posts/timeline`,
            {
              userid: authUser._id,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => response.data);
        dispatch(setTimeline(timeline.data));
      };
      getTimeline();
    }
  }, [dispatch, authUser, authToken, currentPath, reacquisition]);

  useEffect(() => {
    if (authUser) {
      const getTimelineAll = async () => {
        const timelineAll = await axios
          .post(
            `/api/posts/all`,
            {
              userid: authUser._id,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => response.data);
        dispatch(setTimelineAll(timelineAll.data));
      };
      getTimelineAll();
    }
  }, [dispatch, authUser, authToken, currentPath, reacquisition]);

  useEffect(() => {
    if (authUser) {
      const getBookmarks = async () => {
        const bookmarks = await axios
          .post(
            `/api/posts/getBookmark`,
            {
              userid: authUser._id,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => response.data);
        dispatch(setBookmarks(bookmarks.data));
      };
      getBookmarks();
    }
  }, [dispatch, authUser, authToken, currentPath, reacquisition]);

  useEffect(() => {
    if (authUser) {
      const getNotifications = async () => {
        const notifications = await axios
          .post(
            `/api/notifications/get`,
            {
              userid: authUser._id,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => response.data);
        dispatch(setNotifications(notifications.data));
      };
      getNotifications();
    }
  }, [dispatch, authUser, authToken, currentPath, reacquisition]);

  useEffect(() => {
    if (authUser) {
      const getRanking = async () => {
        const ranking = await axios
          .post(
            `/api/posts/ranking`,
            {
              userid: authUser._id,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => response.data);
        dispatch(setRanking(ranking.data));
      };
      getRanking();
    }
  }, [dispatch, authUser, authToken, currentPath, reacquisition]);
};

export default useGetData;
