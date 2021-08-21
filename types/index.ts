export type Routes = '/' | '/active' | '/completed';

export interface Post {
  id: Number;
  title: String;
  content: String;
  tags: any;
  abstract: String;
}
