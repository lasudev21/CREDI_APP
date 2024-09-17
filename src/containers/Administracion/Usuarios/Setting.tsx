import { useEffect, useState } from "react";
import { IErrorsUsuario, IUsuario } from "../../../types/IUsuario";
import FloatingLabel from "../../../components/Common/FloatingLabel";

interface DrawerProps {
  usuario: IUsuario;
}

const Setting: React.FC<DrawerProps> = ({ usuario }) => {
  const [formData, setFormData] = useState<IUsuario>(usuario);
  const [errors, setErrors] = useState<Partial<IErrorsUsuario>>({});

  useEffect(() => {
    setFormData(usuario);
  }, [usuario, formData]);

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
              <FloatingLabel
                property={"nombres"}
                type="text"
                label="Nombres"
                value={formData.nombres}
                action={() => handleChange}
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
                action={() => handleChange}
                errors={errors}
                disabled={false}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative">
              <FloatingLabel
                property={"telefono1"}
                type="number"
                label="Teléfono 1"
                value={formData.telefono1 ?? 0}
                action={() => handleChange}
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
                action={() => handleChange}
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
          </div>{" "}
          Es usuario de la aplicación?
        </label>

        {formData.login ? (
          <>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <div className="relative">
                  <FloatingLabel
                    property={"email"}
                    type="text"
                    label="Correo Electronico"
                    value={formData.email}
                    action={() => handleChange}
                    errors={errors}
                    disabled={false}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <div className="relative">
                  <FloatingLabel
                    property={"username"}
                    type="text"
                    label="Nombre de usuario"
                    value={formData.username}
                    action={() => handleChange}
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
                    action={() => handleChange}
                    errors={errors}
                    disabled={false}
                  />
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
