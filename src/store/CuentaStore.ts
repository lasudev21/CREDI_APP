import { create } from "zustand";
import { IItemsCBox } from "../types/IRuta";
import { ICierres, ICuentas, IReporteCuentasData } from "../types/IReporte";

interface CuentaStore {
  list: ICierres[];
  list1: ICuentas[];
  setList: (data: IReporteCuentasData, year: number) => void;
  fechas: IItemsCBox[];
  setFechas: (data: IItemsCBox[]) => void;
  year: number | null;
  reset: () => void; // Agregar la función reset
}

export const useCuentaStore = create<CuentaStore>()((set) => ({
  list: [],
  list1: [],
  setList: (data: IReporteCuentasData, year: number) =>
    set({ list: data.cierres, list1: data.cuentas, year }),
  fechas: [],
  setFechas: (data: IItemsCBox[]) => set({ fechas: data }),
  year: null,
  reset: () => set({ list: [], list1: [], fechas: [], year: null }), // Implementación de reset
}));
