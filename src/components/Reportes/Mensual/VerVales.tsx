import { useEffect, useState } from "react";
import { IVale } from "../../../types/INomina";
import { useNominaStore } from "../../../store/NominaStore";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { Pencil, Trash } from "lucide-react";
import { deleteVale } from "../../../services/nominaService";
import { useDashboardStore } from "../../../store/DashboardStore";
import { TypeToastEnum } from "../../../types/IToast";
import Swal from "sweetalert2";

interface IVerValesProps {
  index: number;
  AbrirModal: (
    tipo: string,
    index: number,
    vale: IVale,
    indexVale: number | null
  ) => void;
}

const VerVales: React.FC<IVerValesProps> = ({ index, AbrirModal }) => {
  const { list, nomina_id, deleteValeToNominaCobrador } = useNominaStore();
  const { setLoader, setErrorsToast } = useDashboardStore();
  const [data, setData] = useState<IVale[]>(list[index].vales);

  useEffect(() => {
    setData(list[index].vales);
  }, [index, list]);

  const handeleEliminarVale = async (vale: IVale, indexVale: number) => {
    Swal.fire({
      title: "¿Eliminar vale?",
      html: `<div> 
            <p> ¿Realmente desea eliminar este vale?, recuerde que esta acción no se puede reversar... </p>
           </div>`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.value) {
        setLoader(true);
        if (vale.id != 0) {
          await deleteVale(vale.id, nomina_id);
        }
        deleteValeToNominaCobrador(index, indexVale);
        setErrorsToast([
          { message: "Vale eliminado", type: TypeToastEnum.Susccess },
        ]);
        setLoader(false);
      }
    });
  };

  const handleEditarVale = (vale: IVale, indexVale: number) => {
    AbrirModal("editarVale", index, vale, indexVale);
  };

  return (
    <div className="border-t-2 border-sky-700">
      <Table
        aria-label="collapsible table"
        size="small"
        className="p-4"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((vale: IVale, indexVale: number) => (
            <TableRow key={indexVale}>
              <TableCell>{moment(vale.fecha).format("YYYY-MM-DD")}</TableCell>
              <TableCell>{vale.valor}</TableCell>
              <TableCell>{vale.descripcion}</TableCell>
              <TableCell>
                <IconButton
                  //   disabled={disabled}
                  // size="small"
                  color="primary"
                  onClick={() => handleEditarVale(vale, indexVale)}
                >
                  <Pencil size={20} />
                </IconButton>
                <IconButton
                  //   disabled={disabled}
                  // size="small"
                  color="primary"
                  onClick={() => handeleEliminarVale(vale, indexVale)}
                >
                  <Trash size={20} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default VerVales;
