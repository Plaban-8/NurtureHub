export interface Post {
  _id: string;
  content: string;
  photo?: string;
  likes: number;
  createdAt: string;
  userId: {
    _id: string;
    name: string;
  };
  comments: {
    text: string;
    createdAt: string;
    userId: {
      name: string;
      avatar: string;
    };
  }[];
}
export interface newPost{
  content: string;
  photo: string;
}
