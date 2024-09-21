import moment from "moment";
import { ICredito } from "../types/ICredito";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useRutaStore } from "../store/RutaStore";
import { NumberFormat } from "./helper";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
                text: cobrador.nombres,
                italics: true,
                color: "gray",
                alignment: "center",
                fontSize: 8,
              },
              "TELEFONO",
              {
                text: NumberFormat(cartera),
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

  data.map((x: ICredito, index: number) => {
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
