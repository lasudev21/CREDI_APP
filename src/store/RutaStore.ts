import { create } from "zustand";
import { IItemsCBox, IPeriodos } from "../types/IRuta";
import { ICrearCredito, ICredito, ICreditoData, IEstadoCreditoActualVacio } from "../types/ICredito";
import { IUsuario, UsuarioVacio } from "../types/IUsuario";
import moment from "moment";

interface State {
  data: ICredito[];
  setData: (data: ICreditoData) => void;
  setNuevosData: (data: ICrearCredito[]) => void;
  cobrador: IUsuario;
  cartera: number;
  rutaId: number;
  setRutaId: (id: number) => void;
  rutas: IItemsCBox[];
  setRutas: (rutas: IItemsCBox[]) => void;
  periodos: IItemsCBox[];
  setPeriodos: (periodos: IPeriodos) => void;
  clearPeriodos: () => void;
  totalRecord: 0;
  disabled: boolean;
  setDisable: (status: boolean) => void;
  nuevos: number;
  setNuevos: (nuevos: number) => void;
  clearNuevos: () => void;
  updateOrdenById: (creditos: ICredito[]) => void;
}

export const useRutaStore = create<State>()((set, get) => ({
  data: [],
  setData: (data: ICreditoData) =>
    set({ data: data.data, cobrador: data.cobrador, cartera: data.cartera }),
  setNuevosData: (creditos: ICrearCredito[]) => {
    set((state) => {
      const currentData = state.data;

      // Obtener el valor máximo de `orden` actual para incrementarlo dinámicamente
      let maxOrder =
        currentData.length > 0
          ? Math.max(...currentData.map((c) => c.orden))
          : 0;
      const newCreditos = creditos.map((crearCredito) => {
        maxOrder += 1;
        return {
          id: 0,
          orden: maxOrder,
          obs_dia: crearCredito.ObsDia,
          cliente_id: crearCredito.ClienteId,
          cliente: crearCredito.Cliente,
          valor_total:
            Number(crearCredito.ModCuota) * Number(crearCredito.ModDias) * 1000,
          ruta_id: crearCredito.RutaId,
          mora: 0,
          cuotas_pagas: 0,
          valor_prestamo: Number(crearCredito.ValorPrestamo) * 1000,
          mod_cuota: Number(crearCredito.ModCuota) * 1000,
          mod_dias: crearCredito.ModDias || 0,
          observaciones: crearCredito.Observaciones,
          modalidad: crearCredito.modalidad,
          activo: true,
          eliminado: false,
          inicio_credito: moment(new Date()).format("YYYY-MM-DD"),
          congelar: false,
          valor_ultimo_pago: 0,
          fecha_ultimo_pago: null,
          creditos_detalles: [],
          creditos_renovaciones: [],
          saldo:
            Number(crearCredito.ModCuota) * Number(crearCredito.ModDias) * 1000,
          cuota: "NEW",
          renovacion: null,
          delete: false,
          update_mora: false,
          nuevo: true,
          reversar_cuota: false,
          modificado: false,
          estado_credito_actual: IEstadoCreditoActualVacio
        } as ICredito;
      });

      // Retornamos el nuevo estado con los nuevos créditos añadidos
      return { data: [...state.data, ...newCreditos] };
    });
  },
  cobrador: UsuarioVacio,
  cartera: 0,
  rutaId: 0,
  setRutaId: (id: number) => set({ rutaId: id }),
  rutas: [],
  setRutas: (rutas: IItemsCBox[]) => set({ rutas: rutas }),
  periodos: [],
  setPeriodos: (periodos: IPeriodos) =>
    set({
      periodos: periodos.modosPago,
      rutas: periodos.rutas,
    }),
  clearPeriodos: () =>
    set({
      periodos: [],
      rutas: [],
    }),
  totalRecord: 0,
  disabled: false,
  setDisable: (status: boolean) => set({ disabled: status }),
  nuevos: 0,
  setNuevos: (_nuevos: number) => set({ nuevos: get().nuevos + _nuevos }),
  clearNuevos: () => set({ nuevos: 0 }),
  updateOrdenById: (creditos: ICredito[]) => {
    const currentData = get().data;

    const updatedData = currentData.map((item) => {
      const creditoEncontrado = creditos.find(
        (credito) => credito.id === item.id
      );

      if (creditoEncontrado) {
        return {
          ...item,
          orden: creditoEncontrado.orden,
        };
      }

      return item;
    });

    const sortedData = updatedData.sort((a, b) => a.orden - b.orden);
    set({ data: sortedData });
  },
}));
