import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboardStore } from "../store/DashboardStore";
import { Cookies } from "react-cookie";
import { useApiNoAuth } from "../hooks/useApiNoAuth";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { EyeIcon } from "lucide-react";
import { links } from "../utils/company";

const cookie = new Cookies();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const navigate = useNavigate();
  const setIsAuthenticated = useDashboardStore((state) => state.login);
  const setSessionData = useDashboardStore((state) => state.setSessionData);
  const sessionData = useDashboardStore((state) => state.sessionData);
  const { loading, error, request } = useApiNoAuth();

  useEffect(() => {
    if (error?.response.data) {
      toast.warning(error?.response.data.Error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionData.apiURL != "") {
      try {
        const data = await request("post", `${sessionData.apiURL}/auth/login`, {
          username,
          password,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", JSON.stringify(data.rol));
        localStorage.setItem("user", JSON.stringify(data.userData));
        setIsAuthenticated();
        navigate("/");
        location.reload();
      } catch {
        // await ManageErrors(error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const text = event.target.options[event.target.selectedIndex].text;
    const url =
      event.target.options[event.target.selectedIndex].getAttribute("data-url");

    setSelectedValue(Number(value));
    if (value === "0") setSessionData({ apiURL: "", pageName: "" });
    else {
      cookie.set("apiURL", url, { path: "/" });
      setSessionData({ apiURL: url ? url : "", pageName: text });
    }
  };

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-sky-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">CrediApp</h1>
          <p className="text-white mt-1">
            Una nueva versión de tu app para gestion de carteras...
          </p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex h-screen md:w-1/2 justify-center py-10 items-center bg-white">
        <form
          className="bg-white"
          onSubmit={handleSubmit}
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Bienvenido/a de nuevo!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Inicia sesión para continuar...
          </p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#cac4c4"
              viewBox="0 0 52 52"
              className="h-5 w-5 text-gray-400"
              enableBackground="new 0 0 52 52"
              stroke="#cac4c4"
            >
              <g
                id="SVGRepo_bgCarrier"
                strokeWidth="0"
              />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path d="M21,4H7C5.3,4,4,5.3,4,7v40c0,0.5,0.5,1,1,1h4c0.6,0,1-0.4,1-1v-6c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v6 c0,0.6,0.4,1,1,1h3c1.1,0,2-0.9,2-2V7C24,5.3,22.7,4,21,4z M12,35.5c0,0.3-0.2,0.5-0.5,0.5h-3C8.2,36,8,35.8,8,35.5v-5 C8,30.2,8.2,30,8.5,30h3c0.3,0,0.5,0.2,0.5,0.5V35.5z M12,25.5c0,0.3-0.2,0.5-0.5,0.5h-3C8.2,26,8,25.8,8,25.5v-5 C8,20.2,8.2,20,8.5,20h3c0.3,0,0.5,0.2,0.5,0.5V25.5z M12,15.5c0,0.3-0.2,0.5-0.5,0.5h-3C8.2,16,8,15.8,8,15.5v-5 C8,10.2,8.2,10,8.5,10h3c0.3,0,0.5,0.2,0.5,0.5V15.5z M20,35.5c0,0.3-0.2,0.5-0.5,0.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5V35.5z M20,25.5c0,0.3-0.2,0.5-0.5,0.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5V25.5z M20,15.5c0,0.3-0.2,0.5-0.5,0.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5V15.5z" />{" "}
                <path d="M45,14H31c-1.7,0-3,1.3-3,3v30c0,0.5,0.5,1,1,1h4c0.6,0,1-0.4,1-1v-6c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v6 c0,0.6,0.4,1,1,1h3c1.1,0,2-0.9,2-2V17C48,15.3,46.7,14,45,14z M36,35.5c0,0.3-0.2,0.5-0.5,0.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5V35.5z M36,25.5c0,0.3-0.2,0.5-0.5,0.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5V25.5z M44,35.5c0,0.3-0.2,0.5-0.5,0.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5V35.5z M44,25.5c0,0.3-0.2,0.5-0.5,0.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5V25.5z" />{" "}
              </g>
            </svg>
            <select
              className="w-full pl-2 outline-none border-none"
              value={selectedValue}
              onChange={handleChange}
              id="company"
              name="company"
              disabled={loading}
              required
            >
              <option
                value="0"
                data-url=""
              >
                Seleccione...
              </option>
              {links.map((item) => (
                <option
                  value={item.value}
                  data-url={item.url}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              placeholder="Usuario"
              value={username}
              disabled={loading}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="username"
              required
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              placeholder="Contraseña"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
            />
            <EyeIcon
              fontSize="small"
              className="cursor-pointer hover:text-sky-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {/* {error && (
            <p className="text-red-500 text-sm">{error.response.data.Error}</p>
          )} */}
          <button
            type="submit"
            disabled={loading}
            className="block w-full bg-sky-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            {loading ? (
              <CircularProgress
                className="mr-2"
                color="inherit"
                size={15}
              />
            ) : null}
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
