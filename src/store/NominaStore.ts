import { create } from "zustand";
import { IItemsCBox } from "../types/IRuta";
import {
  INominaCobrador,
  INominaData,
  IVale,
  NominaVacio,
} from "../types/INomina";
import { IUsuario } from "../types/IUsuario";

interface UserStore {
  list: INominaCobrador[];
  setList: (data: INominaCobrador[], month: number, year: number) => void;
  cobradores: IItemsCBox[];
  fechas: IItemsCBox[];
  setCobradores: (data: INominaData) => void;
  nomina_id: number;
  setNominaId: (id: number) => void;
  month: number | null;
  year: number | null;
  setNuevosData: (data: IUsuario) => void;
  addValeToNominaCobrador: (
    nominaCobradorId: number,
    newVale: IVale,
    indexVale: number | null
  ) => void;
  deleteValeToNominaCobrador: (indexNomina: number, indexVale: number) => void;
}

export const useNominaStore = create<UserStore>()((set) => ({
  list: [],
  setList: (data: INominaCobrador[], month: number, year: number) => {
    if (data.length > 0) {
      const nomina_id = data[0].nomina_id;
      set({ list: data, nomina_id, month, year });
    } else {
      set({ list: [], nomina_id: 0, month, year });
    }
  },
  cobradores: [],
  fechas: [],
  setCobradores: (data: INominaData) =>
    set({ cobradores: data.cobradores, fechas: data.fechas }),
  nomina_id: 0,
  setNominaId: (id: number) => set({ nomina_id: id }),
  month: null,
  year: null,
  setNuevosData: (data: IUsuario) => {
    set((state) => {
      const newData = {
        id: 0,
        ahorro: 0,
        cobrador_id: data.id,
        cobrador: data,
        nomina_id: 0,
        dias_laborados: 0,
        eps: 0,
        nomina: NominaVacio,
        salario: 0,
        vales: [],
      };
      return { ...state, list: [...state.list, newData] };
    });
  },
  addValeToNominaCobrador: (
    nominaCobradorId: number,
    newVale: IVale,
    indexVale: number | null
  ) => {
    set((state) => {
      const updatedList = state.list.map((nomina, index) => {
        if (indexVale != null) {
          const lVales = nomina.vales.map((item: IVale, index: number) => {
            if (index === indexVale) item = newVale;

            return item;
          });

          return { ...nomina, vales: lVales };
        } else {
          newVale.nomina_cobrador_id = state.nomina_id;
          if (index === nominaCobradorId) {
            return {
              ...nomina,
              vales: [...nomina.vales, newVale],
            };
          }
        }
        return nomina;
      });
      return { list: updatedList };
    });
  },
  deleteValeToNominaCobrador: (indexNomina: number, indexVale: number) => {
    set((state) => {
      const updatedList = state.list.map((nomina, index) => {
        if (indexNomina === index) {
          const lVales = nomina.vales.filter((_, i) => i !== indexVale);

          return { ...nomina, vales: lVales };
        }

        return nomina;
      });
      return { list: updatedList };
    });
  },
}));
