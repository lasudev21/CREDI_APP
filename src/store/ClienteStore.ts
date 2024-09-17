import { create } from "zustand";
import { ClienteVacio, ICliente, IClientes } from "../types/ICliente";

interface State {
  data: ICliente[];
  setData: (data: IClientes) => void;
  formData: ICliente;
  setFormData: (data: Partial<ICliente>) => void;
  creditosActivos: number;
  isLoading: boolean;
  setIsloading: (status: boolean) => void;
}

export const useClienteStore = create<State>()((set) => ({
  data: [],
  setData: (data: IClientes) =>
    set({ data: data.data, creditosActivos: data.creditosActivos }),
  creditosActivos: 0,
  formData: ClienteVacio,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  isLoading: true,
  setIsloading: (status: boolean) => set({ isLoading: status }),
}));
