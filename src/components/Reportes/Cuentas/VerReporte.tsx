import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IItemsCBox } from "../../../types/IRuta";
import { useState } from "react";
import { Eye } from "lucide-react";

interface IVerReporteProps {
  data: IItemsCBox[];
  action: (year: number) => void;
}

const VerReporte: React.FC<IVerReporteProps> = ({ data, action }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  return (
    <>
      <div className="flex flex-row-reverse bg-[#E5E5E7] p-2 border-b-2 border-sky-600 ">
        <Eye
          size={20}
          onClick={() => action(year)}
          className="hover:text-sky-600 ml-2 rounded transition-all"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4">
        <div className="col-span-12 sm:col-span-12">
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
      </div>
    </>
  );
};

export default VerReporte;
