/* eslint-disable no-constant-binary-expression */
import { Save } from "lucide-react";
import { ICredito, IErrorsCredito } from "../../../types/ICredito";
import FloatingLabel from "../../Common/FloatingLabel";
import { useState } from "react";

interface IEditarCreditoProps {
  data: ICredito;
  action: (credito: ICredito) => void;
}

const EditarCredito: React.FC<IEditarCreditoProps> = ({ data, action }) => {
  const [formData, setFormData] = useState<ICredito>(data);
  const [errors, setErrors] = useState<Partial<IErrorsCredito>>({});

  const handleInputChange = (property: string, newValue: string | number) => {
    if (property === "valor_prestamo" || property === "mod_cuota") {
      newValue = Number(newValue) * 1000;
    }
    setFormData((prevData) => ({
      ...prevData,
      [property]: newValue,
    }));
  };

  const validate = () => {
    const errors: Partial<IErrorsCredito> = {};

    if (!formData?.mod_cuota)
      errors.mod_cuota = "El valor de la cuota es obligatorio";

    if (!formData?.valor_prestamo)
      errors.valor_prestamo = "El valor a prestar es obligatorio";

    if (!formData?.mod_dias)
      errors.mod_dias = "La cantidad de dias es obligatorio";

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
    action(formData);
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
      <div className="sm:px-4 md:px-4 p-4">
        <form className="space-y-6">
          <div className="grid grid-cols-12 gap-4 mb-6">
            <div className="col-span-12">
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-6">
                  <FloatingLabel
                    property={"inicio_credito"}
                    type="date"
                    label="Fecha del crédito"
                    value={formData.inicio_credito.toLocaleString() ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={true}
                  />
                </div>
                <div className="col-span-6">
                  <FloatingLabel
                    property={"valor_prestamo"}
                    type="number"
                    label="Valor a prestar"
                    value={formData.valor_prestamo / 1000 ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-6">
                <div className="col-span-4">
                  <FloatingLabel
                    property={"mod_cuota"}
                    type="number"
                    label="Cuota"
                    value={formData.mod_cuota / 1000 ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
                <div className="col-span-4">
                  <FloatingLabel
                    property={"mod_dias"}
                    type="number"
                    label="Días"
                    value={formData.mod_dias ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
                <div className="col-span-4">
                  <FloatingLabel
                    property={"ruta_id"}
                    type="number"
                    label="Valor total"
                    value={(formData.mod_cuota ?? 0) * (formData.mod_dias ?? 0)}
                    action={() => {}}
                    errors={errors}
                    disabled={true}
                  />
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
export default EditarCredito;
