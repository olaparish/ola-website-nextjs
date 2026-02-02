import api, { BASE_URL } from "@/utils/axios";
import { PaginateResult, ParishionerWitUser, Confirmation } from "../../types";

export const confirmationService = {
  async getAll(page = 1, search?: string, limit = 20): Promise<PaginateResult<Confirmation>> {
    const url = new URL(BASE_URL + "/confirmations");

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());
    if (search) url.searchParams.append("search", search);

    return api.get<PaginateResult<Confirmation>>(url.toString()).then((res) => {
      return res.data as unknown as PaginateResult<Confirmation>;
    });
  },
  async getConfrimationData(
    confirmationId: string,
    page = 1,
    search?: string,
    limit = 20,
  ): Promise<PaginateResult<ParishionerWitUser>> {
    const url = new URL(
      `${BASE_URL}/confirmations/${confirmationId}/parishioners`,
    );

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());
    if (search) url.searchParams.append("search", search);

    return api
      .get<PaginateResult<ParishionerWitUser>>(url.toString())
      .then((res) => {
        return res.data as unknown as PaginateResult<ParishionerWitUser>;
      });
  },
  async getById(confirmationId: string): Promise<Confirmation> {
    return api.get<{ data: Confirmation }>(`${BASE_URL}/confirmations/${confirmationId}`).then((res) => {
      return res.data.data;
    });
  },
};
