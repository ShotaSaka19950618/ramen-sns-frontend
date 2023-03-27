import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setAuthUser } from "store/authSlice";
import { setTimeline, setRanking } from "store/postsSlice";
import { setMenuOpen, setMenuList } from "store/menuSlice";
import styled from "styled-components";
import { getLayout } from "components/templates/Layout";
import TimeLine from "components/organisms/TimeLine";
import axios from "axios";
import { destroyCookie } from "nookies";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const TimelineContainer = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-grow: 1.75;
  flex-shrink: 0;
  flex-basis: 0;
  flex-direction: column;
  word-wrap: break-word;
  overflow: scroll;
`;

const RankingContainer = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.border};
  position: relative;
  display: flex;
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
  const ranking = useSelector((state: RootState) => state.posts.ranking);
  const dispatch = useDispatch();

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
          {timeline.length !== 0 && <TimeLine />}
        </TimelineContainer>
        <RankingContainer>
          <div>店舗ランキング</div>
          {ranking.map((rank) => (
            <div key={rank._id}>
              <span>{rank._id}</span>
              <span>{rank.count}</span>
            </div>
          ))}
          <Link
            href="/signin"
            onClick={() => {
              dispatch(setAuthUser(null));
              destroyCookie(null, "accessToken");
            }}
          >
            さいんあうと
          </Link>
          <span>{authUser?.username}</span>
        </RankingContainer>
      </Container>
    </>
  );
};

export default Index;

Index.getLayout = getLayout;
