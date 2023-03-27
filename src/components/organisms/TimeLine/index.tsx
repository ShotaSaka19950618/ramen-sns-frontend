import { useSelector } from "react-redux";
import { RootState } from "store";
import PostComponent from "components/organisms/Post";

const TimeLine = () => {
  const timeline = useSelector((state: RootState) => state.posts.timeline);

  return (
    <>
      {timeline.map((data) => (
        <PostComponent post={data.post} user={data.user} key={data.post._id} />
      ))}
    </>
  );
};

export default TimeLine;
