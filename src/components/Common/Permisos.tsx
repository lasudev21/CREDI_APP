import { XCircleIcon } from "lucide-react";

const Permisos = () => {
  return (
    <div
      className="max-h-screen flex flex-col items-center justify-center p-4"
      style={{ height: "80vh" }}
    >
      <div className="bg-white rounded-lg shadow-md p-8 max-w-xl sm:max-w-sm w-full text-center">
        <XCircleIcon className="mx-auto h-24 w-24 text-gray-400" />
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Oops.. No tiene permisos suficientes!
        </h1>
        <p className="mt-2 mb-6 text-sm text-gray-400">
          Por favor contacte con su administrador para mas detalles...
        </p>
        <a
          href="/"
          className="mt-8 m-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};
export default Permisos;
