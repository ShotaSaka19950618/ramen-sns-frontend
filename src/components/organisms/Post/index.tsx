import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "store";
import { AuthState } from "store/authSlice";
import { setTimeline } from "store/postsSlice";
import { Post, User } from "types";
import { theme } from "themes";
import styled from "styled-components";
import Icon from "components/atoms/Icon";
import DropdownMenu from "components/molecules/DropdownMenu";
import { formatDistance } from "date-fns";
import { ja } from "date-fns/locale";
import axios from "axios";

const PostRoot = styled.article`
  position: relative;
  display: block;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  cursor: pointer;
`;

const PostWrapper = styled.div`
  padding: 16px;
  display: flex;
`;

const PostUserAvatarContainer = styled.div`
  flex-grow: 0;
  flex-basis: 40px;
  margin-right: 12px;
  align-items: center;
  @media screen and (min-width: 1024px) {
    flex-basis: 48px;
  }
`;

const PostContentContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0px;
  justify-content: center;
  font-size: 14px;
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const PostUserAvatar = styled.div`
  position: relative;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  @media screen and (min-width: 1024px) {
    width: 48px;
    height: 48px;
  }
`;

const PostContentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 5px;
`;

const PostUser = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  margin-right: 10px;
`;

const PostUsername = styled.span`
  color: ${({ theme }) => theme.colors.subtext};
  margin-right: 10px;
`;

const PostDate = styled.span`
  color: ${({ theme }) => theme.colors.subtext};
`;

const PostMore = styled.div`
  color: ${({ theme }) => theme.colors.subtext};
  border-radius: 50%;
  transition: background-color 0.3s linear;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const PostContentCenter = styled.div`
  display: block;
  margin-bottom: 10px;
`;

const PostText = styled.span`
  display: block;
  white-space: pre-wrap;
  margin-bottom: 10px;
`;

const PostImage = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  overflow: hidden;
`;

const PostContentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

type PostStatusProps = {
  hcolor?: string;
  active?: boolean;
};

const PostStatus = styled.div<PostStatusProps>`
  color: ${({ theme, active, hcolor }) =>
    active ? hcolor : theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s linear;
  &:hover {
    color: ${({ hcolor }) => hcolor};
  }
`;

type PostStatusIConProps = {
  hbackgroundColor?: string;
};

const PostStatusIcon = styled.div<PostStatusIConProps>`
  display: flex;
  border-radius: 50%;
  padding: 5px;
  transition: background-color 0.3s linear;
  &:hover {
    background-color: ${({ hbackgroundColor }) => hbackgroundColor};
  }
`;

const PostStatusCount = styled.span`
  padding-left: 5px;
`;

const PostDropDownContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 250px;
`;

type PostProps = {
  post: Post;
  user: User;
};

const Post = (props: PostProps) => {
  const { post, user } = props;
  const IMAGE_FOLDER = process.env.NEXT_PUBLIC_IMAGE_FOLDER;
  const { auth } = useSelector<AppState, { auth: AuthState }>((state) => ({
    auth: state.auth,
  }));
  const dispatch = useDispatch();
  const currentUserid = auth.authUser?._id || "";
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUserid));
  const [bookmark, setBookmark] = useState(post.bookmarks.length);
  const [isBookmarked, setIsBookmarked] = useState(
    post.bookmarks.includes(currentUserid)
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const time = (() => {
    if (typeof post.createdAt === "string") {
      return formatDistance(new Date(), Date.parse(post.createdAt), {
        locale: ja,
      });
    } else {
      return "";
    }
  })();

  const menu = [
    {
      item: "フォロー",
      onclick: async () => {
        const result = await axios.post(
          `/api/users/follow`,
          {
            userid: auth.authUser?._id,
            targetUserid: post.userid,
          },
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
        console.log(result);
      },
    },
    {
      item: "削除",
      onclick: async () => {
        await axios.post(
          `/api/posts/delete`,
          {
            postid: post._id,
          },
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
        setShowDropdown(false);
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
      },
    },
  ];

  const handleLike = async () => {
    await axios.put(
      `/api/posts/like`,
      {
        postid: post._id,
        userid: auth.authUser?._id,
      },
      {
        headers: {
          Authorization: auth.token,
        },
      }
    );
    setLike((like) => (isLiked ? like - 1 : like + 1));
    setIsLiked((isLiked) => !isLiked);
  };

  const handleBookmark = async () => {
    await axios.put(
      `/api/posts/bookmark`,
      {
        postid: post._id,
        userid: auth.authUser?._id,
      },
      {
        headers: {
          Authorization: auth.token,
        },
      }
    );
    setBookmark((bookmark) => (isBookmarked ? bookmark - 1 : bookmark + 1));
    setIsBookmarked((isBookmarked) => !isBookmarked);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDropdownClose);
    return () => document.removeEventListener("mousedown", handleDropdownClose);
  }, []);

  const handleDropdownOpen = () => {
    setShowDropdown(true);
  };

  const handleDropdownClose = (event: Event) => {
    if (!(event.target instanceof HTMLDivElement)) {
      return;
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  return (
    <PostRoot>
      <PostWrapper>
        <PostUserAvatarContainer>
          <Link href={`/profile/${user.username}`}>
            <PostUserAvatar>
              <Image
                src={IMAGE_FOLDER + user.profilePicture}
                alt=""
                fill
                sizes="auto"
              />
            </PostUserAvatar>
          </Link>
        </PostUserAvatarContainer>
        <PostContentContainer>
          <PostContentTop>
            <div>
              <PostUser>{user.name}</PostUser>
              <PostUsername>@{user.username}</PostUsername>
              <PostDate>・{time}</PostDate>
            </div>
            <PostMore onClick={handleDropdownOpen}>
              <Icon iconType="MoreHoriz" fontSize="18px" />
            </PostMore>
          </PostContentTop>
          <PostContentCenter>
            <PostText>{post.desc}</PostText>
            {post.img && (
              <PostImage>
                <Image
                  src={IMAGE_FOLDER + post.img}
                  alt=""
                  width={500}
                  height={500}
                  sizes="100vw"
                  priority
                  style={{
                    width: "100%",
                    height: "auto",
                    verticalAlign: "middle",
                  }}
                />
              </PostImage>
            )}
          </PostContentCenter>
          <PostContentBottom>
            <PostStatus hcolor={theme.colors.chat}>
              <PostStatusIcon hbackgroundColor={theme.colors.chatIcon}>
                <Icon iconType="ChatBubble" fontSize="20px" />
              </PostStatusIcon>
              <PostStatusCount>{post.comments.length}</PostStatusCount>
            </PostStatus>
            <PostStatus
              hcolor={theme.colors.heart}
              active={isLiked}
              onClick={handleLike}
            >
              <PostStatusIcon hbackgroundColor={theme.colors.heartIcon}>
                <Icon iconType="Favorite" fontSize="22px" />
              </PostStatusIcon>
              <PostStatusCount>{like}</PostStatusCount>
            </PostStatus>
            <PostStatus
              hcolor={theme.colors.bookmark}
              active={isBookmarked}
              onClick={handleBookmark}
            >
              <PostStatusIcon hbackgroundColor={theme.colors.bookmarkIcon}>
                <Icon iconType="Bookmark" fontSize="22px" />
              </PostStatusIcon>
              <PostStatusCount>{bookmark}</PostStatusCount>
            </PostStatus>
          </PostContentBottom>
        </PostContentContainer>
      </PostWrapper>
      {showDropdown && (
        <PostDropDownContainer ref={dropdownRef}>
          <DropdownMenu menu={menu} />
        </PostDropDownContainer>
      )}
    </PostRoot>
  );
};

export default Post;
