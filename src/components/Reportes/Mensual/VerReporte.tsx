import { FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { IItemsCBox } from "../../../types/IRuta";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface IVerReporteProps {
  data: IItemsCBox[];
  action: (month: string, year: number) => void;
}

const getCurrentWeek = (): string => {
  const now = new Date();
  const year = now.getFullYear();

  // Obtener el primer día del año y calcular el número de la semana
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = ((now.getTime() - startOfYear.getTime()) / 86400000) + 1;
  const week = Math.ceil(dayOfYear / 7);

  // Formatear la semana para que siempre tenga dos dígitos (e.g., 01, 02, ..., 52)
  return `${year}-W${week.toString().padStart(2, '0')}`;
};

const VerReporte: React.FC<IVerReporteProps> = ({ data, action }) => {
  const [selectedWeek, setSelectedWeek] = useState<string>('');
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    // Asigna la semana actual al cargar el componente
    setSelectedWeek(getCurrentWeek());
  }, []);

  return (
    <>
      <div className="flex flex-row-reverse bg-[#E5E5E7] p-2 border-b-2 border-sky-600 ">
        <Eye
          size={20}
          onClick={() => action(selectedWeek, year)}
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
            <InputLabel htmlFor="semana">Semana</InputLabel>
            <Input type="week" id="semana" name="semana" value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)} />
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default VerReporte;
