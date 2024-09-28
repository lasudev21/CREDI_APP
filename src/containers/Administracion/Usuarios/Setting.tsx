/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  IErrorsUsuario,
  IUsuario,
  IUsuarios,
  UsuarioVacio,
} from "../../../types/IUsuario";
import FloatingLabel from "../../../components/Common/FloatingLabel";
import {
  ListaVista,
  postGuardarPermisos,
  postUsuarios,
  putUsuarios,
} from "../../../services/usuarioService";
import { useDashboardStore } from "../../../store/DashboardStore";
import { TypeToastEnum } from "../../../types/IToast";
import { useUserStore } from "../../../store/UserStore";
import { IRolePermisoData } from "../../../types/IRolPermiso";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface DrawerProps {
  usuario: IUsuario;
}

const Setting: React.FC<DrawerProps> = ({ usuario }) => {
  const [formData, setFormData] = useState<IUsuario>(usuario);
  const [errors, setErrors] = useState<Partial<IErrorsUsuario>>({});
  const { setLoader, setErrorsToast, toggleDrawer } = useDashboardStore();
  const {
    setClientes,
    rutas,
    roles,
    setPermisos,
    permisos,
    setPermiso,
    setVaciarPermisos,
  } = useUserStore();

  const ListaVistas = async (idRol: number, idUser: number) => {
    setVaciarPermisos();
    const response = await ListaVista(idRol, idUser);
    const data: IRolePermisoData = response;
    setPermisos(data);
  };

  useEffect(() => {
    setFormData(usuario);
    if (usuario.id !== 0 && usuario.login) {
      ListaVistas(Number(usuario.rol), usuario.id);
    } else {
      setVaciarPermisos();
    }
  }, [usuario]);

  const handleInputChange = (property: string, newValue: string | number) => {
    if (property === "login") {
      setFormData({
        ...formData,
        login: !formData.login,
      });
    } else {
      setFormData({
        ...formData,
        [property]: newValue,
      });
    }
  };

  const validate = () => {
    const errors: Partial<IErrorsUsuario> = {};

    if (!formData?.nombres.trim())
      errors.nombres = "Los nombres son obligatorios";

    if (!formData?.apellidos.trim())
      errors.apellidos = "Los apellidos son obligatorios";

    if (!formData?.telefono1) errors.telefono1 = "El telefono 1 es obligatorio";

    if (formData?.login) {
      if (!formData.email.trim()) errors.email = "El email es obligatorio";

      if (!formData.password.trim() && formData.id === 0)
        errors.password = "La contraseña es obligatoria";
      if (!formData.username.trim())
        errors.username = "El nombre de usuario es obligatorio";
      if (!formData.rol) errors.rol = "El Rol del usuario obligatorio";
    } else {
      if (!formData?.ruta) errors.ruta = "La ruta es obligatoria";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoader(true);

    const data: IUsuarios | null =
      formData.id === 0
        ? await postUsuarios(formData)
        : await putUsuarios(formData);
    if (data) {
      setErrorsToast([
        {
          message: "Usuario gestionado",
          type: TypeToastEnum.Susccess,
        },
      ]);
      setClientes(data);
      setFormData(UsuarioVacio);
    }

    if (formData.login && formData.id !== 0) {
      const data1 = await postGuardarPermisos(permisos, formData.id);
      if (data1) {
        setErrorsToast([
          {
            message: "Se han guardado los permisos del usuario",
            type: TypeToastEnum.Susccess,
          },
        ]);
      }
    }
    toggleDrawer(false);
    setLoader(false);
  };

  return (
    <div className="sm:p-4 md:p-4 mt-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
      >
        <div className="grid md:grid-cols-2 md:gap-6 sm:gap-4">
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative">
              <FloatingLabel
                property={"nombres"}
                type="text"
                label="Nombres"
                value={formData.nombres}
                action={handleInputChange}
                errors={errors}
                disabled={false}
              />
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative">
              <FloatingLabel
                property={"apellidos"}
                type="text"
                label="Apellidos"
                value={formData.apellidos}
                action={handleInputChange}
                errors={errors}
                disabled={false}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6 sm:gap-4">
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative">
              <FloatingLabel
                property={"telefono1"}
                type="number"
                label="Teléfono 1"
                value={formData.telefono1 ?? 0}
                action={handleInputChange}
                errors={errors}
                disabled={false}
              />
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative">
              <FloatingLabel
                property={"telefono2"}
                type="number"
                label="Teléfono 2"
                value={formData.telefono2 ?? 0}
                action={handleInputChange}
                errors={errors}
                disabled={false}
              />
            </div>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer mb-8">
          <input
            type="checkbox"
            name="login"
            id="login"
            checked={formData.login}
            onChange={(e) => handleInputChange("login", e.target.value)}
            className="sr-only peer"
          />
          <div
            className={`w-11 mr-4 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer ${
              formData.login ? "peer-checked:bg-blue-500" : ""
            }`}
          >
            <span
              className={`absolute mr-4 left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform 
                            ${formData.login ? "translate-x-5" : ""}`}
            />
          </div>{" "}
          Es usuario de la aplicación?
        </label>

        {formData.login ? (
          <>
            <div className="grid md:grid-cols-2 md:gap-6 sm:gap-4">
              <div className="relative z-0 w-full mb-5 group">
                <div className="relative">
                  <FloatingLabel
                    property={"email"}
                    type="text"
                    label="Correo Electronico"
                    value={formData.email}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <div className="relative">
                  <select
                    id="rol"
                    value={formData.rol ? formData.rol : 0}
                    onChange={(e) => handleInputChange("rol", e.target.value)}
                    className="block  mb-4 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option
                      key={`Rol[0]`}
                      value={0}
                    >
                      Seleccione...
                    </option>
                    {roles.map((rol) => {
                      return (
                        <option
                          key={`Rol[${rol.value}]`}
                          value={rol.value}
                        >
                          {rol.label}
                        </option>
                      );
                    })}
                  </select>
                  <label
                    htmlFor="rol"
                    className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Rol
                  </label>
                  {errors && errors["rol"] && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {String(errors["rol"])}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6 sm:gap-4">
              <div className="relative z-0 w-full mb-5 group">
                <div className="relative">
                  <FloatingLabel
                    property={"username"}
                    type="text"
                    label="Nombre de usuario"
                    value={formData.username}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <div className="relative">
                  <FloatingLabel
                    property={"password"}
                    type="text"
                    label="Contraseña"
                    value={formData.password}
                    action={handleInputChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="relative">
            <select
              id="ruta"
              value={formData.ruta ? formData.ruta : 0}
              onChange={(e) => handleInputChange("ruta", e.target.value)}
              className="block  mb-4 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option
                key={`Ruta[0]`}
                value={0}
              >
                Seleccione...
              </option>
              {rutas.map((ruta) => {
                return (
                  <option
                    key={`Ruta[${ruta.value}]`}
                    value={ruta.value}
                  >
                    {ruta.label}
                  </option>
                );
              })}
            </select>
            <label
              htmlFor="ruta"
              className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Ruta
            </label>
            {errors && errors["ruta"] && (
              <p className="text-red-500 text-xs italic mt-2">
                {String(errors["ruta"])}
              </p>
            )}
          </div>
        )}

        {formData.login && (
          <div className="mb-4">
            <p className="text-xl text-sky-500 font-extralight italic ">
              Asignacion de permisos
            </p>
            <span className="text-xs text-gray-400">
              Recuerde que solo puede adicionar los permisos una vez este
              guardado el usuario
            </span>
          </div>
        )}

        {formData.login && (
          <TableContainer
            component={Paper}
            className="mb-6"
          >
            <Table
              style={{ height: "100%" }}
              size="small"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>Pantalla</TableCell>
                  <TableCell align="center">Ver</TableCell>
                  <TableCell align="center">Editar/Guardar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permisos.map((row, index) => {
                  return (
                    <TableRow key={`TR[${row.idPermmision}]`}>
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {row.view}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <label className="custom-switch">
                          <input
                            type="checkbox"
                            name="custom-switch-checkbox"
                            className="custom-switch-input"
                            checked={row.ver}
                            onChange={(e) =>
                              setPermiso(index, { ver: e.target.checked })
                            }
                          />
                          <span className="custom-switch-indicator"></span>
                        </label>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <label className="custom-switch">
                          <input
                            type="checkbox"
                            name="custom-switch-checkbox"
                            className="custom-switch-input"
                            checked={row.editar}
                            onChange={(e) =>
                              setPermiso(index, { editar: e.target.checked })
                            }
                          />
                          <span className="custom-switch-indicator"></span>
                        </label>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
