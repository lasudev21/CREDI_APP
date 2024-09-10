import { create } from "zustand";
import { IItemsCBox, IItemsCBoxV1, IPeriodos } from "../types/IRuta";
import { ICredito, ICreditoData } from "../types/ICredito";
import { IUsuario, UsuarioVacio } from "../types/IUsuario";

interface State {
  data: ICredito[];
  setData: (data: ICreditoData) => void;
  cobrador: IUsuario;
  cartera: number;
  isModalOpen: boolean;
  rutaId: number;
  dias: IItemsCBoxV1[];
  rutas: IItemsCBox[];
  setRutaId: (id: number) => void;
  setRutas: (rutas: IItemsCBox[]) => void;
  periodos: IItemsCBox[];
  setPeriodos: (periodos: IPeriodos) => void;
  setIsModal: (state: boolean) => void;
  totalRecord: 0,
}

export const useRutaStore = create<State>()((set) => ({
  data: [],
  setData: (data: ICreditoData) =>
    set({ data: data.data, cobrador: data.cobrador, cartera: data.cartera }),
  cobrador: UsuarioVacio,
  cartera: 0,
  isModalOpen: false,
  rutaId: 0,
  dias: [],
  rutas: [],
  setRutas: (rutas: IItemsCBox[]) => set({ rutas: rutas }),
  periodos: [],
  setPeriodos: (periodos: IPeriodos) =>
    set({ periodos: periodos.data, dias: periodos.dias }),
  setIsModal: (state: boolean) => set({ isModalOpen: state }),
  setRutaId: (id: number) => set({ rutaId: id }),
  totalRecord: 0,
}));
