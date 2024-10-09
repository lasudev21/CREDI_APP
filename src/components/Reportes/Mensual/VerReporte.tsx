import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IItemsCBox } from "../../../types/IRuta";
import { useState } from "react";
import { Eye } from "lucide-react";

interface IVerReporteProps {
  data: IItemsCBox[];
  action: (month: number, year: number) => void;
}

const VerReporte: React.FC<IVerReporteProps> = ({ data, action }) => {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [meses] = useState<IItemsCBox[]>([
    { label: "Enero", value: 0 },
    { label: "Febrero", value: 1 },
    { label: "Marzo", value: 2 },
    { label: "Abril", value: 3 },
    { label: "Mayo", value: 4 },
    { label: "Junio", value: 5 },
    { label: "Julio", value: 6 },
    { label: "Agosto", value: 7 },
    { label: "Septiembre", value: 8 },
    { label: "Octubre", value: 9 },
    { label: "Noviembre", value: 10 },
    { label: "Diciembre", value: 11 },
  ]);

  return (
    <>
      <div className="flex flex-row-reverse bg-[#E5E5E7] p-2 border-b-2 border-sky-600 ">
        <Eye
          size={20}
          onClick={() => action(month, year)}
          className="hover:text-sky-600 ml-2 rounded transition-all"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4">
        <div className="col-span-12 sm:col-span-6">
          <FormControl
            fullWidth
            variant="standard"
            size="small"
            margin="normal"
          >
            <InputLabel htmlFor="anio">Año</InputLabel>
            <Select
              label="Año"
              onChange={(e) => setYear(Number(e.target.value))}
              defaultValue={year}
              inputProps={{
                name: "anio",
                id: "anio",
              }}
            >
              {data.map((periodo: IItemsCBox) => {
                return (
                  <MenuItem
                    value={periodo.value}
                    key={periodo.label}
                  >
                    {periodo.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <FormControl
            fullWidth
            variant="standard"
            size="small"
            margin="normal"
          >
            <InputLabel htmlFor="mes">Mes</InputLabel>
            <Select
              label="Mes"
              onChange={(e) => setMonth(Number(e.target.value))}
              defaultValue={month}
              inputProps={{
                name: "mes",
                id: "mes",
              }}
            >
              {meses.map((periodo: IItemsCBox) => {
                return (
                  <MenuItem
                    value={periodo.value}
                    key={periodo.label}
                  >
                    {periodo.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default VerReporte;
