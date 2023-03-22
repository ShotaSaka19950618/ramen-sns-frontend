import { useSelector } from "react-redux";
import { AppState } from "store";
import { PostsState } from "store/postsSlice";
import PostComponent from "components/organisms/Post";

const TimeLine = () => {
  const { posts } = useSelector<AppState, { posts: PostsState }>((state) => ({
    posts: state.posts,
  }));

  return (
    <>
      {posts.timeline.map((data) => (
        <PostComponent post={data.post} user={data.user} key={data.post._id}/>
      ))}
    </>
  );
};

export default TimeLine;
