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

const steps = ["Flujo de caja", "Calculo de moras"];

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
  const { setOpenModal, setLoader, setErrorsToast } = useDashboardStore();
  const { rutaId, setData, clearNuevos } = useRutaStore();

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep + 1 === steps.length) {
      setOpenModal(false);
      setLoader(true);
      const response = await saveAbonos(
        rutaId,
        dataCoteos,
        flujoCaja,
        calculoMoras
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
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep == 0 ? (
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
                  Coteos:{" "}
                  <span className="text-sky-500">
                    {NumberFormat(flujoCaja.coteos)}
                  </span>
                </p>
              </div>
            ) : (
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
            )}
          </Typography>
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
