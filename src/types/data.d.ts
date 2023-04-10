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
  commentsSend: string[];
  commentsReceived: string[];
  likes: string[];
  bookmarks: string[];
  createdAt?: string;
  updatedAt?: string;
};

// 通知
export type Notification = {
  _id: string;
  useridSend: string[];
  useridReceived: string[];
  postid: string;
  postDesc: string;
  desc: string;
  check: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// タイムライン
export type Timeline = {
  post: Post;
  user: User;
};

// 通知リスト
export type Notifications = {
  notification: Notification;
  user: User;
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
  | "Photo"
  | "AddAPhoto";

// メニュー
export type Menu = {
  iconType: Icon;
  action: () => void;
  text: string;
  active: boolean;
};
