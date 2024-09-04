import { useState } from "react";
import { IErrorsUsuario, IUsuario } from "../../../types/IUsuario";

const Setting = () => {
  const [formData, setFormData] = useState<IUsuario>({
    id: 0,
    nombres: "",
    apellidos: "",
    telefono1: 0,
    telefono2: 0,
    login: false,
    username: "",
    password: "",
    ruta: "",
    created_at: new Date(),
    Updated_at: new Date(),
    email: "",
    rol: 0,
  });

  const [errors, setErrors] = useState<Partial<IErrorsUsuario>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "login") {
      setFormData({
        ...formData,
        login: !formData.login,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const errors: Partial<IErrorsUsuario> = {};

    console.log(errors);
    if (!formData?.nombres.trim())
      errors.nombres = "Los nombres son obligatorios";

    if (!formData?.apellidos.trim())
      errors.apellidos = "Los apellidos son obligatorios";

    if (!formData?.telefono1) errors.telefono1 = "El telefono 1 es obligatorio";

    if (!formData?.telefono2) errors.telefono2 = "El telefono 2 es obligatorio";

    if (formData?.login) {
      if (!formData.email.trim()) errors.email = "El email es obligatorio";
      if (!formData.password.trim())
        errors.password = "La contraseña es obligatoria";
      if (!formData.username.trim())
        errors.username = "El nombre de usuario es obligatorio";
    }

    // if (!formData.message.trim()) errors.message = "Message is required";

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Handle form submission (e.g., send data to API)
    console.log("Form submitted", formData);
  };

  return (
    <div className="sm:p-4 md:p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative">
              <input
                id="nombres"
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.nombres ? "border-red-500" : ""
                }`}
                placeholder=""
                autoComplete="false"
              />
              <label
                htmlFor="nombres"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Nombres
              </label>
              {errors.nombres && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.nombres}
                </p>
              )}
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative">
              <input
                id="apellidos"
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.apellidos ? "border-red-500" : ""
                }`}
                placeholder=""
                autoComplete="false"
              />
              <label
                htmlFor="apellidos"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Apellidos
              </label>
              {errors.apellidos && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.apellidos}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative">
              <input
                id="telefono1"
                type="number"
                name="telefono1"
                value={formData.telefono1}
                onChange={handleChange}
                className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.telefono1 ? "border-red-500" : ""
                }`}
                placeholder=""
                autoComplete="false"
              />
              <label
                htmlFor="telefono1"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Telefono 1
              </label>
              {errors.telefono1 && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.telefono1}
                </p>
              )}
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative">
              <input
                id="telefono2"
                type="number"
                name="telefono2"
                value={formData.telefono2}
                onChange={handleChange}
                className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.telefono2 ? "border-red-500" : ""
                }`}
                placeholder=""
                autoComplete="false"
              />
              <label
                htmlFor="telefono2"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Telefono 2
              </label>
              {errors.telefono2 && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.telefono2}
                </p>
              )}
            </div>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="login"
            id="login"
            checked={formData.login}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div
            className={`w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 
                        ${formData.login ? "peer-checked:bg-blue-500" : ""}`}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform 
                            ${formData.login ? "translate-x-5" : ""}`}
            />
          </div> Es usuario de la aplicación?
        </label>

        {formData.login ? (
          <>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder=""
                    autoComplete="false"
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Correo eléctronico
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              {/* <div className="relative z-0 w-full mb-5 group">
                <div className="relative">
                  <input
                    id="telefono2"
                    type="number"
                    name="telefono2"
                    value={formData.telefono2}
                    onChange={handleChange}
                    className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      errors.telefono2 ? "border-red-500" : ""
                    }`}
                    placeholder=""
                    autoComplete="false"
                  />
                  <label
                    htmlFor="telefono2"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Telefono 2
                  </label>
                  {errors.telefono2 && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.telefono2}
                    </p>
                  )}
                </div>
              </div> */}
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      errors.username ? "border-red-500" : ""
                    }`}
                    placeholder=""
                    autoComplete="false"
                  />
                  <label
                    htmlFor="username"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Nombre de usuario
                  </label>
                  {errors.username && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <div className="relative">
                  <input
                    id="password"
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder=""
                    autoComplete="false"
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Contraseña
                  </label>
                  {errors.password && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
