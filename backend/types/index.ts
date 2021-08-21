export interface Post {
  title: string;
  content: string;
}

export interface ReqQuery {
  searchString: String;
  skip: Number;
  take: Number;
  orderBy: String;
  abstract: String;
}
