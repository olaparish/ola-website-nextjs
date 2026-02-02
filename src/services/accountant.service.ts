import api, { BASE_URL } from "@/utils/axios";
import {
  Accountant,
  AccountantUser,
  CreateAccountantDto,
  PaginateResult,
  SuccessResponse,
} from "../../types";

export const accountantService = {
  async getAll(page = 1, search?: string, limit = 20): Promise<PaginateResult<AccountantUser>> {
    const url = new URL(BASE_URL + "/accountants");

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());
    if (search) url.searchParams.append("search", search);

    return api.get<PaginateResult<Accountant>>(url.toString()).then((res) => {
      return res.data as unknown as PaginateResult<AccountantUser>;
    });
  },

  async getAccountant(accountantId: string): Promise<AccountantUser> {
    return api
      .get<{ data: AccountantUser }>(`/accountants/${accountantId}`)
      .then((res) => res.data.data);
  },

  async createAccountant(data: CreateAccountantDto): Promise<SuccessResponse> {
    return api
      .post<{ data: SuccessResponse }>("/accountants", data)
      .then((res) => res.data.data);
  },

  async updateAccountant(
    id: string,
    data: Partial<Omit<import("../../types").Accountant, "id" | "createdAt" | "updatedAt">>
  ): Promise<import("../../types").Accountant> {
    return api
      .patch<{ data: import("../../types").Accountant }>(`/accountants/${id}`, data)
      .then((res) => res.data.data);
  },
};
