import { Save, UserPlus2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRutaStore } from "../../../store/RutaStore";
import {
  Autocomplete,
  FormControl,
  IconButton,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { IItemsCBox, IItemsCBoxV1 } from "../../../types/IRuta";
import FloatingLabel from "../../Common/FloatingLabel";
import {
  CrearCreditoVacio,
  IClienteCredito,
  ICrearCredito,
  IErrorsCrearCredito,
} from "../../../types/ICredito";
import { ClienteVacio, ICliente } from "../../../types/ICliente";
import { getClientes, saveCreditos } from "../../../services/creditoService";
import { DeleteForever, PeopleAlt } from "@mui/icons-material";
import { useDashboardStore } from "../../../store/DashboardStore";
import { TypeToastEnum } from "../../../types/IToast";

interface IAgregarClientesProps {
  accion: (tipo: string) => void;
  rutaId: number;
}

const AgregarClientes: React.FC<IAgregarClientesProps> = ({
  accion,
  rutaId,
}) => {
  const [formData, setFormData] = useState<ICrearCredito>(CrearCreditoVacio);
  const [nuevosCreditos, setNuevosCreditos] = useState<ICrearCredito[]>([]);
  const [errors, setErrors] = useState<Partial<IErrorsCrearCredito>>({});
  const { setLoader, setOpenModal, setErrorsToast } = useDashboardStore(
    (state) => state
  );
  const [clientes, setClientes] = useState<ICliente[]>([]);

  const Clientes = async () => {
    const response = await getClientes();
    const data: IClienteCredito = response;
    setClientes(data.data);
  };

  useEffect(() => {
    Clientes();
  }, []);

  const { periodos, setNuevosData } = useRutaStore();
  const { dias } = useDashboardStore();

  const handleInputChange = (
    property: string,
    newValue: string | number | ICliente
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [property]: newValue,
    }));
  };

  const handleAutoCompleteChange = (
    property: string,
    newValue: string | number,
    text: string,
    cliente: ICliente
  ) => {
    handleInputChange(property, newValue);
    handleInputChange("ClienteText", text);
    handleInputChange("ClienteId", cliente.id);
    handleInputChange("Cliente", cliente);
  };

  const validate = () => {
    const errors: Partial<IErrorsCrearCredito> = {};

    if (formData.ClienteId === 0)
      errors.ClienteId = "El cliente es obligatorio";

    if (!formData?.InicioCredito)
      errors.InicioCredito = "La fecha es obligatoria";

    if (!formData?.ModCuota)
      errors.ModCuota = "El valor de la cuota es obligatorio";

    if (!formData?.ValorPrestamo)
      errors.ValorPrestamo = "El valor a prestar es obligatorio";

    if (!formData?.ModDias)
      errors.ModDias = "La cantidad de dias es obligatorio";

    return errors;
  };

  function validarDuplicados(arregloCreditos: ICrearCredito[]): boolean {
    const clienteIds = new Set<number>(); // Usamos un Set para almacenar los ClienteId únicos

    for (const credito of arregloCreditos) {
      if (clienteIds.has(credito.ClienteId)) {
        // Si el ClienteId ya está en el Set, significa que está repetido
        return true; // Hay un duplicado
      }
      clienteIds.add(credito.ClienteId); // Si no está en el Set, lo añadimos
    }

    return false; // No hay duplicados
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setFormData(CrearCreditoVacio);
    setNuevosCreditos((prevCreditos) => [...prevCreditos, formData]);
  };

  const handleRemoveCredito = async (e: React.FormEvent, index: number) => {
    e.preventDefault();
    setNuevosCreditos((prevCreditos) =>
      prevCreditos.filter((_, i) => i !== index)
    );
  };

  const handleAddCredito = async () => {
    setLoader(true);
    if (!validarDuplicados(nuevosCreditos)) {
      const response = await saveCreditos(nuevosCreditos, rutaId);
      if (response) {
        setNuevosData(nuevosCreditos);
        setOpenModal(false);
      }
    } else {
      setErrorsToast([
        {
          message: "Hay clientes repetidos, por favor revise antes de guardar",
          type: TypeToastEnum.Warning,
        },
      ]);
    }
    setLoader(false);
  };

  return (
    <>
      <div className="flex flex-row-reverse bg-[#E5E5E7] p-2 border-b-2 border-sky-600 ">
        <IconButton
          disabled={nuevosCreditos.length > 0 ? false : true}
          color="primary"
          onClick={handleAddCredito}
        >
          <Save size={20} />
        </IconButton>
      </div>
      <div className="sm:px-4 md:px-4 p-4">
        <form className="space-y-6">
          <div className="grid grid-cols-12 gap-4 mb-6">
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-9 flex flex-col justify-end h-full">
                  <Autocomplete
                    id="cliente"
                    itemRef={"cliente"}
                    size="small"
                    options={clientes}
                    selectOnFocus
                    clearOnBlur
                    getOptionLabel={(option) =>
                      option != null ? option.titular : ""
                    }
                    renderOption={(props, option: ICliente, { index }) => (
                      <ListItem
                        {...props}
                        key={`AutoC[${option.titular}][${option.cc_titular}][${index}]`}
                      >
                        <ListItemText
                          key={`AutoCL[${option.titular}][${option.cc_titular}][${index}]`}
                          primary={`${option.cc_titular} - ${option.titular}`}
                        />
                      </ListItem>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cliente"
                        variant="standard"
                      />
                    )}
                    onChange={(_event, option) =>
                      option
                        ? handleAutoCompleteChange(
                            "ClienteId",
                            option.id,
                            option.titular,
                            option
                          )
                        : handleAutoCompleteChange(
                            "ClienteId",
                            0,
                            "",
                            ClienteVacio
                          )
                    }
                  />
                  {errors && errors["ClienteId"] && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {String(errors["ClienteId"])}
                    </p>
                  )}
                </div>
                <div className="col-span-3">
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => accion("nuevoCliente")}
                  >
                    <PeopleAlt /> Cliente nuevo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-6 mt-4">
                <div className="col-span-6">
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="small"
                    margin="normal"
                  >
                    <InputLabel htmlFor="ObsDia">Días</InputLabel>
                    <Select
                      label="Días"
                      value={formData.ObsDia}
                      onChange={(e) =>
                        handleInputChange("ObsDia", e.target.value)
                      }
                      defaultValue="1"
                      inputProps={{
                        name: "ObsDia",
                        id: "ObsDia",
                      }}
                    >
                      {dias.map((dia: IItemsCBoxV1) => {
                        return (
                          <MenuItem
                            key={`Dia[${dia.label}]`}
                            value={dia.label}
                          >
                            {dia.label}
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
                <div className="col-span-6">
                  <FloatingLabel
                    property={"InicioCredito"}
                    type="date"
                    label="Fecha del crédito"
                    value={formData.InicioCredito.toLocaleString() ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
                <div className="col-span-6">
                  <FloatingLabel
                    property={"ValorPrestamo"}
                    type="number"
                    label="Valor a prestar"
                    value={formData.ValorPrestamo ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-6">
                <div className="col-span-4">
                  <FloatingLabel
                    property={"ModCuota"}
                    type="number"
                    label="Cuota"
                    value={formData.ModCuota ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
                <div className="col-span-4">
                  <FloatingLabel
                    property={"ModDias"}
                    type="number"
                    label="Días"
                    value={formData.ModDias ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
                <div className="col-span-4">
                  <FloatingLabel
                    property={"RutaId"}
                    type="number"
                    label="Valor total"
                    value={
                      (formData.ModCuota ?? 0) * (formData.ModDias ?? 0) * 1000
                    }
                    action={() => {}}
                    errors={errors}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12">
                  <FloatingLabel
                    property={"Observaciones"}
                    type="text"
                    label="Observaciones"
                    value={formData.Observaciones ?? ""}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
              </div>

              <div className="flex flex-row-reverse items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                  className="text-sky-600 bg-gray-100 hover:bg-sky-700 hover:text-white border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                >
                  <UserPlus2 className="mr-2" />
                  Agregar Cliente
                </button>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <TableContainer
                component={Paper}
                sx={{
                  maxHeight: 360,
                }}
              >
                <Table
                  style={{ height: "100%" }}
                  size="small"
                  stickyHeader
                >
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell>Cliente</TableCell>
                      <TableCell align="right">Valor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {nuevosCreditos.map((row: ICrearCredito, index) => (
                      <TableRow key={`TR[${row.ClienteId}]`}>
                        <TableCell
                          component="th"
                          scope="row"
                          align="left"
                        >
                          <IconButton color="primary">
                            <DeleteForever
                              onClick={(e) => handleRemoveCredito(e, index)}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell>{row.ClienteText}</TableCell>
                        <TableCell align="right">
                          {(row.ValorPrestamo ?? 0) * 1000}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AgregarClientes;
