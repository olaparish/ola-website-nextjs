import { Parishioner } from "./parishioner";
import { PriestUser } from "./priest.type";
import { User } from "./users";

type BaseBaptism = {
  id: string;
  officiatingPriestId: string;
  officiatingPriest?: PriestUser;
  date: string;
  type: "INFANT" | "NORMAL";
  createdById: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  parishioners?: Parishioner[];
  count: number;
  createdBy?: User;
};

export type Baptism = BaseBaptism;
