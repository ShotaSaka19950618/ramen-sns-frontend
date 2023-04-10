import styled from "styled-components";
import {
  Home,
  HomeOutlined,
  Notifications,
  NotificationsOutlined,
  ChatBubble,
  ChatBubbleOutline,
  Mail,
  MailOutline,
  Bookmark,
  BookmarkBorder,
  Person,
  PersonOutlined,
  Settings,
  SettingsOutlined,
  Favorite,
  FavoriteBorder,
  RamenDining,
  RamenDiningOutlined,
  MoreVert,
  MoreHoriz,
  Close,
  ArrowUpward,
  ArrowDownward,
  ArrowForward,
  ArrowBack,
  Photo,
  AddAPhoto
} from "@mui/icons-material";
import type { Icon } from "types";

type IconWrapperProps = {
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  hcolor?: string;
  hbackgroundColor?: string;
  width?: string;
  height?: string;
  cursor?: string;
};

type IconProps = {
  iconType: Icon;
  active?: boolean;
  onClick?: () => void;
} & IconWrapperProps;

const IconWrapper = styled.div<IconWrapperProps>`
  font-size: ${({ fontSize }) => fontSize || "24px"};
  color: ${({ color }) => color};
  width: ${({ width }) => width || "30px"};
  height: ${({ height }) => height || "30px"};
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  &:hover {
    color: ${({ hcolor }) => hcolor};
    background-color: ${({ hbackgroundColor }) => hbackgroundColor};
  }
`;

const Icon = (props: IconProps) => {
  const { iconType, active, onClick, ...rest } = props;
  const cursor = onClick ? "pointer" : "";

  return (
    <IconWrapper cursor={cursor} onClick={onClick} {...rest}>
      {iconType === "Home" &&
        (active ? (
          <Home fontSize={"inherit"} color="inherit" />
        ) : (
          <HomeOutlined fontSize={"inherit"} color="inherit" />
        ))}
      {iconType === "Notifications" &&
        (active ? (
          <Notifications fontSize="inherit" color="inherit" />
        ) : (
          <NotificationsOutlined fontSize="inherit" color="inherit" />
        ))}
      {iconType === "ChatBubble" &&
        (active ? (
          <ChatBubble fontSize="inherit" color="inherit" />
        ) : (
          <ChatBubbleOutline fontSize="inherit" color="inherit" />
        ))}
      {iconType === "Message" &&
        (active ? (
          <Mail fontSize="inherit" color="inherit" />
        ) : (
          <MailOutline fontSize="inherit" color="inherit" />
        ))}
      {iconType === "Bookmark" &&
        (active ? (
          <Bookmark fontSize="inherit" color="inherit" />
        ) : (
          <BookmarkBorder fontSize="inherit" color="inherit" />
        ))}
      {iconType === "Person" &&
        (active ? (
          <Person fontSize="inherit" color="inherit" />
        ) : (
          <PersonOutlined fontSize="inherit" color="inherit" />
        ))}
      {iconType === "Settings" &&
        (active ? (
          <Settings fontSize="inherit" color="inherit" />
        ) : (
          <SettingsOutlined fontSize="inherit" color="inherit" />
        ))}
      {iconType === "RamenDining" &&
        (active ? (
          <RamenDining fontSize="inherit" color="inherit" />
        ) : (
          <RamenDiningOutlined fontSize="inherit" color="inherit" />
        ))}
      {iconType === "Favorite" &&
        (active ? (
          <Favorite fontSize="inherit" color="inherit" />
        ) : (
          <FavoriteBorder fontSize="inherit" color="inherit" />
        ))}
      {iconType === "MoreVert" && (
        <MoreVert fontSize="inherit" color="inherit" />
      )}
      {iconType === "MoreHoriz" && (
        <MoreHoriz fontSize="inherit" color="inherit" />
      )}
      {iconType === "Close" && <Close fontSize="inherit" color="inherit" />}
      {iconType === "ArrowUpward" && (
        <ArrowUpward fontSize="inherit" color="inherit" />
      )}
      {iconType === "ArrowDownward" && (
        <ArrowDownward fontSize="inherit" color="inherit" />
      )}
      {iconType === "ArrowForward" && (
        <ArrowForward fontSize="inherit" color="inherit" />
      )}
      {iconType === "ArrowBack" && (
        <ArrowBack fontSize="inherit" color="inherit" />
      )}
      {iconType === "Photo" && (
        <Photo fontSize="inherit" color="inherit" />
      )}
      {iconType === "AddAPhoto" && (
        <AddAPhoto fontSize="inherit" color="inherit" />
      )}
    </IconWrapper>
  );
};

export default Icon;
