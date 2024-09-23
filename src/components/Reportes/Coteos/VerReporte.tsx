import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IItemsCBox } from "../../../types/IRuta";
import { useState } from "react";
import { Eye } from "lucide-react";
import moment from "moment";

interface IVerReporteProps {
  data: IItemsCBox[];
  action: (dates: string[]) => void;
  month: number;
  setMonth: (month: number) => void;
}

const VerReporte: React.FC<IVerReporteProps> = ({
  data,
  action,
  month,
  setMonth,
}) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const getDates = (startDate: Date, endDate: Date): string[] => {
    const _dates: string[] = [];
    let currentDate = startDate;

    const addDays = (date: Date, days: number): Date => {
      const newDate = new Date(date.valueOf());
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    };

    while (currentDate <= endDate) {
      _dates.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = addDays(currentDate, 1);
    }
    return _dates;
  };

  const [dates, setDates] = useState<string[]>(
    getDates(
      new Date(year, Number(month), 1),
      new Date(year, Number(month) + 1, 0)
    )
  );
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

  const handleGetDate = (_month: string) => {
    setMonth(Number(_month));
    const firstDay = new Date(year, Number(_month), 1);
    const lastDay = new Date(year, Number(_month) + 1, 0);
    setDates(getDates(firstDay, lastDay));
  };

  return (
    <>
      <div className="flex flex-row-reverse bg-[#E5E5E7] p-2 border-b-2 border-sky-600 ">
        <Eye
          size={20}
          onClick={() => action(dates)}
          className="hover:text-sky-600 ml-2 rounded transition-all"
        />
      </div>
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-6">
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
                    value={periodo.label}
                    key={periodo.label}
                  >
                    {periodo.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-6">
          <FormControl
            fullWidth
            variant="standard"
            size="small"
            margin="normal"
          >
            <InputLabel htmlFor="mes">Mes</InputLabel>
            <Select
              label="Mes"
              onChange={(e) => handleGetDate(String(e.target.value))}
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
