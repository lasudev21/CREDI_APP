/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  getFlujoUtilidades,
  postFlujoUtilidades,
} from "../../../services/flujoUtilidadesService";
import {
  FUVacio,
  IDataFU,
  IErrorsFU,
  IFlujoUtilidades,
} from "../../../types/IFlujoUtilidades";
import { DateFormat, NumberFormat } from "../../../utils/helper";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { PlusCircleIcon, Save } from "lucide-react";
import TableAGReact from "../../../components/Common/TableAGReact";
import { useDashboardStore } from "../../../store/DashboardStore";
import FloatingLabel from "../../../components/Common/FloatingLabel";
import { FlujoUtilidadesStore } from "../../../store/FlujoUtilidadesStore";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IResponse } from "../../../types/IResponse";
import { TypeToastEnum } from "../../../types/IToast";
import TypeAction from "../../../components/Common/TypeAction";
import { useNavigate } from "react-router-dom";

const FlujoUtilidades = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<IDataFU>(FUVacio);
  const { setData, page, totalRecord, data, sum } = FlujoUtilidadesStore();
  const { setLoader, setErrorsToast, validarPermiso } = useDashboardStore();

  const [colDefs] = useState<ColDef[]>([
    {
      field: "descripcion",
      headerName: "Descripción",
      width: 250,
      sortable: false,
      filter: "agTextColumnFilter",
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 100,
      cellRenderer: TypeAction,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 150,
      valueFormatter: DateFormat,
    },
    {
      field: "valor",
      headerName: "Valor",
      width: 100,
      cellRenderer: (props: ValueFormatterParams) => {
        return NumberFormat(props.data.valor);
      },
    },
  ]);

  const [errors, setErrors] = useState<Partial<IErrorsFU>>({});

  const handleInputChange = (property: string, newValue: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [property]: newValue,
    }));
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFormData((prevData) => ({
      ...prevData,
      ["tipo"]: Number(event.target.value),
    }));
  };

  const validate = () => {
    const errors: Partial<IErrorsFU> = {};

    if (!formData?.fecha) errors.fecha = "La fecha obligatoria";

    if (!formData?.descripcion)
      errors.descripcion = "La descripción es obligatoria";

    if (!formData?.tipo) errors.tipo = "El tipo es obligatorio";

    if (!formData?.valor) errors.valor = "El valor es obligatorio";

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoader(true);
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoader(false);
      return;
    }

    setErrors({});

    setLoader(true);

    const data: IResponse | null = await postFlujoUtilidades({
      Descripcion: formData.descripcion,
      Fecha: formData.fecha,
      Tipo: formData.tipo,
      Valor: formData.valor,
    });

    if (data) {
      if (data.status === 200) {
        setErrorsToast([
          {
            message: "Registro agregado con éxito",
            type: TypeToastEnum.Susccess,
          },
        ]);
        setFormData(FUVacio);
        await FlujoUtilidades(page);
      }
    }
    setLoader(false);
  };

  const FlujoUtilidades = async (_page: number) => {
    setLoader(true);
    const response = await getFlujoUtilidades(_page);
    const data: IFlujoUtilidades = response;
    setData(data);
    setLoader(false);
  };

  useEffect(() => {
    if (!validarPermiso("Flujo de utilidades")) {
      navigate("/permisos");
    }
    FlujoUtilidades(page);

    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 210;
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-full w-full grid mt-4 border-l-4 rounded-l border-sky-600">
      <div className="flex justify-between items-center p-2 bg-white border-b-2 border-sky-600 rounded-br">
        <div className="flex w-3/4 pr-2">
          <div className="text-pretty font-bold">Flujo de utilidades</div>
        </div>

        <div className="w-1/4 pl-2 flex justify-end">
          <div className="flex space-x-2">
            <PlusCircleIcon
              size={20}
              onClick={() => setDisabled(!disabled)}
              className="hover:text-sky-600 ml-2 rounded transition-all"
            />
            <Save
              size={20}
              onClick={handleSubmit}
              className="hover:text-sky-600 ml-2 rounded transition-all"
            />
          </div>
        </div>
      </div>
      <div className="flex bg-white">
        <div className="w-2/5">
          <form
            className="space-y-6 p-2"
            // onSubmit={handleSubmit}
          >
            <p className="text-xl font-extralight  dark:text-white">
              Utilidad neta:
              <span className="text-sky-500 italic ml-2">
                {NumberFormat(sum)}
              </span>
            </p>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <FloatingLabel
                  type="date"
                  label="Fecha"
                  disabled={disabled}
                  action={handleInputChange}
                  errors={errors}
                  value={formData.fecha.toLocaleString() ?? ""}
                  property={"fecha"}
                />
              </div>
              <div className="col-span-12">
                <FloatingLabel
                  type="text"
                  label="Descripción"
                  disabled={disabled}
                  action={handleInputChange}
                  errors={errors}
                  value={formData.descripcion ?? ""}
                  property={"descripcion"}
                />
              </div>
              <div className="col-span-12">
                <FormControl
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="normal"
                  disabled={disabled}
                >
                  <InputLabel htmlFor="tipo">Tipo</InputLabel>
                  <Select
                    value={formData.tipo.toString() ?? ""}
                    label="Tipo"
                    onChange={handleChangeSelect}
                    defaultValue="1"
                    inputProps={{
                      name: "Tipo",
                      id: "tipo",
                    }}
                  >
                    <MenuItem value="1">Entrada</MenuItem>
                    <MenuItem value="2">Salida</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12">
                <FloatingLabel
                  type="number"
                  label="Valor"
                  action={handleInputChange}
                  disabled={disabled}
                  errors={errors}
                  value={formData.valor ?? ""}
                  property={"valor"}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="w-3/5">
          <TableAGReact
            colDefs={colDefs}
            data={data}
            key={"TAGR[0][2]"}
            pagination={true}
            height={height}
            totalRecords={totalRecord}
            actionPagining={FlujoUtilidades}
            autoSize={true}
          />
        </div>
      </div>
    </div>
  );
};
export default FlujoUtilidades;
