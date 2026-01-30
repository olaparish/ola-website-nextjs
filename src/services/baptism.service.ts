import api, { BASE_URL } from "@/utils/axios";
import { PaginateResult, Baptism, ParishionerWitUser } from "../../types";

export const baptismService = {
  async getAll(page = 1, limit = 20): Promise<PaginateResult<Baptism>> {
    const url = new URL(BASE_URL + "/baptisms");

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());

    return api.get<PaginateResult<Baptism>>(url.toString()).then((res) => {
      return res.data as unknown as PaginateResult<Baptism>;
    });
  },
  async getBaptismData(
    baptismId: string,
    page = 1,
    limit = 20,
  ): Promise<PaginateResult<ParishionerWitUser>> {
    const url = new URL(`${BASE_URL}/baptisms/${baptismId}/parishioners`);

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());

    return api
      .get<PaginateResult<ParishionerWitUser>>(url.toString())
      .then((res) => {
        return res.data as unknown as PaginateResult<ParishionerWitUser>;
      });
  },
  async getById(baptismId: string): Promise<Baptism> {
    return api
      .get<{ data: Baptism }>(`${BASE_URL}/baptisms/${baptismId}`)
      .then((res) => {
        console.log("Response data: ", res.data);
        return res.data.data;
      });
  },
};
