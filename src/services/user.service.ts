import api from "@/utils/axios";
import {
  GetUserDetails,
  Parishioner,
  UpdateUserOmmissions,
  User,
} from "../../types";

export const userService = {
  async update(
    data: Partial<Omit<User, UpdateUserOmmissions>>
  ): Promise<GetUserDetails<Parishioner>> {
    return api
      .patch<{ data: GetUserDetails<Parishioner> }>("user", data)
      .then((res) => res.data.data);
  },
};
