import { Save } from "lucide-react";
import FloatingLabel from "../../Common/FloatingLabel";
import { IErrorsVale, IVale, ValeVacio } from "../../../types/INomina";
import { useState } from "react";
import { useNominaStore } from "../../../store/NominaStore";
import { useDashboardStore } from "../../../store/DashboardStore";

interface IAgregarValesProps {
  // data: ICredito;
  index: number;
}
const AgregarVales: React.FC<IAgregarValesProps> = ({ index }) => {
  const [formData, setFormData] = useState<IVale>(ValeVacio);
  const [errors, setErrors] = useState<Partial<IErrorsVale>>({});
  const { addValeToNominaCobrador } = useNominaStore();
  const { setOpenModal } = useDashboardStore();

  const handleInputChange = (property: string, newValue: string | number) => {
    if (property === "valor") {
      newValue = Number(newValue) * 1000;
    }

    setFormData((prevData) => ({
      ...prevData,
      [property]: newValue,
    }));
  };

  const validate = () => {
    const errors: Partial<IErrorsVale> = {};

    if (!formData?.fecha) errors.fecha = "La fecha es obligatoria";
    if (!formData?.valor) errors.valor = "El valor es obligatorio";

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
    addValeToNominaCobrador(index, formData);
    setOpenModal(false);
  };

  return (
    <>
      <div className="p-2 border-t">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 p-4">
          <div className="col-span-12 sm:col-span-6">
            <FloatingLabel
              property={"fecha"}
              type="date"
              label="Fecha del vale"
              value={formData?.fecha.toLocaleString() ?? ""}
              action={handleInputChange}
              errors={errors}
              disabled={false}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <FloatingLabel
              property={"valor"}
              type="number"
              label="Valor"
              value={formData.valor ? formData.valor / 1000 : ""}
              action={handleInputChange}
              errors={errors}
              disabled={false}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <FloatingLabel
              property={"descripcion"}
              type="text"
              label="Descripción"
              value={formData.descripcion}
              action={handleInputChange}
              errors={errors}
              disabled={false}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="text-sky-600 w-full bg-gray-100 hover:bg-sky-700 hover:text-white border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
            >
              <Save className="mr-2" />
              Guardar vale
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AgregarVales;
