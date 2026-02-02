import api, { BASE_URL } from "@/utils/axios";
import { RangeOptionId } from "../../types";
import { StatsType } from "../../types/stats.type";

export const statsService = {
  async get(
    period: RangeOptionId,
    startDate?: string,
    endDate?: string,
  ): Promise<StatsType> {
    const url = new URL(BASE_URL + "/stats/system");

    if (period !== "custom") {
      url.searchParams.append("period", period.toString());
    } else {
      url.searchParams.append("startDate", startDate as string);
      url.searchParams.append("endDate", endDate as string);
    }

    return api.get<{ data: StatsType }>(url.toString()).then((res) => {
      return res.data.data as unknown as StatsType;
    });
  },
};
