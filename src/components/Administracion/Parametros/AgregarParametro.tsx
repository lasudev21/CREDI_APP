import { useEffect, useState } from "react";
import FloatingLabel from "../../Common/FloatingLabel";
import {
  IErrorsParametro,
  IParametroDetalle,
  ParametroDetalleVacio,
} from "../../../types/IParametro";
import { useDashboardStore } from "../../../store/DashboardStore";
import { postParametro } from "../../../services/parametroService";
import { IResponse } from "../../../types/IResponse";
import { TypeToastEnum } from "../../../types/IToast";
import { useParametroStore } from "../../../store/ParametroStore";

interface AgregarParametroProps {
  data: IParametroDetalle[];
  parametroId: number;
  Parametros: () => void;
}

const AgregarParametro: React.FC<AgregarParametroProps> = ({
  data,
  parametroId,
  Parametros,
}) => {
  const [errors, setErrors] = useState<Partial<IErrorsParametro>>({});
  const [id, setId] = useState(0);
  const [formData, setFormData] = useState<IParametroDetalle>(
    ParametroDetalleVacio
  );
  const { setLoader, setErrorsToast, setOpenModal } = useDashboardStore();

  const { setSelectedIndex } = useParametroStore();

  useEffect(() => {
    setId(data.length + 1);
  }, [data]);

  const validate = () => {
    const errors: Partial<IErrorsParametro> = {};

    if (!formData?.valor) errors.valor = "El valor es obligatorio";

    return errors;
  };

  const handleInputChange = (property: string, newValue: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [property]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoader(true);
    const response: IResponse | null = await postParametro({
      id_interno: id,
      parametro_id: parametroId,
      valor: formData.valor,
    });

    if (response) {
      if (response.status === 200) {
        setErrorsToast([
          {
            message: "Registro agregado con éxito",
            type: TypeToastEnum.Susccess,
          },
        ]);
        setFormData(ParametroDetalleVacio);
        setOpenModal(false);
        setSelectedIndex(0);
        await Parametros();
      }
    }
    setLoader(false);
    setErrors({});
  };

  return (
    <form
      className="flex gap-4 w-full"
      onSubmit={handleSubmit}
    >
      <FloatingLabel
        property={"id_interno"}
        type="text"
        label="Identificador interno"
        value={id}
        action={handleInputChange}
        errors={errors}
        disabled={true}
      />
      <FloatingLabel
        property={"valor"}
        type="text"
        label="Valor"
        value={formData.valor}
        action={handleInputChange}
        errors={errors}
        disabled={false}
      />
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
export default AgregarParametro;
