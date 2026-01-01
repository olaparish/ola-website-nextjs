import api from "@/utils/axios";
import { GetParishPriestType, PriestUser } from "../../types";

export const priestService = {
  async getParishPriest(): Promise<GetParishPriestType> {
    return api
      .get<{ data: GetParishPriestType }>("/parish-priest")
      .then((res) => res.data.data);
  },
  async getCurrentPriests(): Promise<PriestUser[]> {
    return api
      .get<{ data: PriestUser[] }>("/priest/current")
      .then((res) => res.data.data);
  },
};
