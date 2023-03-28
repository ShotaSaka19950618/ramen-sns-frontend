import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setMenuOpen, setMenuList } from "store/menuSlice";
import { Timeline } from "types";
import styled from "styled-components";
import { getLayout } from "components/templates/Layout";
import TimeLine from "components/organisms/TimeLine";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const BookmarksContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  flex-grow: 1.75;
  flex-shrink: 0;
  flex-basis: 0;
  flex-direction: column;
  word-wrap: break-word;
  overflow: scroll;
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

const Bookmark: NextPageWithLayout = () => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const menuList = useSelector((state: RootState) => state.menu.List);
  const dispatch = useDispatch();
  const [bookmarks, setBookmarks] = useState<Timeline>();

  useEffect(() => {
    const newMenuList = menuList.map((menu) => {
      return menu.text === "ブックマーク"
        ? { ...menu, active: true }
        : { ...menu, active: false };
    });
    if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
      dispatch(setMenuOpen("ブックマーク"));
      dispatch(setMenuList(newMenuList));
    }
  }, [dispatch, menuList]);

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
        setBookmarks(bookmarks.data);
      };
      getBookmarks();
    }
  }, [authUser, authToken]);

  return (
    <>
      <Head>
        <title>ブックマーク / RAMEN SNS</title>
      </Head>
      <Container>
        <BookmarksContainer>
          {bookmarks && <TimeLine data={bookmarks} />}
        </BookmarksContainer>
        <RankingContainer></RankingContainer>
      </Container>
    </>
  );
};

Bookmark.getLayout = getLayout;

export default Bookmark;
