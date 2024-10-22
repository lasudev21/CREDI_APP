/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { links } from "../../utils/company";
import { useDashboardStore } from "../../store/DashboardStore";
import { useApiNoAuth } from "../../hooks/useApiNoAuth";
import { ManageErrorsV2 } from "../../utils/ErrorUtils";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const SwitchCompany = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { sessionData, setLoader, setSessionData, toggleDrawerCompany } =
    useDashboardStore();
  const { request } = useApiNoAuth();

  const handleCardClick = (link: any) => {
    Swal.fire({
      title: "Digite su contraseña",
      input: "password",
      inputPlaceholder: "Contraseña",
      showCancelButton: true,
      confirmButtonText: "Cambiar",
      cancelButtonText: "Cancelar",
      preConfirm: (inputValue) => {
        if (!inputValue) {
          Swal.showValidationMessage("Por favor, ingrese su contraseña");
        }
        return inputValue;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoader(true);
          const username = user.Username;
          const password = result.value;
          const data = await request("post", `${link.url}/auth/login`, {
            username,
            password,
          });
          toggleDrawerCompany(false);
          cookie.set("apiURL", link.url, { path: "/" });
          setSessionData({ apiURL: link.url, pageName: link.name });
          localStorage.setItem("token", data.token);
          localStorage.setItem("rol", JSON.stringify(data.rol));
          localStorage.setItem("user", JSON.stringify(data.userData));
          setTimeout(() => {
            setLoader(false);
            location.reload();
          }, 1000);
        } catch (error) {
          await ManageErrorsV2(error);
        }
      }
    });
  };
  return (
    <div className="container mx-auto p-3">
      <div className="grid grid-cols-1 gap-4">
        {links.map((link) => {
          if (sessionData.pageName != link.name) {
            return (
              <div
                key={link.value}
                className="flex cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 border-2"
                onClick={() => handleCardClick(link)}
              >
                <div className="w-1 bg-sky-700"></div>
                <div className="flex-grow p-4 bg-white shadow-md hover:shadow-lg">
                  <h2 className="text-lg font-semibold">{link.name}</h2>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default SwitchCompany;
