import api from "@/utils/axios";
import { ParishGroupResponse } from "../../types";

export const parishGroupsService = {
  async getGroups(): Promise<ParishGroupResponse> {
    return api
      .get<{ data: ParishGroupResponse }>("/parish-groups")
      .then((res) => res.data.data);
  },
};
