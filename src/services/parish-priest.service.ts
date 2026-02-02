import api from "@/utils/axios";
import { GetParishPriestType } from "../../types";

export const parishPriestService = {
  async getPublicParishPriest(): Promise<GetParishPriestType> {
    return api
      .get<{ data: GetParishPriestType }>("/parish-priest")
      .then((res) => res.data.data);
  },

  async getMe(): Promise<GetParishPriestType> {
    return api
      .get<{ data: GetParishPriestType }>("/parish-priest/me")
      .then((res) => res.data.data);
 
  },

  async updateParishPriest(
    id: string,
    data: Partial<Omit<import("../../types").ParishPriest, "id" | "createdAt" | "updatedAt">>
  ): Promise<import("../../types").ParishPriest> {
    return api
      .patch<{ data: import("../../types").ParishPriest }>(`/parish-priest/${id}`, data)
      .then((res) => res.data.data);
  },
};
