import api, { BASE_URL } from "@/utils/axios";
import {
  Catechist,
  CatechistUser,
  CreateCatechistDto,
  PaginateResult,
  SuccessResponse,
} from "../../types";

export const catechistService = {
  async getAll(page = 1, limit = 20): Promise<PaginateResult<CatechistUser>> {
    const url = new URL(BASE_URL + "/catechists");

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());

    return api.get<PaginateResult<Catechist>>(url.toString()).then((res) => {
      return res.data as unknown as PaginateResult<CatechistUser>;
    });
  },

  async getCatechist(catechistId: string): Promise<CatechistUser> {
    return api
      .get<{ data: CatechistUser }>(`/catechists/${catechistId}`)
      .then((res) => res.data.data);
  },

  async createCatechist(data: CreateCatechistDto): Promise<SuccessResponse> {
    return api
      .post<{ data: SuccessResponse }>("/catechists", data)
      .then((res) => res.data.data);
  },
};
