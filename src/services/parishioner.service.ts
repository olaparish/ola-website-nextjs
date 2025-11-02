import api from "@/utils/axios";
import { NewParishionerFormData } from "../../types";
import { CreateParishionerResponseType } from "../../types/parishioner";

export const parishionerService = {
  async createParishioner(data: NewParishionerFormData) {
    return api
      .post<CreateParishionerResponseType>("/parishioner", data)
      .then((res) => res.data);
  },
};
