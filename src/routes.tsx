import { Route, Routes } from "react-router-dom";
import Clientes from "./containers/Administracion/Clientes/Main";
import Dashboard from "./containers/Layout/Dashboard";
import Usuarios from "./containers/Administracion/Usuarios/Main";
import Maestras from "./containers/Administracion/Parametros/Main";
import Roles from "./containers/Administracion/Roles/Main";
import Rutas from "./containers/Cobros/Rutas/Main";
import FlujoCaja from "./containers/Cobros/Flujo Caja/Main";
import FlujoUtilidades from "./containers/Cobros/Flujo Utilidades/Main";
import Coteos from "./containers/Reportes/Coteos/Main";
import Permisos from "./components/Common/Permisos";
import Nomina from "./containers/Reportes/Mensual/Main";
import Cuentas from "./containers/Reportes/Cuentas/Main";
import Perfil from "./containers/Layout/Perfil";
const user = JSON.parse(localStorage.getItem("user") || "{}");

export default (
  <Routes>
    <Route
      path="/"
      element={<Dashboard />}
    />
    <Route
      path="/administracion/clientes"
      element={<Clientes />}
    />
    <Route
      path="/administracion/usuarios"
      element={<Usuarios />}
    />
    <Route
      path="/administracion/parametros"
      element={<Maestras />}
    />
    <Route
      path="/administracion/roles"
      element={<Roles />}
    />
    <Route
      path="/cobros/rutas"
      element={<Rutas />}
    />
    <Route
      path="/cobros/flujocaja"
      element={<FlujoCaja />}
    />
    <Route
      path="/cobros/flujoUtilidades"
      element={<FlujoUtilidades />}
    />
    <Route
      path="/reportes/coteos"
      element={<Coteos />}
    />
    <Route
      path="/reportes/mensual"
      element={<Nomina />}
    />
    <Route
      path="/reportes/cuentas"
      element={<Cuentas />}
    />
    <Route
      path="/permisos"
      element={<Permisos />}
    />
    <Route
      path="/perfil"
      element={<Perfil userData={user} />}
    />
  </Routes>
);
