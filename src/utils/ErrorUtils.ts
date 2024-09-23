/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { Logout } from "../services/authService";
import { useDashboardStore } from "../store/DashboardStore";
import { IErrorCallAPI } from "../types/IErrorCallAPI";
import { IToast, TypeToastEnum } from "../types/IToast";

export const ManageErrors = async (error: unknown) => {
  const _error = error as IErrorCallAPI;
  console.log(_error);

  const { setErrorsToast, setLoader } = useDashboardStore.getState();
  let errors: IToast[] = [];

  switch (_error.status) {
    case 404:
      errors = [
        ...errors,
        { message: _error.message, type: TypeToastEnum.Error },
      ];
      setErrorsToast(errors);
      break;
    case 401:
      await Logout();
      break;
    case 422:
      if (_error.response.data.errors) {
        for (const property in _error.response.data.errors) {
          // eslint-disable-next-line no-prototype-builtins
          if (_error.response.data.errors.hasOwnProperty(property)) {
            for (
              let n = 0;
              n < _error.response.data.errors[property].length;
              n++
            ) {
              errors.push({
                message: _error.response.data.errors[property][n],
                type: TypeToastEnum.Warning,
              });
            }
          }
        }
      }
      setErrorsToast(errors);
      break;
    case 423:
    case 424:
      errors = [
        ...errors,
        { message: _error.response.data.Error, type: TypeToastEnum.Warning },
      ];
      setErrorsToast(errors);
      break;
    case 500:
      Swal.fire({
        title: "Ups! Algo salió mal...",
        text: _error.message,
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#1e40af",
        confirmButtonText: "Entendido",
      }).then(() => {});
      break;
    default:
      break;
  }
  setLoader(false);
};
