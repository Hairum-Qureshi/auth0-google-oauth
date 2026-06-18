type Payload = {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  scope: string;
  azp: string;
};

type UserData = {
  firstName: string;
  lastName: string;
  nickname: string;
  fullName: string;
  profilePicture: string;
  updatedAt: string;
  email: string;
  emailVerified: boolean;
  userID: string;
};

export type { Payload, UserData };
