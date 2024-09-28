import { create } from "zustand";
import { IDataFC, IFlujoCaja } from "../types/IFlujoCaja";

interface State {
  data: IDataFC[];
  setData: (data: IFlujoCaja) => void;
  page: number;
  totalRecord: number;
  sum: number;
}

export const useFlujoCajaStore = create<State>()((set) => ({
  data: [],
  setData: (data: IFlujoCaja) =>
    set({ data: data.data.data, sum: data.sum, page: data.data.current_page, totalRecord: data.data.total }),
  page: 1,
  totalRecord: 0,
  sum: 0,
}));
