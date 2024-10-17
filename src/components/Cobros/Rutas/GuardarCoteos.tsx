import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NumberFormat, recalculate } from "../../../utils/helper";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Fragment, useState } from "react";
import { useDashboardStore } from "../../../store/DashboardStore";
import {
  ICredito,
  ICreditoData,
  IFlujoCajaRuta,
} from "../../../types/ICredito";
import { saveAbonos } from "../../../services/creditoService";
import { useRutaStore } from "../../../store/RutaStore";
import { TypeToastEnum } from "../../../types/IToast";

const steps = ["Flujo de caja", "Calculo de moras", "Agregar Vales"];

interface IGuardarCoteoProps {
  flujoCaja: IFlujoCajaRuta;
  dataCoteos: ICredito[];
}

const GuardarCoteos: React.FC<IGuardarCoteoProps> = ({
  flujoCaja,
  dataCoteos,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [calculoMoras, setCalculoMorasp] = useState(true);
  const [agregarVales, setAgregarVales] = useState(false);
  const [vale, SetVale] = useState<number | undefined>(undefined);
  const { setOpenModal, setLoader, setErrorsToast } = useDashboardStore();
  const { rutaId, setData, clearNuevos, cobrador } = useRutaStore();

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep + 1 === steps.length) {
      setOpenModal(false);
      setLoader(true);
      const valeValue = typeof vale === "undefined" ? 0 : Number(vale);
      const response = await saveAbonos(
        rutaId,
        dataCoteos,
        flujoCaja,
        calculoMoras,
        valeValue,
        cobrador
      );
      const data: ICreditoData = response;
      if (data) {
        const recalculo = recalculate(data.data, true);
        setData({
          cartera: recalculo.cartera,
          data: recalculo.data,
          cobrador: data.cobrador,
        });
        setErrorsToast([
          {
            message: "Se han guardado los abonos de la ruta",
            type: TypeToastEnum.Susccess,
          },
        ]);
        clearNuevos();
      }
      setLoader(false);
    }
  };

  const handleActiveStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="w-full text-center">
            <p className="text-xl text-gray-900 ">
              Entran:{" "}
              <span className="text-sky-500 italic">
                {NumberFormat(flujoCaja.entrada)}
              </span>
            </p>
            <p className="text-xl text-gray-900 ">
              Salen:{" "}
              <span className="text-sky-500 italic">
                {NumberFormat(flujoCaja.salida)}
              </span>
            </p>
            <p className="text-xl text-gray-900 ">
              Utilidad:{" "}
              <span className="text-sky-500 italic">
                {NumberFormat(flujoCaja.utilidad)}
              </span>
            </p>
            <p className="text-xl text-gray-900 ">
              Reversiones:{" "}
              <span className="text-sky-500 italic">
                {NumberFormat(flujoCaja.reversion)}
              </span>
            </p>
            <p className="text-xl text-gray-900 ">
              Coteos:{" "}
              <span className="text-sky-500">
                {NumberFormat(flujoCaja.coteos)}
              </span>
            </p>
          </div>
        );
      case 1:
        return (
          <div className="w-full flex flex-col text-center">
            <FormGroup className="flex justify-center items-center">
              <FormControlLabel
                className="text-center"
                control={
                  <Switch
                    checked={calculoMoras}
                    onChange={() => setCalculoMorasp(!calculoMoras)}
                  />
                }
                label="Desea calcular las moras?"
              />
            </FormGroup>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-12 gap-4 mb-2 mt-6">
            <div className="col-span-6">
              <FormGroup className="flex justify-center items-center">
                <FormControlLabel
                  className="text-center"
                  control={
                    <Switch
                      checked={agregarVales}
                      onChange={() => setAgregarVales(!agregarVales)}
                    />
                  }
                  label="Desea agregar vales?"
                />
              </FormGroup>
            </div>
            <div className="col-span-6">
              {agregarVales && (
                <div className="relative z-0">
                  <input
                    id="vales"
                    type="number"
                    name="vales"
                    value={vale}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericValue = Number(inputValue);

                      if (!Number.isNaN(numericValue)) {
                        SetVale(numericValue);
                      } else {
                        SetVale(undefined);
                      }
                    }}
                    autoComplete="off"
                    className={
                      "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    }
                    placeholder=" "
                  />
                  <label
                    htmlFor="vales"
                    className="absolute text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Valor Vale
                  </label>
                </div>
              )}
            </div>
          </div>
        );
      default:
        break;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step
              key={label}
              {...stepProps}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? null : (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{handleActiveStep()}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atras
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1
                ? "Confirmar cambios"
                : "Siguiente"}
            </Button>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default GuardarCoteos;
