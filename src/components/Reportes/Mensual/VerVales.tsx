import { useState } from "react";
import { IVale } from "../../../types/INomina";
import { useNominaStore } from "../../../store/NominaStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";

interface IVerValesProps {
  index: number;
}

const VerVales: React.FC<IVerValesProps> = ({ index }) => {
  const { list } = useNominaStore();
  const [data] = useState<IVale[]>(list[index].vales);
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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((vale: IVale) => (
            <TableRow>
              <TableCell>{moment(vale.fecha).format("YYYY-MM-DD")}</TableCell>
              <TableCell>{vale.valor}</TableCell>
              <TableCell>{vale.descripcion}</TableCell>
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default VerVales;
