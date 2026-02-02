import api, { BASE_URL } from "@/utils/axios";
import {
  GetUserDetails,
  GroupMembersResponseType,
  PaginateResult,
  ParishGroup,
  ParishGroupResponse,
  Parishioner,
  User,
} from "../../types";

export const parishGroupService = {
  async getGroups(): Promise<ParishGroupResponse> {
    return api
      .get<{ data: ParishGroupResponse }>("/parish-groups")
      .then((res) => res.data.data);
  },

  async getGroup(): Promise<GetUserDetails<ParishGroup>> {
    return api
      .get<{ data: GetUserDetails<ParishGroup> }>("/parish-groups")
      .then((res) => res.data.data);
  },

  async updateGroup(
    data: Partial<ParishGroup>,
  ): Promise<GetUserDetails<ParishGroup>> {
    return api
      .patch<{ data: GetUserDetails<ParishGroup> }>("/parish-groups", data)
      .then((res) => res.data.data);
  },

  async getGroupMembers(
    page = 1,
    limit = 20,
  ): Promise<PaginateResult<User<Parishioner>>> {
    const url = new URL(BASE_URL + "/parish-groups/members");

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());

    return api.get<GroupMembersResponseType>(url.toString()).then((res) => {
      const result = res.data;
      const parsed = result.docs.map((res) => {
        return { ...res.user, userData: { ...res, user: undefined } };
      });
      return {
        ...result,
        docs: parsed,
      } as unknown as PaginateResult<User<Parishioner>>;
    });
  },

  async getUser(parishionerId: string): Promise<GetUserDetails<Parishioner>> {
    return api
      .get<{
        data: GetUserDetails<Parishioner>;
      }>(`/parishioner/${parishionerId}`)
      .then((res) => res.data.data);
  },

  async getGroupBySlug(slug: string): Promise<ParishGroup> {
    return api
      .get<{ data: ParishGroup }>(`/parish-groups/${slug}`)
      .then((res) => res.data.data);
  },

  async getGroupMembersBySlug(
    slug: string,
    page = 1,
    limit = 20,
  ): Promise<PaginateResult<User<Parishioner>>> {
    const url = new URL(BASE_URL + `/parish-groups/${slug}/members`);

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());

    return api.get<GroupMembersResponseType>(url.toString()).then((res) => {
      const result = res.data;
      const parsed = result.docs.map((res) => {
        return { ...res.user, userData: { ...res, user: undefined } };
      });
      return {
        ...result,
        docs: parsed,
      } as unknown as PaginateResult<User<Parishioner>>;
    });
  },
};
