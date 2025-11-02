import { create } from "zustand";
import { ParishGroup, ParishGroupResponse } from "../../types";

interface ParishGroupState {
  communities: ParishGroup[];
  societies: ParishGroup[];
  outstations: ParishGroup[];
  setGroups: (data: ParishGroupResponse) => void;
}

export const useParishGroupStore = create<ParishGroupState>((set) => ({
  communities: [],
  societies: [],
  outstations: [],
  setGroups: (data: ParishGroupResponse) =>
    set(() => ({
      communities: data.communities,
      societies: data.societies,
      outstations: data.outstations,
    })),
}));
