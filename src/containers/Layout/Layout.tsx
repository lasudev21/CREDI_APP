import { Building2 } from "lucide-react";
import routes from "../../routes";
import { useDashboardStore } from "../../store/DashboardStore";
import Loader from "../../components/Common/Loader";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { TypeToastEnum } from "../../types/IToast";
import { NavBar } from "../../components/Layout/NavBar";
import ToastMsg from "../../components/Common/ToastMsg";
import { IToast } from "../../types/IToast";

export function Layout() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [_error, _setError] = useState<IToast[]>([]);
  const {
    loading,
    errors,
    setErrorsToast,
    sessionData,
    isMobile,
    setIsMobile,
  } = useDashboardStore();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((item) => {
        _error.push(item);
        // switch (item.type) {
        //   case TypeToastEnum.Error:
        //     toast.error(item.message);
        //     break;
        //   case TypeToastEnum.Warning:
        //     toast.warning(item.message);
        //     break;
        //   case TypeToastEnum.Susccess:
        //     toast.success(item.message);
        //     break;
        // }
        setErrorsToast([]);
        _setError([]);
      });
    }
  }, [_error, errors, setErrorsToast]);

  return (
    <div className={`min-h-screen`}>
      {loading && <Loader />}
      {_error.length > 0 &&
        _error.map((item: IToast) => {
          return (
            <ToastMsg
              text={item.message}
              type={item.type}
            />
          );
        })}
      <div className="bg-[#f3f4f6] min-h-screen">
        <NavBar />

        <main className="mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mt-4">{routes}</div>
        </main>

        <footer className="bg-sky-700 fixed bottom-0 left-0 right-0 text-white flex items-center justify-between px-4 sm:px-6 md:px-8">
          {!isMobile && (
            <div className="text-sm">
              © {new Date().getFullYear()} Larry Suarez Dev
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span className="text-lg font-bold">{sessionData.pageName}</span>
            <span className="text-sm font-extralight italic">
              (<span className="font-semibold">Usuario</span>:{" "}
              {`${user.Nombres} ${user.Apellidos}`})
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
