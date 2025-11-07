import { apiWrapper, ApiResponse } from "@/utils/api-wrapper";
import api from "@/utils/axios";
import { Credentials, SignInResponse } from "../../types/auth.type";
import { ParishionerUser } from "../../types";

export const authService = {
  signin: async (
    credentials: Credentials
  ): Promise<ApiResponse<SignInResponse>> => {
    return apiWrapper(
      async () => {
        const { data } = await api.post<SignInResponse<ParishionerUser>>(
          "/auth/user/login",
          // { email: credentials.username, password: credentials.password }
          { email: "alouismariea97@gmail.com", password: "2025-10-31" }
        );
        return data;
      },
      {
        errorMessage: "Failed to sign in",
      }
    );
  },
};
