import { User } from "./users";

export type Credentials = {
  username: string;
  password: string;
};

export interface TokenObj {
  token: string;
  expires: Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SignInResponse<TUser = any> =
  | {
      requires2FA: false;
      tokenData: { access: TokenObj; refresh: TokenObj };
      user: User<TUser>;
    }
  | { requires2FA: true; token: string };
