import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ICreditoDetalle } from "../../../types/ICreditoDetalle";

interface HistorialProps {
  detalle: ICreditoDetalle[];
}

const CardHistorialDetalle: React.FC<HistorialProps> = ({ detalle }) => {
  return (
    <div className="mt-4 border-t pt-2">
      <h3 className="text-sm font-semibold mb-2">Detalles del préstamo:</h3>
      <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
        <Table
          size="small"
          aria-label="detalles del préstamo"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell>Abono</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Renovación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detalle.map((detalle: ICreditoDetalle, idx) => (
              <TableRow key={idx}>
                <TableCell>${detalle.abono.toLocaleString()}</TableCell>
                <TableCell>
                  {new Date(detalle.fecha_abono).toLocaleDateString()}
                </TableCell>
                <TableCell>{detalle.renovacion_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default CardHistorialDetalle;
