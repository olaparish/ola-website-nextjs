import api, { BASE_URL } from "@/utils/axios";
import {
  GetUserDetails,
  NewParishionerFormData,
  PaginateResult,
  ParishionerUser,
} from "../../types";
import {
  CreateParishionerResponseType,
  DetailedParishionerUser,
  FinancialReport,
  Parishioner,
  UpdateParishionerDtoType,
} from "../../types/parishioner";

export const parishionerService = {
  async getAll(page = 1, search?: string, limit = 20): Promise<PaginateResult<ParishionerUser>> {
    const url = new URL(BASE_URL + "/parishioner/all");

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());
    if (search) url.searchParams.append("search", search);

    return api
      .get<PaginateResult<ParishionerUser>>(url.toString())
      .then((res) => {
        return res.data as unknown as PaginateResult<ParishionerUser>;
      });
  },

  async createParishioner(data: NewParishionerFormData) {
    return api
      .post<CreateParishionerResponseType>("/parishioner", data)
      .then((res) => res.data);
  },

  async getParishioner(): Promise<GetUserDetails<Parishioner>> {
    return api
      .get<{ data: GetUserDetails<Parishioner> }>("/parishioner")
      .then((res) => res.data.data);
  },

  async getParishionerById(
    parishionerId: string,
  ): Promise<GetUserDetails<Parishioner>> {
    return api
      .get<{
        data: GetUserDetails<Parishioner>;
      }>("/parishioner/" + parishionerId)
      .then((res) => res.data.data);
  },

  async update(
    id: string,
    data: UpdateParishionerDtoType,
  ): Promise<GetUserDetails<Parishioner>> {
    return api
      .patch<{ data: GetUserDetails<Parishioner> }>(`parishioner/${id}`, data)
      .then((res) => res.data.data);
  },

  async getParishionerDetails(
    id: string,
  ): Promise<DetailedParishionerUser> {
    return api
      .get<{ data: DetailedParishionerUser }>(`/parishioner/${id}?detailLevel=long`)
      .then((res) => res.data.data);
  },

  async getFinancialReport(
    userId: string,
    type: "receipts" | "expenditures" = "receipts",
    page = 1,
  ): Promise<FinancialReport> {
    return api
      .get<FinancialReport>(`/finance/users/${userId}?type=${type}&page=${page}`)
      .then((res) => res.data);
  },
};
