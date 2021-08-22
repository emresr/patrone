export interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  abstract?: string;
  content: string;
  author: User;
  authorId: number;
  publised: boolean;
  likeCount: number;
  likedBy: User[];
  viewCount: number;
  tags: Tag[];
  isPublic: boolean;
}
export interface User {
  id: number;
  createdAt: Date;
  email: string;
  password: string;
  name?: string;
  posts?: Post[];
  liked?: Post[];
  followedTags?: Tag[];
  userType: string;
  until?: Date;
}
export interface Tag {
  id: number;
  name: string;
  posts: Post[];
  followedBy: User[];
}
