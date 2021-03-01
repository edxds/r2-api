export type User = {
  id: number;
  username: string;
  email: string;
  password?: string;
  socialId?: string;
};

export type MinimalSocialProfile = {
  id: string;
  name?: string;
  username?: string;
  email: string;
};
