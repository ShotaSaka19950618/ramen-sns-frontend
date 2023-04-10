import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setTitle, setBackurl } from "store/menuSlice";
import { User, Timeline } from "types";
import styled from "styled-components";
import { getLayout } from "components/templates/Layout";
import Post from "components/organisms/Post";
import Text from "components/atoms/Text";
import axios from "axios";

const ProfileContainer = styled.div``;

const ProfileInfo = styled.div`
  width: 100%;
  height: 480px;
`;

const ProfileCover = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  margin-bottom: 80px;
`;

const ProfileAvatar = styled.div`
  position: absolute;
  left: 20px;
  top: 200px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileFollow = styled.div`
  position: absolute;
  right: 20px;
  top: 300px;
`;

const ProfileNameContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 10px;
`;

const ProfileName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
`;

const ProfileUsernameContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 30px;
`;

const ProfileUsername = styled.span`
  color: ${({ theme }) => theme.colors.subtext};
`;

const ProfileDescContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 30px;
`;

const ProfileDesc = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const ProfileStatus = styled.div`
  margin-left: 20px;
`;
const ProfileFollowing = styled.span`
  color: ${({ theme }) => theme.colors.subtext};
  margin-right: 20px;
`;

const ProfileFollowingCount = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  margin-right: 5px;
`;

const ProfileFollower = styled.span`
  color: ${({ theme }) => theme.colors.subtext};
`;

const ProfileFollowerCount = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  margin-right: 5px;
`;

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

const FollowButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  color: white;
  background-color: black;
  border-radius: 20px;
  &:hover {
    opacity: 0.7;
  }
`;

type FollowLiftButtonProps = {
  followHover?: boolean;
};

const FollowLiftButton = styled.span<FollowLiftButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  color: ${({ followHover }) => (followHover ? "red" : "black")};
  background-color: ${({ theme, followHover }) => (followHover ? theme.colors.followLiftBc : "white")};
  border: ${({ theme, followHover }) => (followHover ? `1px solid ${theme.colors.followLift}` : `1px solid ${theme.colors.border}`)};
  border-radius: 20px;
`;

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const currentPath = router.asPath;
  const { id } = router.query;
  const IMAGE_FOLDER = process.env.NEXT_PUBLIC_IMAGE_FOLDER;
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const reacquisition = useSelector(
    (state: RootState) => state.data.reacquisition
  );
  const dispatch = useDispatch();
  const [user, SetUser] = useState<User>();
  const [timeline, setTimeline] = useState<Timeline[]>();
  const [likes, setLikes] = useState<Timeline[]>();
  const [disp, setDisp] = useState(1);
  const [follow, setFollow] = useState<boolean>(false);
  const [followHover, setFollowHover] = useState<boolean>(false);
  const followUserid = user?._id || "";

  useEffect(() => {
    if (authUser) {
      setFollow(authUser.followings.includes(followUserid));
    }
  }, [authUser, followUserid]);

  useEffect(() => {
    if (id && authUser) {
      const getUser = async () => {
        const user = await axios
          .post(
            "/api/users/get",
            {
              userid: id,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => response.data);
        if (authUser._id === user.data._id) {
          dispatch(setTitle(`マイプロフィール`));
        } else {
          dispatch(setTitle(`${user.data.username}のプロフィール`));
        }
        dispatch(setBackurl(currentPath));
        SetUser(user.data);
      };
      getUser();
    }
  }, [dispatch, id, authUser, authToken, currentPath]);

  useEffect(() => {
    if (id) {
      const getTimeline = async () => {
        const timeline = await axios
          .post(
            `/api/posts/profile`,
            {
              userid: id,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => response.data);
        setTimeline(timeline.data);
      };
      getTimeline();
    }
  }, [id, authToken, reacquisition, disp]);

  useEffect(() => {
    if (id) {
      const getLikes = async () => {
        const likes = await axios
          .post(
            `/api/posts/getLike`,
            {
              userid: id,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => response.data);
        setLikes(likes.data);
      };
      getLikes();
    }
  }, [id, authToken, reacquisition, disp]);

  const handleFollow = async () => {
    await axios
      .post(
        `/api/users/follow`,
        {
          userid: authUser?._id,
          targetUserid: followUserid,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => response.data);
    setFollow((follow) => !follow);
  };

  return (
    <>
      <Head>{user && <title>{user.name} / RAMEN SNS</title>}</Head>
      <ProfileContainer>
        <ProfileInfo>
          {user && (
            <>
              <ProfileCover>
                <Image
                  src={IMAGE_FOLDER + user.coverPicture}
                  alt=""
                  fill
                  sizes="auto"
                  priority
                  style={{ objectFit: "cover" }}
                />
                <ProfileAvatar>
                  <Image
                    src={IMAGE_FOLDER + user.profilePicture}
                    alt=""
                    fill
                    sizes="auto"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                </ProfileAvatar>
                <ProfileFollow>
                  {authUser?._id !== followUserid && follow && (
                    <FollowLiftButton
                      followHover={followHover}
                      onMouseEnter={() => setFollowHover(true)}
                      onMouseLeave={() => setFollowHover(false)}
                      onClick={handleFollow}
                    >
                      {followHover ? "フォロー解除" : "フォロー中"}
                    </FollowLiftButton>
                  )}
                  {authUser?._id !== followUserid && !follow && (
                    <FollowButton
                      onClick={handleFollow}
                    >フォロー</FollowButton>
                  )}
                </ProfileFollow>
              </ProfileCover>
              <ProfileNameContainer>
                <ProfileName>{user.name}</ProfileName>
              </ProfileNameContainer>
              <ProfileUsernameContainer>
                <ProfileUsername>@{user.username}</ProfileUsername>
              </ProfileUsernameContainer>
              <ProfileDescContainer>
                <ProfileDesc>{user.desc}</ProfileDesc>
              </ProfileDescContainer>
              <ProfileStatus>
                <ProfileFollowing>
                  <ProfileFollowingCount>
                    {user.followings.length}
                  </ProfileFollowingCount>
                  フォロー中
                </ProfileFollowing>
                <ProfileFollower>
                  <ProfileFollowerCount>
                    {user.followers.length}
                  </ProfileFollowerCount>
                  フォロワー
                </ProfileFollower>
              </ProfileStatus>
            </>
          )}
        </ProfileInfo>
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
                投稿
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
                いいね
              </Text>
            </TimelineDisp>
          </TimelineDispSelect>
          {disp === 1 &&
            timeline &&
            timeline.map((data) => (
              <Post post={data.post} user={data.user} key={data.post._id} />
            ))}
          {disp === 2 &&
            likes &&
            likes.map((data) => (
              <Post post={data.post} user={data.user} key={data.post._id} />
            ))}
        </TimelineContainer>
      </ProfileContainer>
    </>
  );
};

export default Profile;

Profile.getLayout = getLayout;
