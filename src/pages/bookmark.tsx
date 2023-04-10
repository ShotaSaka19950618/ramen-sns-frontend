import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import { getLayout } from "components/templates/Layout";
import Post from "components/organisms/Post";

const BookmarksContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Bookmark: NextPageWithLayout = () => {
  const bookmarks = useSelector((state: RootState) => state.data.bookmarks);

  return (
    <>
      <Head>
        <title>ブックマーク / RAMEN SNS</title>
      </Head>
      <BookmarksContainer>
        {bookmarks.map((data) => (
          <Post post={data.post} user={data.user} key={data.post._id} />
        ))}
      </BookmarksContainer>
    </>
  );
};

export default Bookmark;

Bookmark.getLayout = getLayout;
