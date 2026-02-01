import api, { BASE_URL } from "@/utils/axios";
import { PaginateResult, Marriage, DataGetType } from "../../types";

export const marriageService = {
  async getAll(page = 1, search?: string, limit = 20): Promise<PaginateResult<Marriage>> {
    const url = new URL(BASE_URL + "/marriages");

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());
    if (search) url.searchParams.append("search", search);

    return api.get<PaginateResult<Marriage>>(url.toString()).then((res) => {
      return res.data as unknown as PaginateResult<Marriage>;
    });
  },

  async getMarriage(marriageId: string): Promise<Marriage> {
    return api
      .get<{
        data: Marriage;
      }>("/marriages/" + marriageId)
      .then((res) => res.data.data);
  },
};
