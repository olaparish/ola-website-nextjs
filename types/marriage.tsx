import { PriestUser } from "./priest.type";
import { User } from "./users";

export type Marriage = {
  id: string;
  husbandId: string;
  wifeId: string;
  date: string;
  officiatingPriestId: string;
  createdById: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  officiatingPriest?: PriestUser;
  createdBy?: User;
  husband?: User;
  wife?: User;
};

export type MarriageDetailed = Marriage & {
  husband: User;
  wife: User;
  officiatingPriest: PriestUser;
};
