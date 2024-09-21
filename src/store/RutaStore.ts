import { create } from "zustand";
import { IItemsCBox, IItemsCBoxV1, IPeriodos } from "../types/IRuta";
import { ICredito, ICreditoData } from "../types/ICredito";
import { IUsuario, UsuarioVacio } from "../types/IUsuario";

interface State {
  data: ICredito[];
  setData: (data: ICreditoData) => void;
  cobrador: IUsuario;
  cartera: number;
  rutaId: number;
  setRutaId: (id: number) => void;
  dias: IItemsCBoxV1[];
  rutas: IItemsCBox[];
  setRutas: (rutas: IItemsCBox[]) => void;
  periodos: IItemsCBox[];
  setPeriodos: (periodos: IPeriodos) => void;
  totalRecord: 0;
  disabled: boolean;
  setDisable: (status: boolean) => void;
  nuevos: number;
  setNuevos: (nuevos: number) => void;
  clearNuevos: () => void;
}

export const useRutaStore = create<State>()((set, get) => ({
  data: [],
  setData: (data: ICreditoData) =>
    set({ data: data.data, cobrador: data.cobrador, cartera: data.cartera }),
  cobrador: UsuarioVacio,
  cartera: 0,
  rutaId: 0,
  setRutaId: (id: number) => set({ rutaId: id }),
  dias: [],
  rutas: [],
  setRutas: (rutas: IItemsCBox[]) => set({ rutas: rutas }),
  periodos: [],
  setPeriodos: (periodos: IPeriodos) =>
    set({
      periodos: periodos.modosPago,
      dias: periodos.dias,
      rutas: periodos.rutas,
    }),
  totalRecord: 0,
  disabled: false,
  setDisable: (status: boolean) => set({ disabled: status }),
  nuevos: 0,
  setNuevos: (_nuevos: number) => set({ nuevos: get().nuevos + _nuevos }),
  clearNuevos: () => set({ nuevos: 0 }),
}));
