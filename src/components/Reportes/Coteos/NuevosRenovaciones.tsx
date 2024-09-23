import { GridApi } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { NuevosYRenovados } from "../../../types/IReporte";

interface UtilityTableProps {
  rowData: NuevosYRenovados[];
  height: number;
}

export default function NuevosRenovaciones({
  rowData,
  height,
}: UtilityTableProps) {
  const [columnDefs] = useState([
    {
      headerName: "Cobrador",
      field: "cobrador",
      cellStyle: { backgroundColor: "rgb(3 105 161 / 62%)", color: "white" },
    },
    {
      headerName: "CLIENTES CORTE 1",
      children: [
        {
          columnGroupShow: "open",
          field: "nuevos_corte1",
          headerName: "NUEVOS",
        },
        {
          columnGroupShow: "open",
          field: "renovados_corte1",
          headerName: "RENOVADOS",
        },
      ],
    },
    {
      headerName: "CLIENTES CORTE 2",
      children: [
        // { columnGroupShow: "closed", field: "total" },
        {
          columnGroupShow: "open",
          field: "nuevos_corte2",
          headerName: "NUEVOS",
        },
        {
          columnGroupShow: "open",
          field: "renovados_corte2",
          headerName: "RENOVADOS",
        },
      ],
    },
    {
      headerName: "CLIENTES CORTE 3",
      children: [
        {
          columnGroupShow: "open",
          field: "nuevos_corte3",
          headerName: "NUEVOS",
        },
        {
          columnGroupShow: "open",
          field: "renovados_corte3",
          headerName: "RENOVADOS",
        },
      ],
    },
    {
      headerName: "TOTAL NUEVOS",
      field: "total",
      valueGetter: (params: any) => {
        return (
          Number(params.data.nuevos_corte1) +
          Number(params.data.nuevos_corte2) +
          Number(params.data.nuevos_corte3)
        );
      },
    },
    {
      headerName: "TOTAL RENOVADOS",
      field: "total",
      valueGetter: (params: any) => {
        return (
          Number(params.data.renovados_corte1) +
          Number(params.data.renovados_corte2) +
          Number(params.data.renovados_corte3)
        );
      },
    },
  ]);

  const onGridReady = (params: { api: GridApi }) => {
    params.api.sizeColumnsToFit();
    params.api.setGridOption("rowData", rowData);
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: height, width: "100%" }}
    >
      <AgGridReact
        rowHeight={30}
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
      />
    </div>
  );
}
