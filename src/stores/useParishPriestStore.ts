import { create } from "zustand";
import { BaseUser, ParishPriest, Priest } from "../../types";

type SetAllType = {
  user: BaseUser;
  priest: Priest;
  parishPriest: ParishPriest;
};

interface ParishPriestState {
  user: BaseUser | undefined;
  priest: Priest | undefined;
  parishPriest: ParishPriest | undefined;
  setAll: (data: SetAllType) => void;
  setParishPriest: (data: ParishPriest) => void;
  setPriest: (data: Priest) => void;
  setUser: (data: BaseUser) => void;
}

export const useParishPriestStore = create<ParishPriestState>((set) => ({
  user: undefined,
  priest: undefined,
  parishPriest: undefined,
  setAll: (data: SetAllType) =>
    set(() => ({
      user: data.user,
      priest: data.priest,
      parishPriest: data.parishPriest,
    })),
  setUser: (data: BaseUser) => set(() => ({ user: data })),
  setPriest: (data: Priest) =>
    set(() => ({
      priest: data,
    })),
  setParishPriest: (data: ParishPriest) =>
    set(() => ({
      parishPriest: data,
    })),
}));
