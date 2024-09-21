import jsPDF from "jspdf";
import "jspdf-autotable";
import { ICreditoDetalle } from "../types/ICreditoDetalle";
import { ICreditoRenovacion } from "../types/ICreditoRenovacion";
import moment from "moment";
import { ICliente } from "../types/ICliente";

interface AbonoRenovacion {
  abono?: number;
  fechaAbono?: string;
  usuario?: string;
  espacio: string;
  observacion?: string;
  fechaRenovacion?: string;
  estado?: string;
}

const combineData = (
  data: ICreditoDetalle[],
  data1: ICreditoRenovacion[]
): AbonoRenovacion[] => {
  const maxLength = Math.max(data.length, data1.length);
  const combined: AbonoRenovacion[] = [];

  for (let i = 0; i < maxLength; i++) {
    combined.push({
      abono: data[i]?.abono,
      fechaAbono: moment(data[i]?.fecha_abono).format("YYYY-MM-DD"),
      usuario: data[i]?.user.nombres,
      espacio: "",
      observacion: data1[i]?.observaciones,
      fechaRenovacion: data1[i]?.fecha
        ? moment(data1[i]?.fecha).format("YYYY-MM-DD")
        : "",
      estado:
        data1[i]?.estado !== undefined
          ? data1[i]?.estado
            ? "ACTIVO"
            : "INACTIVO"
          : "",
    });
  }

  return combined;
};

export const ExportarDetallesCredito = (
  creditos_detalles: ICreditoDetalle[],
  creditos_renovaciones: ICreditoRenovacion[],
  cliente: ICliente
) => {
  const combinedData = combineData(creditos_detalles, creditos_renovaciones);
  console.log(combinedData);

  const data = combinedData.map((x: AbonoRenovacion) => {
    return [
      x.abono,
      x.fechaAbono,
      x.usuario,
      x.espacio,
      x.observacion,
      x.fechaRenovacion,
      x.estado,
    ];
  });

  const doc = new jsPDF({
    orientation: "landscape",
  });

  doc.text(`Resumen de crédito cliente ${cliente.titular}`, 10, 10);

  doc.autoTable({
    head: [["Abono", "Fecha", "Usuario", "", "Observación", "Fecha", "Estado"]],
    body: data,
    startY: 20,
    startX: 10,
    theme: "striped",
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save(`DETALLES CREDITO - ${moment()} .pdf`);
};
