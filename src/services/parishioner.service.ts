import api from "@/utils/axios";
import { GetUserDetails, NewParishionerFormData } from "../../types";
import {
  CreateParishionerResponseType,
  Parishioner,
  UpdateParishionerDtoType,
} from "../../types/parishioner";

export const parishionerService = {
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

  async update(
    id: string,
    data: UpdateParishionerDtoType
  ): Promise<GetUserDetails<Parishioner>> {
    return api
      .patch<{ data: GetUserDetails<Parishioner> }>(`parishioner/${id}`, data)
      .then((res) => res.data.data);
  },
};
