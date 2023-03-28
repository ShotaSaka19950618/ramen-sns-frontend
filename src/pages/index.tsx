import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setTimeline, setTimelineAll, setRanking } from "store/postsSlice";
import { setMenuOpen, setMenuList } from "store/menuSlice";
import styled from "styled-components";
import { getLayout } from "components/templates/Layout";
import TimeLine from "components/organisms/TimeLine";
import Text from "components/atoms/Text";
import axios from "axios";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const TimelineContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  flex-grow: 1.75;
  flex-shrink: 0;
  flex-basis: 0;
  flex-direction: column;
  word-wrap: break-word;
  overflow: scroll;
`;

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

const RankingContainer = styled.div`
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  box-sizing: border-box;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  flex-direction: column;
  word-wrap: break-word;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Index: NextPageWithLayout = () => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const menuList = useSelector((state: RootState) => state.menu.List);
  const timeline = useSelector((state: RootState) => state.posts.timeline);
  const timelineAll = useSelector(
    (state: RootState) => state.posts.timelineAll
  );
  const ranking = useSelector((state: RootState) => state.posts.ranking);
  const dispatch = useDispatch();
  const [disp, setDisp] = useState(1);

  useEffect(() => {
    const newMenuList = menuList.map((menu) => {
      return menu.text === "ホーム"
        ? { ...menu, active: true }
        : { ...menu, active: false };
    });
    if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
      dispatch(setMenuOpen("ホーム"));
      dispatch(setMenuList(newMenuList));
    }
  }, [dispatch, menuList]);

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
      getTimeline();
      getTimelineAll();
      getRanking();
    }
  }, [dispatch, authUser, authToken]);

  return (
    <>
      <Head>
        <title>ホーム / RAMEN SNS</title>
      </Head>
      <Container>
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
                  disp === 1
                    ? "linear-gradient(transparent 90%, #99ccff 0%)"
                    : ""
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
                  disp === 2
                    ? "linear-gradient(transparent 90%, #99ccff 0%)"
                    : ""
                }
              >
                フォロー中
              </Text>
            </TimelineDisp>
          </TimelineDispSelect>
          {disp === 1 && <TimeLine data={timelineAll} />}
          {disp === 2 && <TimeLine data={timeline} />}
        </TimelineContainer>
        <RankingContainer>
          <div>店舗ランキング</div>
          {ranking.map((rank) => (
            <div key={rank._id}>
              <span>{rank._id}</span>
              <span>{rank.count}</span>
            </div>
          ))}
          <span>{authUser?.username}</span>
        </RankingContainer>
      </Container>
    </>
  );
};

export default Index;

Index.getLayout = getLayout;
