import { apiWrapper, ApiResponse } from "@/utils/api-wrapper";
import api from "@/utils/axios";
import { Credentials, SignInResponse } from "../../types/auth.type";
import { BaseUser } from "../../types";

export const authService = {
  parishionerSignin: async (
    credentials: Credentials
  ): Promise<ApiResponse<SignInResponse>> => {
    return apiWrapper(
      async () => {
        const { data } = await api.post<SignInResponse<BaseUser>>(
          `/auth/parishioner/login`,
          credentials
        );
        return data;
      },
      {
        errorMessage: "Failed to sign in",
      }
    );
  },
  leaderSignin: async (
    credentials: Credentials
  ): Promise<ApiResponse<SignInResponse>> => {
    return apiWrapper(
      async () => {
        const { data } = await api.post<SignInResponse<BaseUser>>(
          `/auth/user/login`,
          credentials
        );
        return data;
      },
      {
        errorMessage: "Failed to sign in",
      }
    );
  },
};
