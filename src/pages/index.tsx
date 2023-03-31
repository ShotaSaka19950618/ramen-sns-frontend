import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import {
  setTimeline,
  setTimelineAll,
} from "store/postsSlice";
import styled from "styled-components";
import { getLayout } from "components/templates/Layout";
import Post from "components/organisms/Post";
import Text from "components/atoms/Text";
import axios from "axios";

const TimelineContainer = styled.div``;

const TimelineDispSelect = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TimelineDisp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const Index: NextPageWithLayout = () => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const timeline = useSelector((state: RootState) => state.posts.timeline);
  const timelineAll = useSelector(
    (state: RootState) => state.posts.timelineAll
  );
  const dispatch = useDispatch();
  const [disp, setDisp] = useState(1);

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
  }, [dispatch, authUser, authToken, disp]);

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
  }, [dispatch, authUser, authToken, disp]);

  return (
    <>
      <Head>
        <title>ホーム / RAMEN SNS</title>
      </Head>
      <TimelineContainer>
        <TimelineDispSelect>
          <TimelineDisp onClick={() => setDisp(1)}>
            <Text
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              fontWeight={disp === 1 ? "550" : "500"}
              background={
                disp === 1 ? "linear-gradient(transparent 90%, #99ccff 0%)" : ""
              }
            >
              おすすめ
            </Text>
          </TimelineDisp>
          <TimelineDisp onClick={() => setDisp(2)}>
            <Text
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              fontWeight={disp === 2 ? "550" : "500"}
              background={
                disp === 2 ? "linear-gradient(transparent 90%, #99ccff 0%)" : ""
              }
            >
              フォロー中
            </Text>
          </TimelineDisp>
        </TimelineDispSelect>
        {disp === 1 &&
          timelineAll.map((data) => (
            <Post post={data.post} user={data.user} key={data.post._id} />
          ))}
        {disp === 2 &&
          timeline.map((data) => (
            <Post post={data.post} user={data.user} key={data.post._id} />
          ))}
      </TimelineContainer>
    </>
  );
};

export default Index;

Index.getLayout = getLayout;
