import { useEffect, useMemo, useState } from "react";
import CustomerDetails from "../../../components/Common/TableMaterialR";
import { MRT_ColumnDef } from "material-react-table";
import { IClientes, ICliente } from "../../../types/ICliente";
import Tabs from "../../../components/Common/Tab";
import { getClientes } from "../../../services/clienteService";
import { Switch } from "@mui/material";

interface Status {
  status: boolean
}


export default function Clientes() {
  const [clientes, setClientes] = useState<IClientes>();
  const [isLoading, setIsloading] = useState<boolean>(true);

  const columns = useMemo<MRT_ColumnDef<ICliente>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "titular",
        header: "Titular",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "estado",
        header: "Estado",
        enableHiding: false,
        enableColumnActions: false,
        Cell: ({ renderedCellValue }) => (
          <Switch checked={renderedCellValue && renderedCellValue} />
        )
      },
      {
        accessorKey: "fiador",
        header: "Fiador",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "cc_fiador",
        header: "Identificación Fiador",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "neg_titular",
        header: "Negocio titular",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "neg_fiador",
        header: "Negocio fiador",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "dir_cobro",
        header: "Dirección Cobro",
        enableHiding: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
      },
      // {
      //   accessorKey: "neg_titular",
      //   header: "Negocio",
      //   enableHiding: false,
      // },
    ],
    []
  );

  useEffect(() => {
    const Clientes = async () => {
      const response = await getClientes();
      const data: IClientes = response;
      setClientes(data);
      setIsloading(false);
    };

    Clientes();
  }, []);

  const tabs = [
    {
      label: "Listado clientes",
      content: (
        <CustomerDetails
          columns={columns}
          data={clientes ? clientes.data : []}
          isLoading={isLoading}
          blockLeft={["mrt-row-expand", "mrt-row-select", "mrt-row-actions", "titular"]}
        ></CustomerDetails>
      ),
    },
    { label: "Crear cliente", content: <div>Content of Tab 2</div> },
  ];

  return <Tabs tabs={tabs} />;
}
