import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "store";
import { AuthState, setAuthUser } from "store/authSlice";
import { PostsState, setTimeline } from "store/postsSlice";
import useAuthGuard from "utils/useAuthGuard";
import styled from "styled-components";
import Layout from "components/templates/Layout";
import Loader from "components/organisms/Loader";
import Share from "components/organisms/Share";
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

const Index: NextPage = () => {
  useAuthGuard();
  const dispatch = useDispatch();
  const { auth, posts } = useSelector<
    AppState,
    { auth: AuthState; posts: PostsState }
  >((state) => ({
    auth: state.auth,
    posts: state.posts,
  }));

  useEffect(() => {
    const getTimeline = async () => {
      const timeline = await axios.post(
        `/api/posts/timeline`,
        {
          userid: auth.authUser?._id,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        }
      ).then((response) => response.data);
      dispatch(setTimeline(timeline.data));
    };
    if (auth.token && auth.authUser?.username) {
      getTimeline();
    }
  }, [dispatch, auth]);

  return (
    <>
      <Head>
        <title>ホーム / RAMEN SNS</title>
      </Head>
      {auth.isLoading && <Loader />}
      {!auth.isLoading && (
        <>
          {posts.shareOpen && <Share />}
          <Layout>
            <Container>
              <TimelineContainer>
                <TimeLine />
              </TimelineContainer>
              <RankingContainer>
                <div>店舗ランキング</div>
                <Link
                  href="/signin"
                  onClick={() => {
                    dispatch(setAuthUser(null));
                    destroyCookie(null, "accessToken");
                  }}
                >
                  さいんあうと
                </Link>
                <span>{auth.authUser?.username}</span>
              </RankingContainer>
            </Container>
          </Layout>
        </>
      )}
    </>
  );
};

export default Index;
