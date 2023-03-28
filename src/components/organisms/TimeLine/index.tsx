import PostComponent from "components/organisms/Post";
import type { Timeline } from "types";


type TimeLineProps = {
  data: Timeline
}

const TimeLine = (props: TimeLineProps) => {
  const { data } = props;

  return (
    <>
      {data.map((data) => (
        <PostComponent post={data.post} user={data.user} key={data.post._id} />
      ))}
    </>
  );
};

export default TimeLine;
