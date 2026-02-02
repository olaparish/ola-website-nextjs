import { User } from "./users";

export type Credentials = {
  email?: string;
  id?: string;
  password: string;
};

export type SetPasswordCredentials = {
  password: string;
  confirmPassword: string;
  token: string;
};

export type UserLoginTypes = "leader" | "parishioner";

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
      permissions: string[];
    }
  | { requires2FA: true; token: string };

export type SetPasswordResponse = { status: boolean; message: string };