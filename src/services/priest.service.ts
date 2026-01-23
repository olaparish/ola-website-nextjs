import api from "@/utils/axios";
import {
  CreateResidentPristDto,
  CreateVisitingPristDto,
  PriestUser,
  SuccessResponse,
} from "../../types";

export const priestService = {
  async getCurrentPriests(): Promise<PriestUser[]> {
    return api
      .get<{ data: PriestUser[] }>("/priest/current")
      .then((res) => res.data.data);
  },

  async createResidentPriest(
    data: CreateResidentPristDto,
  ): Promise<SuccessResponse> {
    return api
      .post<{ data: SuccessResponse }>("/priest/resident", data)
      .then((res) => res.data.data);
  },

  async createVisitingPriest(
    data: CreateVisitingPristDto,
  ): Promise<SuccessResponse> {
    return api
      .post<{ data: SuccessResponse }>("/priest/visiting", data)
      .then((res) => res.data.data);
  },
};
