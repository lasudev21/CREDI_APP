import { Building2 } from "lucide-react";
import routes from "../../routes";
import { useDashboardStore } from "../../store/DashboardStore";
// import { NavItem } from "../../components/Layout/NavItem";
import Loader from "../../components/Common/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TypeToastEnum } from "../../types/IToast";
import { NavBar } from "../../components/Layout/NavBar";

export function Layout() {
  const { darkMode, loading, errors, setErrorsToast, sessionData } =
    useDashboardStore();

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((item) => {
        switch (item.type) {
          case TypeToastEnum.Error:
            toast.error(item.message);
            break;
          case TypeToastEnum.Warning:
            toast.warning(item.message);
            break;
          case TypeToastEnum.Susccess:
            toast.success(item.message);
            break;
        }
        setErrorsToast([]);
      });
    }
  }, [errors]);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      {loading && <Loader />}
      <div className="bg-[#f3f4f6] dark:bg-gray-900 min-h-screen">
        <NavBar />

        <main className="max-w mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mt-4">{routes}</div>
        </main>

        <footer className="bg-sky-700 fixed bottom-0 left-0 right-0 text-white h-[25px] flex items-center justify-between px-4">
          <div className="text-sm">
            © {new Date().getFullYear()} Larry Suarez Dev, todos los derechos
            reservados
          </div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span className="text-lg font-bold">{sessionData.pageName}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
