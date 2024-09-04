import { useDashboardStore } from "../store/DashboardStore";
import api from "./api";

export const Login = async (username: string, password: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("account/signin", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Logout = async () => {
  try {
    console.log("Hace salida");
    const { logout } = useDashboardStore.getState();
    logout();
    // localStorage.removeItem('token');
    //window.location.href = "/login";
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
