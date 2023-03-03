// APIコンテキスト
export type ApiContext = {
  apiRootUrl: string
}

// ユーザー
export type User = {
  _id: string
  username: string
  name: string
  password?: string
  profilePicture: string
  coverPicture: string
  followers: string[]
  followings: string[]
  isAdmin: boolean
  desc: string
  createdAt?: string
  updatedAt?: string
}

// 投稿
export type Post = {
  _id: string
  userid: string
  shopname: string
  desc: string
  img: string
  comments: string[]
  likes: string[]
  bookmarks: string[]
  createdAt?: string
  updatedAt?: string
}
