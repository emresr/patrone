import { Tag } from './models';

export interface IAddPostBody {
  title: string;
  abstract: string;
  content: string;
  //   tags: Tag[]
}

export interface IGetFeedBody {
  searchString?: String;
  skip?: number;
  take?: number;
  orderBy?: string;
}
export interface IGetPostBody {
  id: number;
}
export interface IEditPostBody {
  id: number;
  title?: string;
  abstract?: string;
  content?: string;
}
export interface IPublishPostBody {
  id: number;
}
export interface ILikePostBody {
  id: number;
}
export interface IDeletePostBody {
  id: number;
}
export interface IAddViewBody {
  id: number;
}
export interface ISavePostBody {
  id: number;
}
