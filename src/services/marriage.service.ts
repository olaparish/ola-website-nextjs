import api, { BASE_URL } from "@/utils/axios";
import {
  PaginateResult,
  Marriage,
  GetUserDetails,
  DataGetType,
} from "../../types";

export const marriageService = {
  async getAll(page = 1, limit = 20): Promise<PaginateResult<Marriage>> {
    const url = new URL(BASE_URL + "/marriages");

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());

    return api.get<PaginateResult<Marriage>>(url.toString()).then((res) => {
      return res.data as unknown as PaginateResult<Marriage>;
    });
  },

  async getMarriage(parishionerId: string): Promise<DataGetType<Marriage>> {
    return api
      .get<{
        data: DataGetType<Marriage>;
      }>("/parishioner/" + parishionerId)
      .then((res) => res.data.data);
  },
};
