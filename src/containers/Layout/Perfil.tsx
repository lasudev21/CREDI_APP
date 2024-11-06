import { Lock, UserCircle } from 'lucide-react'
import { useState } from 'react'

interface RolDetalle {
    Id: number
    RolPermisoId: number
    UserId: number
    Ver: boolean
    Editar: boolean
    Especial: boolean
}

interface RolPermiso {
    Id: number
    RolId: number
    Pantalla: string
    Ver: boolean
    roles_detalles: RolDetalle[]
}

interface UserData {
    Id: number
    Nombres: string
    Apellidos: string
    Telefono1: string
    Telefono2: string
    Login: boolean
    Username: string
    Rol: number
    roles_permiso: RolPermiso[]
}

const FloatingLabelInput = ({ id, value, label }: { id: string; value: string; label: string }) => (
    <div className="relative">
        <input
            type="text"
            id={id}
            name={id}
            value={value}
            readOnly
            className="block py-2.5 px-0 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-sky-600 peer"
            placeholder=" "
        />
        <label
            htmlFor={id}
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white peer-focus:px-2 peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
            {label}
        </label>
    </div>
)


export default function UserProfile({ userData }: { userData: UserData }) {
    const [editPass, setEditPass] = useState(false);
    return (
        <div className="mb-5 pb-5">
            <div className="mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 lg:w-2/3 p-8">
                        <div className="flex items-center mb-6">
                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-b from-sky-400 to-sky-600 p-2 rounded-full mb-2">
                                    <UserCircle className="h-16 w-16 text-white" aria-hidden="true" />
                                </div>
                                <span className="text-gray-600 mb-2">{userData.Username}</span>
                                <button
                                    onClick={() => setEditPass(!editPass)}
                                    className="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
                                >
                                    <Lock className="w-4 h-4 mr-2" />
                                    Modificar contraseña
                                </button>
                            </div>
                            <div className='p-3'>
                                <div className="uppercase tracking-wide text-sm text-sky-500 font-semibold">ID: {userData.Id}</div>
                                <h1 className="text-3xl font-bold text-gray-900">Perfil de Usuario</h1>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FloatingLabelInput id="nombres" value={userData.Nombres} label="Nombres" />
                            <FloatingLabelInput id="apellidos" value={userData.Apellidos} label="Apellidos" />
                            <FloatingLabelInput id="telefono1" value={userData.Telefono1} label="Teléfono 1" />
                            <FloatingLabelInput id="telefono2" value={userData.Telefono2} label="Teléfono 2" />
                            <FloatingLabelInput id="username" value={userData.Username} label="Nombre de usuario" />
                            <FloatingLabelInput id="rol" value={userData.Rol === 1 ? "ADMINISTRADOR" : userData.Rol === 2 ? "SUPERVISOR" : "EMPLEADO"} label="Rol" />
                            {
                                editPass && <FloatingLabelInput id="password" value={""} label="Contraseña" />
                            }
                        </div>
                    </div>
                    <div className="md:w-1/2 lg:w-2/3 p-8 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Roles y Permisos</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pantalla</th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ver</th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editar</th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especial</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {userData.roles_permiso.map((rol) => (
                                        <tr key={rol.Id}>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rol.Pantalla}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {rol.roles_detalles[0].Ver ? '✅' : '❌'}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {rol.roles_detalles[0].Editar ? '✅' : '❌'}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {rol.roles_detalles[0].Especial ? '✅' : '❌'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}