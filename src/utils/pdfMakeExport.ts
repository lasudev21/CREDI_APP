/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { ICredito } from "../types/ICredito";
import pdfMake from "pdfmake/build/pdfmake";
import { useRutaStore } from "../store/RutaStore";
import { NumberFormat } from "./helper";
import { INominaCobrador, IVale } from "../types/INomina";
import { ICierres, ICuentas } from "../types/IReporte";

pdfMake.vfs = {};
pdfMake.fonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

export const exportarRuta = (data: ICredito[], fecha: string) => {
  const { rutas, cobrador, cartera } = useRutaStore.getState();
  const ruta: string =
    rutas.find((x) => x.value === data[0].ruta_id)?.label ?? "";

  const docDefinition = {
    pageSize: "LEGAL",
    pageOrientation: "landscape",
    pageMargins: 20,
    fontSize: 3,
    content: [
      {
        table: {
          widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
          body: [
            [
              "COBRADOR",
              {
                text: cobrador.nombres + " " + cobrador.apellidos,
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
              "TELEFONO",
              {
                text: cobrador.telefono1,
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
              "FECHA",
              {
                text: moment(fecha).format("LL"),
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
              "RUTA",
              {
                text: ruta,
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
              "CARTERA",
              {
                text: NumberFormat(cartera),
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
            ],
          ],
        },
        margin: [20, 0, 20, 10],
      },
      {
        table: {
          headerRows: 1,
          widths: [
            20,
            20,
            "auto",
            "auto",
            25,
            18,
            "auto",
            20,
            30,
            "auto",
            "auto",
            20,
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
          ],
          body: [
            [
              {
                text: "Obs",
                style: "header",
              },
              {
                text: "Orden",
                style: "header",
              },
              {
                text: "Días",
                style: "header",
              },
              {
                text: "Cliente",
                style: "header",
              },
              {
                text: "Cuota",
                style: "header",
              },
              {
                text: "Mora",
                style: "header",
              },
              {
                text: "PAG",
                style: "header",
              },
              {
                text: "Prestamo",
                style: "header",
              },
              {
                text: "Modo",
                style: "header",
              },
              {
                text: "Saldo",
                style: "header",
              },
              {
                text: "Ult pag",
                style: "header",
              },
              {
                text: "$UP",
                style: "header",
              },
              {
                text: "Inicio",
                style: "header",
              },
              {
                text: "Negocio",
                style: "header",
              },
              {
                text: "Dirección",
                style: "header",
              },
              {
                text: "Telefono",
                style: "header",
              },
              {
                text: "Fiador",
                style: "header",
              },
              {
                text: "Telefono",
                style: "header",
              },
            ],
          ],
        },
        margin: [20, 0, 20, 0],
      },
    ],
    styles: {
      header: {
        fontSize: 7,
        bold: true,
        italics: true,
        fillColor: "#f9f9f9",
      },
      tableBody: {
        alignment: "right",
        fontSize: 7,
      },
    },
  };

  data.map((x: ICredito) => {
    let color = "";

    switch (true) {
      case x.mora >= 5 && x.mora <= 9:
        color = "#FBF462";
        break;
      case x.mora >= 10 && x.mora <= 19:
        color = "#F1775C";
        break;
      case x.mora >= 20:
        color = "#A25EEA";
        break;
    }
    docDefinition.content[1].table.body.push([
      {
        text:
          x.creditos_renovaciones.length > 0
            ? "#" + x.creditos_renovaciones.length
            : "",
        style: "tableBody",
      },
      {
        text: x.orden,
        style: "tableBody",
      },
      {
        text: x.obs_dia,
        style: "tableBody",
      },
      {
        text: x.cliente.titular,
        style: "tableBody",
      },
      {
        text: "",
        style: "tableBody",
      },
      {
        text: x.mora,
        style: "tableBody",
        fillColor: color,
      },
      {
        text: x.cuotas_pagas,
        style: "tableBody",
      },
      {
        text: x.valor_prestamo / 1000,
        style: "tableBody",
      },
      {
        text: x.mod_dias + "-" + x.mod_cuota / 1000,
        style: "tableBody",
      },
      {
        text: NumberFormat(x.saldo),
        style: "tableBody",
      },
      {
        text: x.fecha_ultimo_pago,
        style: "tableBody",
      },
      {
        text: x.valor_ultimo_pago / 100,
        style: "tableBody",
      },
      {
        text: x.inicio_credito,
        style: "tableBody",
      },
      {
        text: x.cliente.neg_titular,
        style: "tableBody",
      },
      {
        text: x.cliente.dir_cobro,
        style: "tableBody",
      },
      {
        text: x.cliente.tel_cobro,
        style: "tableBody",
      },
      {
        text: x.cliente.fiador,
        style: "tableBody",
      },
      {
        text: x.cliente.tel_fiador,
        style: "tableBody",
      },
    ]);
  });

  pdfMake
    .createPdf(docDefinition)
    .download("Listado Ruta del " + moment().format("YYYY-MM-DD"));
};

const getHeaderCoteos = (dates: string[]) => {
  const header1 = [
    {
      text: "COBRADOR",
      style: "header",
    },
    {
      text: "DIARIOS",
      style: "header",
    },
    {
      text: "SEMANALES",
      style: "header",
    },
  ];

  dates.map((item) => {
    header1.push({ text: item, style: "header" });
  });

  header1.push({ text: "COTEADO", style: "header" });
  header1.push({ text: "QUEDADO", style: "header" });

  return header1;
};

const getHeaderUtilidadRecaudo = () => {
  return [
    {
      text: "COBRADOR",
      style: "header",
    },
    {
      text: "CORTE 1",
      style: "header",
    },
    {
      text: "CORTE 2",
      style: "header",
    },
    {
      text: "CORTE 3",
      style: "header",
    },
    {
      text: "TOTAL",
      style: "header",
    },
  ];
};

export const exportarCoteos = (
  corte1: any[],
  corte2: any[],
  corte3: any[],
  utilidad: any[],
  recaudo: any[],
  nuevosYren: any[],
  dates: string[]
) => {
  const dates1 = dates.slice(0, 10);
  const header1 = getHeaderCoteos(dates1);

  const dates2 = dates.slice(10, 20);
  const header2 = getHeaderCoteos(dates2);

  const dates3 = dates.slice(20);
  const header3 = getHeaderCoteos(dates3);

  const headerNuevosYRen = [
    {
      text: "COBRADOR",
      style: "header",
      rowSpan: 2,
    },
    {
      text: "CORTE 1",
      style: "header",
      colSpan: 2,
    },
    {},
    {
      text: "CORTE 2",
      style: "header",
      colSpan: 2,
    },
    {},
    {
      text: "CORTE 3",
      style: "header",
      colSpan: 2,
    },
    {},
    {
      text: "TOTAL NUEVOS",
      style: "header",
      rowSpan: 2,
    },
    {
      text: "TOTAL RENOVADOS",
      style: "header",
      rowSpan: 2,
    },
  ];

  const headerNuevosYRen1 = [
    {},
    {
      text: "NUEVOS",
      style: "header",
    },
    {
      text: "RENOVADOS",
      style: "header",
    },
    {
      text: "NUEVOS",
      style: "header",
    },
    {
      text: "RENOVADOS",
      style: "header",
    },
    {
      text: "NUEVOS",
      style: "header",
    },
    {
      text: "RENOVADOS",
      style: "header",
    },
    {},
    {},
  ];

  const docDefinition = {
    pageSize: "LEGAL",
    pageOrientation: "landscape",
    pageMargins: 20,
    fontSize: 3,
    content: [
      { text: `Corte 1 : ${dates1[dates1.length - 1]}`, style: "headerText" },
      {
        table: {
          headerRows: 1,
          widths: "auto",
          body: [header1],
        },
        margin: [20, 0, 20, 0],
      },
      { text: `Corte 2 : ${dates2[dates2.length - 1]}`, style: "headerText" },
      {
        table: {
          headerRows: 1,
          widths: "auto",
          body: [header2],
        },
        margin: [20, 20, 20, 0],
      },
      { text: `Corte 3 : ${dates3[dates3.length - 1]}`, style: "headerText" },
      {
        table: {
          headerRows: 1,
          widths: "auto",
          body: [header3],
        },
        margin: [20, 20, 20, 0],
      },
      { text: "Utilidad", style: "headerText" },
      {
        table: {
          headerRows: 1,
          widths: "auto",
          body: [getHeaderUtilidadRecaudo()],
        },
        margin: [20, 20, 20, 0],
      },
      { text: "Recaudo", style: "headerText" },
      {
        table: {
          headerRows: 1,
          widths: "auto",
          body: [getHeaderUtilidadRecaudo()],
        },
        margin: [20, 20, 20, 0],
      },
      { text: "Nuevos y renovados", style: "headerText" },
      {
        table: {
          headerRows: 2,
          widths: "auto",
          body: [headerNuevosYRen, headerNuevosYRen1],
        },
        margin: [20, 20, 20, 0],
      },
    ],
    styles: {
      header: {
        fontSize: 7,
        bold: true,
        italics: true,
        fillColor: "#f9f9f9",
      },
      tableBody: {
        alignment: "right",
        fontSize: 7,
      },
      headerText: {
        fontSize: 15,
        bold: true,
        margin: [20, 20, 20, 0],
      },
      defaultStyle: {
        font: "Roboto", // Usa Roboto aquí
      },
    },
  };

  corte1.map((item) => {
    const aux: any[] = [];
    dates1.map((x) => {
      aux.push({ text: item[x], style: "tableBody" });
    });

    docDefinition.content[1].table.body.push([
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.diarios,
        style: "tableBody",
      },
      {
        text: item.semanales,
        style: "tableBody",
      },
      ...aux,
      {
        text: item.coteado,
        style: "tableBody",
      },
      {
        text: item.quedado,
        style: "tableBody",
      },
    ]);
  });

  corte2.map((item) => {
    const aux: any[] = [];
    dates2.map((x) => {
      aux.push({ text: item[x], style: "tableBody" });
    });

    docDefinition.content[3].table.body.push([
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.diarios,
        style: "tableBody",
      },
      {
        text: item.semanales,
        style: "tableBody",
      },
      ...aux,
      {
        text: item.coteado,
        style: "tableBody",
      },
      {
        text: item.quedado,
        style: "tableBody",
      },
    ]);
  });

  corte3.map((item) => {
    const aux: any[] = [];
    dates3.map((x) => {
      aux.push({ text: item[x], style: "tableBody" });
    });

    docDefinition.content[5].table.body.push([
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.diarios,
        style: "tableBody",
      },
      {
        text: item.semanales,
        style: "tableBody",
      },
      ...aux,
      {
        text: item.coteado,
        style: "tableBody",
      },
      {
        text: item.quedado,
        style: "tableBody",
      },
    ]);
  });

  utilidad.map((item) => {
    docDefinition.content[7].table.body.push([
      {
        text: NumberFormat(item.cobrador),
        style: "tableBody",
      },
      {
        text: NumberFormat(item.corte1),
        style: "tableBody",
      },
      {
        text: NumberFormat(item.corte2),
        style: "tableBody",
      },
      {
        text: NumberFormat(item.corte3),
        style: "tableBody",
      },
      {
        text: NumberFormat(
          Number(item.corte1) + Number(item.corte2) + Number(item.corte3)
        ),
        style: "tableBody",
      },
    ]);
  });

  recaudo.map((item) => {
    docDefinition.content[9].table.body.push([
      {
        text: NumberFormat(item.cobrador),
        style: "tableBody",
      },
      {
        text: NumberFormat(item.corte1),
        style: "tableBody",
      },
      {
        text: NumberFormat(item.corte2),
        style: "tableBody",
      },
      {
        text: NumberFormat(item.corte3),
        style: "tableBody",
      },
      {
        text: NumberFormat(
          Number(item.corte1) + Number(item.corte2) + Number(item.corte3)
        ),
        style: "tableBody",
      },
    ]);
  });

  nuevosYren.map((item) => {
    docDefinition.content[11].table.body.push([
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.cobrador,
        style: "tableBody",
      },
      {
        text: item.cobrador,
        style: "tableBody",
      },
    ]);
  });

  pdfMake
    .createPdf(docDefinition)
    .download("Reporte de coteos del " + moment().format("YYYY-MM-DD"));
};

export const exportarMensual = (data: INominaCobrador[]) => {
  const docDefinition = {
    pageSize: "LEGAL",
    pageOrientation: "landscape",
    pageMargins: 20,
    fontSize: 3,
    content: [
      {
        table: {
          headerRows: 1,
          widths: [200, 50, 50, 50, 50, 50, 50, 50, 50],
          body: [
            [
              {
                text: "COBRADOR",
                style: "header",
              },
              {
                text: "Salario",
                style: "header",
              },
              {
                text: "Días laborados",
                style: "header",
              },
              {
                text: "Salario bruto",
                style: "header",
              },
              {
                text: "EPS",
                style: "header",
              },
              {
                text: "Ahorro",
                style: "header",
              },
              {
                text: "Vales",
                style: "header",
              },
              {
                text: "Descuento",
                style: "header",
              },
              {
                text: "Total a pagar",
                style: "header",
              },
            ],
          ],
        },
        margin: [20, 0, 20, 0],
      },
    ],
    styles: {
      header: {
        fontSize: 7,
        bold: true,
        italics: true,
        fillColor: "#f9f9f9",
      },
      tableBody: {
        alignment: "right",
        fontSize: 7,
      },
    },
  };

  data.map((x: INominaCobrador) => {
    docDefinition.content[0].table.body.push([
      {
        text: x.cobrador.nombres + " " + x.cobrador.apellidos,
        style: "tableBody",
      },
      {
        text: x.salario * 1000,
        style: "tableBody",
      },
      {
        text: x.dias_laborados,
        style: "tableBody",
      },
      {
        text: x.salario * x.dias_laborados * 1000,
        style: "tableBody",
      },
      {
        text: x.eps * 1000,
        style: "tableBody",
      },
      {
        text: x.ahorro * 1000,
        style: "tableBody",
      },
      {
        text: x.vales.reduce((acc: number, vale: IVale) => {
          return acc + (vale.valor || 0);
        }, 0),
        style: "tableBody",
      },
      {
        text:
          Number(x.eps * 1000) +
          x.vales.reduce((acc: number, vale: IVale) => {
            return acc + (vale.valor || 0);
          }, 0),
        style: "tableBody",
      },
      {
        text:
          Number(x.salario * 1000) * Number(x.dias_laborados) -
          (Number(x.eps * 1000) +
            x.vales.reduce((acc: number, vale: IVale) => {
              return acc + (vale.valor || 0);
            }, 0)),
        style: "tableBody",
      },
    ]);
  });

  pdfMake
    .createPdf(docDefinition)
    .download("Listado Ruta del " + moment().format("YYYY-MM-DD"));
};

export const exportarCuentas = (
  cierres: ICierres[],
  cuentas: ICuentas[],
  year: number
) => {
  const docDefinition = {
    pageSize: "LEGAL",
    pageOrientation: "landscape",
    pageMargins: 20,
    fontSize: 3,
    content: [
      {
        table: {
          widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
          body: [
            [
              "CAJA",
              {
                text: "",
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
              "CARTERA",
              {
                text: "",
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
              "VALUACIÓN",
              {
                text: "",
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
              "ACTIVOS FIJOS",
              {
                text: "",
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
              "PROMEDIO",
              {
                text: "",
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
            ],
          ],
        },
        margin: [20, 0, 20, 10],
      },
      {
        table: {
          headerRows: 1,
          widths: [130, 130, 130, 130, 130, 130, 130, 130, 130],
          body: [
            [
              {
                text: "MES",
                style: "header",
              },
              {
                text: "COBROS",
                style: "header",
              },
              {
                text: "PRESTAMOS",
                style: "header",
              },
              {
                text: "UTILIDAD BRUTA",
                style: "header",
              },
              {
                text: "GASTOS",
                style: "header",
              },
              {
                text: "UTILIDAD NETA",
                style: "header",
              },
            ],
          ],
        },
        margin: [20, 0, 20, 20],
      },
      {
        table: {
          headerRows: 1,
          widths: [200, 200, 200, 200],
          body: [
            [
              {
                text: "MES",
                style: "header",
              },
              {
                text: "ENTRADAS",
                style: "header",
              },
              {
                text: "SALIDAS",
                style: "header",
              },
              {
                text: "TOTAL",
                style: "header",
              },
            ],
          ],
        },
        margin: [20, 0, 20, 0],
      },
    ],
    styles: {
      header: {
        fontSize: 7,
        bold: true,
        italics: true,
        fillColor: "#f9f9f9",
      },
      tableBody: {
        alignment: "right",
        fontSize: 7,
      },
    },
    footer: function (currentPage: number, pageCount: number) {
      return {
        columns: [
          {
            text: "Informe de Cuentas año: " + year,
            alignment: "left",
            margin: [40, 0],
          },
          {
            text: "Página " + currentPage + " de " + pageCount,
            alignment: "right",
            margin: [0, 0, 40, 0],
          },
        ],
        margin: [0, 0, 0, 20], // margen del footer
      };
    },
  };

  cierres.map((x: ICierres) => {
    docDefinition.content[1].table.body.push([
      {
        text: x.mes,
        style: "tableBody",
      },
      {
        text: x.cobros,
        style: "tableBody",
      },
      {
        text: x.prestamos,
        style: "tableBody",
      },
      {
        text: x.utilidad,
        style: "tableBody",
      },
      {
        text: x.gastos,
        style: "tableBody",
      },
      {
        text: x.utilidad - x.gastos,
        style: "tableBody",
      },
    ]);
  });

  cuentas.map((x: ICuentas) => {
    docDefinition.content[2].table.body.push([
      {
        text: x.mes,
        style: "tableBody",
      },
      {
        text: x.entradas,
        style: "tableBody",
      },
      {
        text: x.salidas,
        style: "tableBody",
      },
      {
        text: x.entradas - x.salidas,
        style: "tableBody",
      },
    ]);
  });

  pdfMake
    .createPdf(docDefinition)
    .download("Reporte de Cuentas - " + moment().format("YYYY-MM-DD"));
};
