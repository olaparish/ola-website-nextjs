import api from "@/utils/axios";
import {
  GetUserDetails,
  Parishioner,
  UpdateUserOmmissions,
  User,
} from "../../types";

export const userService = {
  async update(
    userId: string,
    data: Partial<Omit<User, UpdateUserOmmissions>>,
  ): Promise<GetUserDetails<Parishioner>> {
    return api
      .put<{ data: GetUserDetails<Parishioner> }>(`users/${userId}`, data)
      .then((res) => res.data.data);
  },
};
