import { create } from "zustand";

interface ParishionerState {
  parishioner: Parishioner;
  setParishioner: (data: ParishionerGetResponse) => void;
}
