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
      .get<{ data: PriestUser[] }>("/priests/current")
      .then((res) => res.data.data);
  },

  async createResidentPriest(
    data: CreateResidentPristDto,
  ): Promise<SuccessResponse> {
    return api
      .post<{ data: SuccessResponse }>("/priests/resident", data)
      .then((res) => res.data.data);
  },

  async createVisitingPriest(
    data: CreateVisitingPristDto,
  ): Promise<SuccessResponse> {
    return api
      .post<{ data: SuccessResponse }>("/priests/visiting", data)
      .then((res) => res.data.data);
  },

  async getPriest(id: string): Promise<PriestUser> {
    return api
      .get<{ data: PriestUser }>(`/priests/${id}`)
      .then((res) => res.data.data);
  },

  async updatePriest(
    id: string,
    data: Partial<Omit<import("../../types").Priest, "id" | "createdAt" | "updatedAt">>
  ): Promise<import("../../types").Priest> {
    return api
      .patch<{ data: import("../../types").Priest }>(`/priests/${id}`, data)
      .then((res) => res.data.data);
  },
};
