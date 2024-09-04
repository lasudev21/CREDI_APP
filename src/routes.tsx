import { Route, Routes} from 'react-router-dom'
import Clientes from './containers/Administracion/Clientes/Main'
import Dashboard from './containers/Layout/Dashboard'
import Usuarios from './containers/Administracion/Usuarios/Main'
import Maestras from './containers/Administracion/Parametros/Main'

export default (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/administracion/clientes" element={<Clientes />} />
        <Route path="/administracion/usuarios" element={<Usuarios />} />
        <Route path="/administracion/parametros" element={<Maestras />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} /> */}
    </Routes>
)
