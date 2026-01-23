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
};
