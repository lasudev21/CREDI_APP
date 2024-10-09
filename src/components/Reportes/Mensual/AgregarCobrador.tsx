import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNominaStore } from "../../../store/NominaStore";
import { IItemsCBox } from "../../../types/IRuta";
import { UserPlus2 } from "lucide-react";
import { useState } from "react";
import { postCobrador } from "../../../services/nominaService";
import { INominaCobrador, IPostCobrador } from "../../../types/INomina";
import { useDashboardStore } from "../../../store/DashboardStore";
import { TypeToastEnum } from "../../../types/IToast";

const AgregarCobrador = () => {
  const { cobradores, nomina_id, setNuevosData, list } = useNominaStore();
  const { setErrorsToast } = useDashboardStore();
  const [cobrador_id, setCobradorId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const existe = list.filter(
      (x: INominaCobrador) => x.cobrador_id === cobrador_id
    );
    
    if (existe.length === 0) {
      const response = await postCobrador(Number(cobrador_id), nomina_id);
      const data: IPostCobrador = response;
      setNuevosData(data.data);
    } else {
      setErrorsToast([
        {
          message: "El cobrador ya está asignado a la nomina",
          type: TypeToastEnum.Warning,
        },
      ]);
    }
  };

  return (
    <div className="p-2 border-t">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4">
        <div className="col-span-12 sm:col-span-8">
          <FormControl
            fullWidth
            variant="standard"
            size="small"
            margin="normal"
          >
            <InputLabel htmlFor="cobrador">Cobrador</InputLabel>
            <Select
              label="Cobrador"
              onChange={(e) => setCobradorId(Number(e.target.value))}
              // defaultValue={year}
              inputProps={{
                name: "cobrador",
                id: "cobrador",
              }}
            >
              {cobradores.map((cobrador: IItemsCBox) => {
                return (
                  <MenuItem
                    value={cobrador.value}
                    key={cobrador.label}
                  >
                    {cobrador.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-12 sm:col-span-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="text-sky-600 w-full bg-gray-100 hover:bg-sky-700 hover:text-white border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            <UserPlus2 className="mr-2" />
            Agregar Cobrador
          </button>
        </div>
      </div>
    </div>
  );
};
export default AgregarCobrador;
