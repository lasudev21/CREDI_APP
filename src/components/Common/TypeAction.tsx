import { CustomCellRendererProps } from "ag-grid-react";

const TypeAction = (params: CustomCellRendererProps) => {
  const tipo = params.data.tipo;
  return (
    <span
      className={`${
        tipo === 1
          ? "h-4 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
          : "h-4 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
      }`}
    >
      {tipo && tipo === 1 ? "Entrada" : "Salida"}
    </span>
  );
};
export default TypeAction;
