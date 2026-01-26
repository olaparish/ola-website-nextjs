import { Parishioner } from "./parishioner";
import { PriestUser } from "./priest.type";
import { User } from "./users";

export type Confirmation = {
  id: string;
  officiatingPriestId: string;
  date: string;
  createdById: string;
  count: number;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  officiatingPriest: PriestUser;
  createdBy?: User;
  parishioners?: Parishioner[];
  user?: User;
};
