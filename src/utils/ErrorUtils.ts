import { Logout } from "../services/authService";
import { useDashboardStore } from "../store/DashboardStore";
import { IErrorCallAPI } from "../types/IErrorCallAPI";
import { IToast, TypeToastEnum } from "../types/IToast";

export const ManageErrors = async (error: unknown) => {
  const _error = error as IErrorCallAPI;
  console.log(_error);
  
  const { setErrorsToast } = useDashboardStore.getState();
  let errors: IToast[] = [];

  switch (_error.status) {
    case 404:
      errors = [...errors, { message: _error.message, type: TypeToastEnum.Error }];
      setErrorsToast(errors);
      break;
    case 401:
      await Logout();
      break;
    default:
      break;
  }
};
