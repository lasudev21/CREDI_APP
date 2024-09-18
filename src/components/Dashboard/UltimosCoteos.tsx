import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ICoteosUsuario } from "../../types/IDashboard";
import { useEffect, useState } from "react";

interface LineChartProps {
  coteosUsuarios: ICoteosUsuario[];
}

const UltimosCoteos: React.FC<LineChartProps> = ({ coteosUsuarios }) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 330;
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: height,
      }}
    >
      <Table
        style={{ height: "100%" }}
        size="small"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell>Cobrador</TableCell>
            <TableCell align="right">Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coteosUsuarios.map((item: ICoteosUsuario) => {
            return (
              <TableRow key={`TR[${item.id_usuario}]`}>
                <TableCell>
                  {item.user.nombres} {item.user.apellidos}
                </TableCell>
                <TableCell align="right">{item.total_coteos}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UltimosCoteos;
