import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { ColDef, RowDragEndEvent } from "ag-grid-community";
import { ICredito, IEnrutarCredito } from "../../../types/ICredito";
import { useRutaStore } from "../../../store/RutaStore";
import { Save } from "lucide-react";
import { recalculate } from "../../../utils/helper";
import { useDashboardStore } from "../../../store/DashboardStore";

const DnDRutas = () => {
  const { data, setData, cobrador } = useRutaStore();
  const { toggleDrawer } = useDashboardStore();
  const [rowData, setRowData] = useState<IEnrutarCredito[]>([]);
  const [height, setHeight] = useState<number>(0);
  const gridRef = useRef<AgGridReact>(null);

  const [columnDefs] = useState<ColDef[]>([
    { rowDrag: true, headerName: "", width: 50 },
    { field: "id", headerName: "Id", hide: true },
    { field: "newPos", headerName: "Nueva Pos" },
    { field: "orden" },
    {
      field: "cliente.titular",
      width: 300,
    },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 100,
      filter: false,
    };
  }, []);

  const onGridReady = useCallback(() => {
    const dataMap: IEnrutarCredito[] = [];
    data.map((item: ICredito) => {
      dataMap.push({
        id: item.id,
        orden: item.orden,
        newPos: null,
        cliente: item.cliente,
      });
    });
    setRowData(dataMap);
  }, []);

  const onRowDragEnd = useCallback(
    (event: RowDragEndEvent) => {
      const movingNode = event.node;
      const overNode = event.overNode;

      if (overNode && movingNode) {
        const movingData = movingNode.data as IEnrutarCredito;
        const targetIndex =
          overNode.rowIndex !== undefined ? overNode.rowIndex : 0;

        const newRowData = rowData.filter((row) => row.id !== movingData.id);
        newRowData.splice(targetIndex, 0, movingData);

        const updatedRowData = newRowData.map((row, index) => ({
          ...row,
          newPos: index + 1,
        }));

        setRowData(updatedRowData);

        if (gridRef.current && gridRef.current.api) {
          gridRef.current.api.setRowData(updatedRowData);
        }
      }
    },
    [rowData]
  );

  const handleSaveOrder = () => {
    const newData = data.map((item: ICredito) => {
      item.orden = Number(
        rowData.find((x: IEnrutarCredito) => x.id === item.id)?.newPos
      );
      return item;
    });

    const result = recalculate(
      newData.sort((a, b) => a.orden - b.orden),
      true
    );

    setData({ cobrador: cobrador, cartera: result.cartera, data: result.data });
    toggleDrawer(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 120;
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex flex-row-reverse bg-[#E5E5E7] p-2">
        <Save
          size={20}
          onClick={handleSaveOrder}
          className="hover:text-sky-600 ml-2 rounded transition-all"
        />
      </div>
      <div
        style={{ height }}
        className="mt-0"
      >
        <div
          className="ag-theme-quartz mt-2"
          style={{ height: "100%" }}
        >
          <AgGridReact<IEnrutarCredito>
            rowHeight={25}
            ref={gridRef}
            defaultColDef={defaultColDef}
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            onRowDragEnd={onRowDragEnd}
            rowDragManaged={true}
            animateRows={true}
          />
        </div>
      </div>
    </>
  );
};
export default DnDRutas;
