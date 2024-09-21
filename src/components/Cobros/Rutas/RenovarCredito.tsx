import { useState } from "react";
import { Save } from "lucide-react";
import {
  IErrorsCrearCredito,
  IErrosRenovacion,
  IRenovacion,
} from "../../../types/ICredito";
import FloatingLabel from "../../Common/FloatingLabel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IItemsCBox } from "../../../types/IRuta";
import { useRutaStore } from "../../../store/RutaStore";
import { useDashboardStore } from "../../../store/DashboardStore";

interface IRenovarCreditoProps {
  row: IRenovacion;
  id: number;
  actionRenovacionEditable: (renovacion: IRenovacion, id: number) => void;
}

const RenovarCredito: React.FC<IRenovarCreditoProps> = ({
  row,
  id,
  actionRenovacionEditable,
}) => {
  const [formData, setFormData] = useState<IRenovacion>(row);
  const [errors, setErrors] = useState<Partial<IErrosRenovacion>>({});
  const { periodos } = useRutaStore();
  const { setOpenModal } = useDashboardStore();

  const handleInputChange = (property: string, newValue: string | number) => {
    if (property === "valor") {
      setFormData((prevData) => ({
        ...prevData,
        ["valor"]: Number(newValue),
        ["monto"]: Number(newValue) - formData.saldo,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [property]: newValue,
      }));
    }
  };

  const validate = () => {
    const errors: Partial<IErrorsCrearCredito> = {};

    if (formData.cuota === 0) errors.ClienteId = "La cuota es obligatoria";

    if (!formData?.dias)
      errors.InicioCredito = "La cantidad de días es obligatorio";

    if (!formData?.modalidad) errors.ModCuota = "La modalidad es obligatoria";

    if (!formData?.valor)
      errors.ValorPrestamo = "El valor a prestar es obligatorio";

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    actionRenovacionEditable(formData, id);
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex flex-row-reverse bg-[#E5E5E7] p-2 border-b-2 border-sky-600 ">
        <Save
          size={20}
          onClick={handleSubmit}
          className="hover:text-sky-600 ml-2 rounded transition-all"
        />
      </div>
      <div className="sm:px-4 md:px-4 pt-4">
        <form className="space-y-6">
          <div className="grid grid-cols-12 gap-4 mb-2">
            <div className="col-span-12">
              <div className="grid grid-cols-12 gap-4 mb-6">
                <div className="col-span-6">
                  <FloatingLabel
                    property={"valor"}
                    type="number"
                    label="Valor crédito"
                    value={formData.valor ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
                <div className="col-span-6">
                  <FloatingLabel
                    property={"cuota"}
                    type="number"
                    label="Cuota"
                    value={formData.cuota ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-6">
                <div className="col-span-6">
                  <FloatingLabel
                    property={"dias"}
                    type="number"
                    label="Días"
                    value={formData.dias ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
                <div className="col-span-6">
                  <FloatingLabel
                    property={"saldo"}
                    type="number"
                    label="Valor total"
                    value={(formData.cuota ?? 0) * (formData.dias ?? 0) * 1000}
                    action={() => {}}
                    errors={errors}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-6">
                <div className="col-span-6">
                  <FloatingLabel
                    property={"monto"}
                    type="number"
                    label="Monto dado"
                    value={formData.monto}
                    action={() => {}}
                    errors={errors}
                    disabled={true}
                  />
                </div>
                <div className="col-span-6">
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="small"
                    margin="normal"
                  >
                    <InputLabel htmlFor="modalidad">Modalidad</InputLabel>
                    <Select
                      label="Modalidad"
                      onChange={(e) =>
                        handleInputChange("modalidad", e.target.value)
                      }
                      defaultValue="1"
                      inputProps={{
                        name: "modalidad",
                        id: "modalidad",
                      }}
                    >
                      {periodos.map((periodo: IItemsCBox) => {
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

              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12">
                  <FloatingLabel
                    property={"observaciones"}
                    type="text"
                    label="Observaciones"
                    value={formData.observaciones ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default RenovarCredito;
