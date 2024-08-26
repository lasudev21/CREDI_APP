import { useEffect, useMemo, useState } from "react";
// import { getClientes } from "../../services/clienteService";
// import { ICliente, IClientes } from "../../types/ICliente";
import CustomerDetails from "../../../components/Common/TableMaterialR";
import { MRT_ColumnDef } from "material-react-table";
import { IUsuario, IUsuarios } from "../../../types/IUsuario";
import { getUsuarios } from "../../../services/usuarioService";
import Tabs from "../../../components/Common/Tab";
import { Switch } from "@mui/material";

export default function Usuarios() {
  const [clientes, setClientes] = useState<IUsuarios>();
  const [isLoading, setIsloading] = useState<boolean>(true);

  const columns = useMemo<MRT_ColumnDef<IUsuario>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "nombres",
        header: "Nombres",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "apellidos",
        header: "Apellidos",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "telefono1",
        header: "Telefono",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "login",
        header: "Login?",
        enableHiding: false,
        enableColumnActions: false,
        Cell: ({ renderedCellValue }) => (
          <Switch checked={renderedCellValue && renderedCellValue} />
        )
      },
      {
        accessorKey: "created_at",
        header: "Creado",
        enableHiding: false,
      },
    ],
    []
  );

  useEffect(() => {
    const Clientes = async () => {
      // const response = await getClientes();
      const response = await getUsuarios();
      const data: IUsuarios = response;
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
          blockLeft={["mrt-row-expand", "mrt-row-select", "mrt-row-actions"]}
        ></CustomerDetails>
      ),
    },
    { label: "Tab 2", content: <div>Content of Tab 2</div> },
    { label: "Tab 3", content: <div>Content of Tab 3</div> },
  ];

  return <Tabs tabs={tabs} />;
}
