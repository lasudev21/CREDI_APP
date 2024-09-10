import { create } from "zustand";
import { IDataFU, IFlujoUtilidades } from "../types/IFlujoUtilidades";

interface State {
  data: IDataFU[];
  setData: (data: IFlujoUtilidades) => void;
  page: number;
  totalRecord: number;
  sum: number;
}

export const useFlujoCajaStore = create<State>()((set) => ({
  data: [],
  setData: (data: IFlujoUtilidades) =>
    set({ data: data.data.data, sum: data.sum, page: data.data.current_page, totalRecord: data.data.total }),
  page: 1,
  totalRecord: 0,
  sum: 0,
}));
