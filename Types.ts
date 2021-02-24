export interface TechnologyI {
  name: string;
  id: string;
  posts: PostsI[];
}

export interface PostsI {
  title: string;
  id: string;
  owner: string;
  date: string;
  link: string;
}
