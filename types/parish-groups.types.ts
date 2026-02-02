import { PaginateResult } from "./parishioner";
import { Parishioner } from "./parishioner";
import { BaseUser, UserDataType } from "./users";

export interface ParishGroup {
  id: string;
  name: string;
  email: string;
  type: string;
  heroImage: string;
  writeup: string;
  otherImages: string;
  phone: string;
  address: string;
  facebook: string;
  website: string;
  dateFounded: string;
  slug: string;
  link: string;
  userId: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ParishGroupResponse = {
  communities: ParishGroup[];
  societies: ParishGroup[];
  outstations: ParishGroup[];
};

interface MemberUser extends Parishioner {
  user: BaseUser;
}

export type GroupMembersResponseType = PaginateResult<MemberUser>;
