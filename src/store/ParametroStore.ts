import { create } from "zustand";
import { IDataParametro, IParametro } from "../types/IParametro";

interface State {
  data: IParametro[];
  setData: (data: IDataParametro) => void;
  selectedIndex: number;
  setSelectedIndex: (id: number) => void;
}

export const useParametroStore = create<State>()((set) => ({
  data: [],
  setData: (data: IDataParametro) => set({ data: data.data }),
  selectedIndex: 0,
  setSelectedIndex: (id: number) => set({ selectedIndex: id }),
}));
