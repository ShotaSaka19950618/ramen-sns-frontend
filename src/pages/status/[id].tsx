import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Timeline } from "types";
import styled from "styled-components";
import { getLayout } from "components/templates/Layout";
import Post from "components/organisms/Post";
import Text from "components/atoms/Text";
import axios from "axios";

const StatusContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CommentText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.border}`};
`;

const Status: NextPageWithLayout = () => {
  const authToken = useSelector((state: RootState) => state.auth.token);
  const [target, setTarget] = useState<Timeline>();
  const [parent, setParent] = useState<Timeline>();
  const [child, setChild] = useState<Timeline[]>();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const getPost = async () => {
        const post = await axios
          .post(
            `/api/posts/getConnection`,
            {
              postid: id,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => response.data);
        setTarget(post.data.target);
        setParent(post.data.parent);
        setChild(post.data.child);
      };
      getPost();
    }
  }, [authToken, id]);

  return (
    <>
      <Head>
        <title>投稿 / RAMEN SNS</title>
      </Head>
      <StatusContainer>
        {parent && <Post post={parent.post} user={parent.user} connect />}
        {target && <Post post={target.post} user={target.user} />}
        {child?.length !== 0 && (
          <CommentText>
            <Text fontWeight="550">COMMENTS</Text>
          </CommentText>
        )}
        {child &&
          child.map((data) => <Post post={data.post} user={data.user} />)}
      </StatusContainer>
    </>
  );
};

export default Status;

Status.getLayout = getLayout;
