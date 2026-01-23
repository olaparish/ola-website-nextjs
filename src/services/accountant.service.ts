import api, { BASE_URL } from "@/utils/axios";
import {
  Accountant,
  AccountantUser,
  CreateAccountantDto,
  PaginateResult,
  SuccessResponse,
} from "../../types";

export const accountantService = {
  async getAll(page = 1, limit = 20): Promise<PaginateResult<AccountantUser>> {
    const url = new URL(BASE_URL + "/accountants");

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());

    return api.get<PaginateResult<Accountant>>(url.toString()).then((res) => {
      return res.data as unknown as PaginateResult<AccountantUser>;
    });
  },

  async createAccountant(data: CreateAccountantDto): Promise<SuccessResponse> {
    return api
      .post<{ data: SuccessResponse }>("/accountants", data)
      .then((res) => res.data.data);
  },
};
