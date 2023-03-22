// ユーザー
export type User = {
  _id: string;
  username: string;
  name: string;
  password?: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  followings: string[];
  isAdmin: boolean;
  desc: string;
  createdAt?: string;
  updatedAt?: string;
};

// 投稿
export type Post = {
  _id: string;
  userid: string;
  shopname: string;
  desc: string;
  img: string;
  comments: string[];
  likes: string[];
  bookmarks: string[];
  createdAt?: string;
  updatedAt?: string;
};

// アイコン
export type Icon =
  | "Home"
  | "Notifications"
  | "ChatBubble"
  | "Message"
  | "Bookmark"
  | "Person"
  | "Settings"
  | "Favorite"
  | "RamenDining"
  | "MoreVert"
  | "MoreHoriz"
  | "Close"
  | "ArrowUpward"
  | "ArrowDownward"
  | "ArrowForward"
  | "ArrowBack"
  | "Image";

// メニュー
export type Menu = {
  iconType: Icon;
  url: string;
  text: string;
  active: boolean;
};
