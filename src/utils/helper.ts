import moment from "moment";
import { ICredito } from "../types/ICredito";
import { ICreditoDetalle } from "../types/ICreditoDetalle";
import { ValueFormatterParams } from "ag-grid-community";

export function recalculate(data: ICredito[], cargue: boolean = false) {
  const res: ICredito[] = [];
  let cartera: number = 0;

  data.map((x: ICredito) => {
    x.valor_total = 12;
    x.valor_total = x.mod_cuota * x.mod_dias;
    let abonos = 0;
    if (x.creditos_detalles !== undefined) {
      const entries = Object.entries(x.creditos_detalles);

      entries.forEach((element) => {
        abonos = abonos + element[1].abono;
      });

      if (entries.length > 0) {
        const ultimoPago = entries.reduce(
          (
            a: [string, ICreditoDetalle],
            b: [string, ICreditoDetalle]
          ): [string, ICreditoDetalle] => {
            return a[1].id > b[1].id ? a : b;
          }
        );
        x.valor_ultimo_pago = ultimoPago[1].abono;
        x.fecha_ultimo_pago = moment(ultimoPago[1].fecha_abono).format(
          "YYYY-MM-DD"
        );
      } else {
        x.valor_ultimo_pago = 0;
        x.fecha_ultimo_pago = null;
      }
    }

    const creditosRenovaciones = Object.entries(x.creditos_renovaciones);

    const inicioCredito =
      creditosRenovaciones.length > 0
        ? creditosRenovaciones[creditosRenovaciones.length - 1][1].fecha
        : x.inicio_credito;

    x.inicio_credito = moment(inicioCredito).format("YYYY-MM-DD");

    x.saldo = x.valor_total - abonos;
    x.cuotas_pagas = parseFloat(
      ((x.valor_total - x.saldo) / x.mod_cuota).toFixed(1)
    );

    if (cargue) {
      x.cuota = "";
    }

    cartera = cartera + x.saldo;
    res.push(x);
    return x;
  });

  return {
    data: res,
    cartera: cartera,
  };
}

export function NumberFormat(value: number) {
  return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export function DateFormat(params: ValueFormatterParams) {
  if (params.value) {
    const date = new Date(params.value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } else {
    return "";
  }
}
