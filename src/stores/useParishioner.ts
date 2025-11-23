import { create } from "zustand";
import { BaseUser, GetUserDetails, Parishioner } from "../../types";

interface ParishionerState {
  user: BaseUser | undefined;
  parishioner: Parishioner | undefined;
  setAll: (data: GetUserDetails<Parishioner>) => void;
  setParishioner: (data: Parishioner) => void;
  setUser: (data: BaseUser) => void;
}

export const useParishionerStore = create<ParishionerState>((set) => ({
  parishioner: undefined,
  user: undefined,
  setAll: (data: GetUserDetails<Parishioner>) =>
    set(() => ({
      user: data.user,
      parishioner: data.userData,
    })),
  setParishioner: (data: Parishioner) =>
    set(() => ({
      parishioner: data,
    })),
  setUser: (data: BaseUser) => set(() => ({ user: data })),
}));
