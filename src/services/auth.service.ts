import { apiWrapper, ApiResponse } from "@/utils/api-wrapper";
import api from "@/utils/axios";
import { ParishionerCredentials, SignInResponse } from "../../types/auth.type";
import { ParishionerUser } from "../../types";

export const authService = {
  signin: async (
    credentials: ParishionerCredentials
  ): Promise<ApiResponse<SignInResponse>> => {
    return apiWrapper(
      async () => {
        const { data } = await api.post<SignInResponse<ParishionerUser>>(
          "/auth/parishioner/login",
          { id: credentials.id, password: credentials.password }
          // { email: "alouismariea97@gmail.com", password: "2025-10-31" }
        );
        return data;
      },
      {
        errorMessage: "Failed to sign in",
      }
    );
  },
};
