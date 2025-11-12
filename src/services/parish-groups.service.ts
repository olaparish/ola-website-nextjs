import api from "@/utils/axios";
import { GetUserDetails, ParishGroup, ParishGroupResponse } from "../../types";

export const parishGroupService = {
  async getGroups(): Promise<ParishGroupResponse> {
    return api
      .get<{ data: ParishGroupResponse }>("/parish-groups")
      .then((res) => res.data.data);
  },

  async getGroup(): Promise<GetUserDetails<ParishGroup>> {
    return api
      .get<{ data: GetUserDetails<ParishGroup> }>("/parish-group")
      .then((res) => res.data.data);
  },

  async updateGroup(
    data: Partial<ParishGroup>
  ): Promise<GetUserDetails<ParishGroup>> {
    return api
      .patch<{ data: GetUserDetails<ParishGroup> }>("/parish-group", data)
      .then((res) => res.data.data);
  },
};
