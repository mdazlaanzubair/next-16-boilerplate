// Post type
export interface PostInterface {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

// User type
export interface UserInterface {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

// Login Request type
export interface LoginRequestInterface {
  username: string;
  password: string;
}

// Login Response type
export interface LoginResponseInterface extends UserInterface {
  accessToken: string;
  refreshToken: string;
}
