/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ICrearCredito,
  ICredito,
  IEstadoCreditoActualVacio,
  IFlujoCajaRuta,
} from "../types/ICredito";
import { ICuota } from "../types/IRuta";
import { IUsuario } from "../types/IUsuario";
import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export const getClientes = async () => {
  try {
    const response = await api.get("creditos/clientes1");
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const saveCreditos = async (
  creditos: ICrearCredito[],
  rutaId: number
) => {
  try {
    creditos = creditos.map((item: ICrearCredito) => {
      return {
        ...item,
        ModCuota: Number(item.ModCuota) * 1000,
        ValorPrestamo: Number(item.ValorPrestamo) * 1000,
        RutaId: rutaId,
      };
    });
    const response = await api.post("creditos", creditos);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const saveAbonos = async (
  rutaId: number,
  data: ICredito[],
  flujoCaja: IFlujoCajaRuta,
  CalculoMoras: boolean,
  vales: number,
  cobrador: IUsuario
) => {
  try {
    const Eliminar: any[] = [];
    const Abonos: ICuota[] = [];
    const renovaciones: any[] = [];

    data.map((x: ICredito) => {
      if (x.delete) {
        Eliminar.push({ Id: x.id });
      } else {
        Abonos.push({
          Id: x.id,
          Cuota: x.cuota ? Number(x.cuota) * 1000 : null,
          Orden: x.orden,
          Obs: x.obs_dia,
          Observaciones: x.observaciones,
          Congelar: x.congelar,
          Mora: x.update_mora ? Number(x.mora) : null,
          Nuevo: x.nuevo
            ? {
                Cliente: x.cliente,
                ClienteId: x.cliente_id,
                ClienteText: x.cliente.titular,
                InicioCredito: x.inicio_credito,
                modalidad: x.modalidad,
                ModCuota: x.mod_cuota,
                ModDias: x.mod_dias,
                ObsDia: x.obs_dia,
                Observaciones: x.observaciones,
                Orden: x.orden,
                RutaId: rutaId,
                ValorPrestamo: x.valor_prestamo,
              }
            : null,
          ReversarCuota: x.reversar_cuota ? x.reversar_cuota : false,
          Modificado: x.modificado,
          ModificadoData: x.modificado
            ? {
                mod_cuota: x.mod_cuota,
                mod_dias: Number(x.mod_dias),
                valor_prestamo: x.valor_prestamo,
              }
            : IEstadoCreditoActualVacio,
        });

        if (x.renovacion) {
          renovaciones.push({
            Id: x.id,
            Excedente: x.renovacion.monto * 1000,
            Observaciones: x.renovacion.observaciones,
            Modalidad: x.renovacion.modalidad,
            Dias: x.renovacion.dias,
            Cuota: x.renovacion.cuota * 1000,
            ValorPrestamo: x.renovacion.valor * 1000,
            Utilidad: x.renovacion.editable ? x.renovacion.utilidad : 0,
          });
        }
      }
    });
    const response = await api.post("creditos/abonos", {
      IdRuta: rutaId,
      Abonos,
      CalculoMoras,
      Renovaciones: renovaciones,
      Eliminar,
      FlujoCaja: {
        Entrada: flujoCaja.entrada,
        Salida: flujoCaja.salida,
        Utilidad: flujoCaja.utilidad,
        Coteos: flujoCaja.coteos,
        Reversion: flujoCaja.reversion,
      },
      Vale: vales * 1000,
      User: user.Id,
      Cobrador: cobrador
    });
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const saveRenovacionInmediata = async (id: number) => {
  try {
    const response = await api.post(`creditos/renovaciones/${id}`);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};
