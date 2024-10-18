import { Fragment, useState } from "react";
import { ICreditoHistorialCliente } from "../../../types/ICredito";
import {
  Checkbox,
  Collapse,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ICreditoDetalle } from "../../../types/ICreditoDetalle";
import moment from "moment";
import { NumberFormat } from "../../../utils/helper";

interface HistorialProps {
  data: ICreditoHistorialCliente[];
}

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#ecfeff",
  },
}));

function Row(props: { row: ICreditoHistorialCliente }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
        >
          {NumberFormat(row.ValorPrestamo)}
        </TableCell>
        <TableCell>{NumberFormat(row.ModCuota)}</TableCell>
        <TableCell>{row.ModDias}</TableCell>
        <TableCell>
          {NumberFormat(Number(row.ModCuota) * Number(row.ModDias))}
        </TableCell>
        <TableCell>{row.RutaId}</TableCell>
        <TableCell>
          <Checkbox
            inputProps={{ "aria-label": "Estado" }}
            checked={row.Activo}
          />
        </TableCell>
        <TableCell>
          {row.Finalizacion
            ? moment(row.Finalizacion).format("YYYY-MM-DD")
            : ""}
        </TableCell>
        <TableCell>
          {row.Observaciones}
        </TableCell>
      </TableRow>
      {open ? (
        <TableRow>
          <TableCell
            style={{ padding: 10 }}
            colSpan={9}
          >
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
            >
              <TableContainer sx={{ maxHeight: 300 }}>
                <Table
                  size="small"
                  aria-label="Detalles abonos"
                  style={{}}
                  stickyHeader
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Abono</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Usuario</TableCell>
                      <TableCell>Renovación</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.DetallesCredito.map((historyRow: ICreditoDetalle) => (
                      <StyledTableRow key={historyRow.id}>
                        <TableCell
                          component="th"
                          scope="row"
                        >
                          {NumberFormat(historyRow.abono)}
                        </TableCell>
                        <TableCell>
                          {moment(historyRow.fecha_abono).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell>{historyRow.user.nombres}</TableCell>
                        <TableCell>{historyRow.renovacion_id}</TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </Fragment>
  );
}

const Historial: React.FC<HistorialProps> = ({ data }) => {

  return (
    <div className="p-4">
      <TableContainer component={Paper}>
        <Table
          aria-label="collapsible table"
          size="small"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Valor prestamo</TableCell>
              <TableCell>Cuota</TableCell>
              <TableCell>Días</TableCell>
              <TableCell>Total a pagar</TableCell>
              <TableCell>Ruta</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Finalización</TableCell>
              <TableCell>Observaciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row
                key={`row[0][${row.Id}]`}
                row={row}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Historial;
