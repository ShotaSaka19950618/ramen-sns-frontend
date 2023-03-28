import type { NextPageWithLayout } from "pages/_app";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setMenuOpen, setMenuList } from "store/menuSlice";
import { User, Timeline } from "types";
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

const ProfileContainer = styled.div`
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

const Profile: NextPageWithLayout = () => {
  const IMAGE_FOLDER = process.env.NEXT_PUBLIC_IMAGE_FOLDER;
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const menuList = useSelector((state: RootState) => state.menu.List);
  const dispatch = useDispatch();
  const [user, SetUser] = useState<User>();
  const [timeline, setTimeline] = useState<Timeline>();
  const [likes, setLikes] = useState<Timeline>();
  const [disp, setDisp] = useState(1);
  const router = useRouter();
  const { id } = router.query;

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
        if (user.success) {
          SetUser(user.data);
          const newMenuList = menuList.map((menu) => {
            if (authUser._id === user.data._id) {
              dispatch(setMenuOpen("マイプロフィール"));
              return menu.text === "プロフィール"
                ? { ...menu, active: true }
                : { ...menu, active: false };
            } else {
              dispatch(setMenuOpen(`${user.data.name}のプロフィール`));
              return { ...menu, active: false };
            }
          });
          if (JSON.stringify(newMenuList) !== JSON.stringify(menuList)) {
            dispatch(setMenuList(newMenuList));
          }
        }
      };
      getUser();
    }
  }, [dispatch, id, authUser, authToken, menuList]);

  useEffect(() => {
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
    getTimeline();
    getLikes();
  }, [authToken, id]);

  return (
    <>
      <Head>
        <title>ホーム / RAMEN SNS</title>
      </Head>
      <Container>
        {user && (
          <>
            <ProfileContainer>
              <ProfileInfo>
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
              </ProfileInfo>
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
              {disp === 1 && timeline && <TimeLine data={timeline} />}
              {disp === 2 && likes && <TimeLine data={likes} />}
            </ProfileContainer>
            <RankingContainer></RankingContainer>
          </>
        )}
      </Container>
    </>
  );
};

export default Profile;

Profile.getLayout = getLayout;
