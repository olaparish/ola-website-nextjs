import api from "@/utils/axios";
import { CreateInitiationDto, GroupInitiation } from "../../types";

export const groupInitiationService = {
  async createInitiation(data: CreateInitiationDto): Promise<GroupInitiation> {
    return api
      .post<{ data: GroupInitiation }>("/initiation", data)
      .then((res) => res.data.data);
  },
};
