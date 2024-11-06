import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CellKeyDownEvent, ColDef } from 'ag-grid-community';
import { ICredito, IEnrutarCredito } from '../../../types/ICredito';
import { useRutaStore } from '../../../store/RutaStore';
import { Save } from 'lucide-react';
import { useDashboardStore } from '../../../store/DashboardStore';
import { TypeToastEnum } from '../../../types/IToast';
import Swal from 'sweetalert2';

const Enrutar: React.FC = () => {
    // const gridApi = React.useRef<GridApi | null>(null);
    const gridRef = useRef<AgGridReact>(null);
    const { data, updateOrdenById } = useRutaStore();
    const [rowData, setRowData] = useState<IEnrutarCredito[]>([]);
    const [height, setHeight] = useState<number>(0);
    const { toggleDrawer, setErrorsToast } = useDashboardStore();

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

    const changeNewPos = (event: any) => {
        if (typeof event.newValue === "number") {
            const maxPos: number = Number(gridRef.current?.props.rowData?.length);
            if (event.newValue > maxPos) {
                setErrorsToast([{ message: "No puede digitar un valor mayor a la cantidad de clientes en la planilla", type: TypeToastEnum.Warning }])
                event.node.setDataValue("newPos", null)
            }

            const lista = gridRef.current?.props.rowData?.filter(x => x.newPos === event.newValue) || [];
            if (lista?.length > 1) {
                setErrorsToast([{ message: "Ya existe una posición asignada con el valor ingresado", type: TypeToastEnum.Warning }])
                event.node.setDataValue("newPos", null)
            }
        } else {
            event.node.setDataValue("newPos", null)
        }
    };

    const [columnDefs] = useState<ColDef[]>([
        { field: 'id', headerName: 'ID', hide: true },
        {
            field: 'newPos',
            headerName: 'Nueva Pos',
            editable: true,
            width: 120,
            valueParser: (params) => {
                const value = parseInt(params.newValue, 10);
                return isNaN(value) ? null : value;
            },
            // cellEditor: 'agNumberCellEditor',
            cellEditorParams: {
                min: 1,
                max: data.length,
            },
            onCellValueChanged: changeNewPos,
        },
        { field: 'orden', headerName: 'Orden', width: 100 },
        { field: 'cliente.titular', headerName: 'Cliente', width: 250 },

    ]);

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
        // params.api.sizeColumnsToFit();
        // params.api.setGridOption("rowData", data);
    }, []);

    const onCellKeyDown = useCallback((event: CellKeyDownEvent) => {
        const eventKey = event.event?.key;
        if (
            (eventKey === "ArrowDown" || eventKey === "ArrowUp") &&
            event.column.getColId() === "newPos"
        ) {
            event.event?.preventDefault();
            const currentRowIndex = event.rowIndex;
            const totalRows = event.api.getDisplayedRowCount();
            let nextRowIndex;

            if (eventKey === "ArrowDown") {
                nextRowIndex = (Number(currentRowIndex) + 1) % totalRows;
            } else {
                nextRowIndex = (Number(currentRowIndex) - 1 + totalRows) % totalRows;
            }

            event.api.setFocusedCell(nextRowIndex, "newPos");
            event.api.startEditingCell({
                rowIndex: nextRowIndex,
                colKey: "newPos",
            });
        }
    }, []);

    const handleSave = () => {
        // Ordenamos la lista por la columna "orden"
        const sortedRows = [...rowData].sort((a, b) => Number(a.newPos) - Number(b.newPos));

        // Creamos una copia de `sortedRows` para ir actualizándola
        const updatedRows = [...sortedRows];

        sortedRows.forEach((row) => {
            if (row.newPos !== null) {
                const newPos = row.newPos - 1; // Convertimos a índice basado en 0
                const [movedItem] = updatedRows.splice(updatedRows.indexOf(row), 1);
                updatedRows.splice(newPos, 0, movedItem); // Insertamos el elemento en la nueva posición
            }
        });

        //Ordenamos la columna posición
        var orden: number = 1;
        updatedRows.map((row) => {
            row.orden = orden;
            orden++;
            return row
        })

        const newData = data.map((x) => {
            const item = updatedRows.find(z => z.id == x.id);
            x.orden = Number(item?.orden);
            return x;
        });

        Swal.fire({
            title: "¿Guardar cambios?",
            html: `<div> 
                  <p> ¿Realmente desea reordenar los clientes? Asegurese de que el orden sea correcto... </p>
                 </div>`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
        }).then(async (result) => {
            if (result.value) {
                updateOrdenById(newData);
                toggleDrawer(false);
            }
        });
    };

    return (
        <>
            <div className="flex flex-row-reverse bg-[#E5E5E7] p-2">
                <Save
                    size={20}
                    onClick={handleSave}
                    className="hover:text-sky-600 ml-2 rounded transition-all"
                />
            </div>
            <div
                style={{ height }}
                className="mt-0"
            >
                <div
                    className="ag-theme-material mt-2"
                    style={{ height: "100%" }}
                >
                    <AgGridReact<IEnrutarCredito>
                        rowData={rowData}
                        columnDefs={columnDefs}
                        domLayout="autoHeight"
                        rowHeight={25}
                        ref={gridRef}
                        onCellKeyDown={onCellKeyDown}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
        </>
    );
};

export default Enrutar;