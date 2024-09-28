/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import TransferirPermisos from "../../../components/Administracion/Roles/TransferirPermisos";
import Card from "../../../components/Common/Card";
import { IItemsCBox } from "../../../types/IRuta";
import { getListaRoles } from "../../../services/parametroService";
import { useRolStore } from "../../../store/RolStore";
import { useDashboardStore } from "../../../store/DashboardStore";
import { getPermisoRol, putPermisoRol } from "../../../services/rolService";
import { IRolePermiso, IRolePermisoData } from "../../../types/IRolPermiso";
import { IconButton } from "@mui/material";
import { Save } from "lucide-react";
import { TypeToastEnum } from "../../../types/IToast";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const navigate = useNavigate();
  const permisosRef = useRef<any>(null);
  const {
    roles,
    setRoles,
    permisos,
    setPermisos,
    vaciarRoles,
    vaciarPermisos,
  } = useRolStore();
  const { setLoader, setErrorsToast, validarPermiso } = useDashboardStore();
  const [selected, setSelected] = useState(0);

  const Roles = async () => {
    setLoader(true);
    const response = await getListaRoles();
    const data: IItemsCBox[] = response;
    setRoles(data);
    setLoader(false);
  };

  const ConsultarPermisoRol = async (idRol: number) => {
    setLoader(true);
    setSelected(idRol);
    const response: IRolePermisoData = await getPermisoRol(idRol);
    setPermisos(response);
    setLoader(false);
  };

  const GuardarPermisoRol = async () => {
    setLoader(true);
    const listado = permisosRef.current.getData();
    const dataPermiso: IRolePermiso[] = [];
    permisos.map((item) => {
      let permiso = false;
      const right = listado.find((x: number) => x === item.id);
      if (right) {
        permiso = true;
      }
      dataPermiso.push({
        id: item.id,
        pantalla: item.pantalla,
        rol_id: item.rol_id,
        ver: permiso,
      });
    });
    await putPermisoRol(dataPermiso);
    setErrorsToast([
      {
        message: "Se han actualizado los permisos",
        type: TypeToastEnum.Susccess,
      },
    ]);
    setSelected(0);
    vaciarPermisos();
    setLoader(false);
  };

  const icons: React.ReactNode[] = [
    <IconButton
      color="primary"
      disabled={permisos.length > 0 ? false : true}
      onClick={() => GuardarPermisoRol()}
      key="btn[0][0]"
      title="Agregar cliente"
    >
      <Save />
    </IconButton>,
  ];

  useEffect(() => {
    if (!validarPermiso("Roles")) {
      navigate("/permisos");
    } else {
      vaciarRoles();
      vaciarPermisos();
      Roles();
    }
  }, []);

  return (
    <Card
      icons={icons}
      texts={[]}
      title="Asignación de permisos"
      content={
        <>
          <form className="space-y-6 p-4">
            <div className="relative">
              <select
                id="floating_filled"
                value={selected}
                onChange={(e) => ConsultarPermisoRol(Number(e.target.value))}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                htmlFor="floating_filled"
                className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-4 z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Seleccione un rol...
              </label>
            </div>
          </form>

          <TransferirPermisos
            ref={permisosRef}
            data={permisos}
          />
        </>
      }
    />
  );
};
export default Roles;
