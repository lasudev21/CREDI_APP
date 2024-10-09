import Swal, { SweetAlertIcon } from "sweetalert2";
import { TypeToastEnum } from "../../types/IToast";
import { useEffect } from "react";
interface ToastProps {
  text: string;
  type: TypeToastEnum;
}

const mapTypeToTimerColor: Record<TypeToastEnum, string> = {
  [TypeToastEnum.Error]: "#f27474",
  [TypeToastEnum.Susccess]: "#a5dc86",
  [TypeToastEnum.Warning]: "#f8bb86",
  [TypeToastEnum.Info]: "#f8bb86",
  [TypeToastEnum.Question]: "#f8bb86",
};

const mapEnumToIcon: Record<TypeToastEnum, SweetAlertIcon> = {
  [TypeToastEnum.Error]: "error",
  [TypeToastEnum.Susccess]: "success",
  [TypeToastEnum.Warning]: "warning",
  [TypeToastEnum.Info]: "info",
  [TypeToastEnum.Question]: "question",
};

const ToastMsg: React.FC<ToastProps> = ({ text, type }) => {
  useEffect(() => {
    Swal.fire({
      icon: mapEnumToIcon[type],
      text,
      showConfirmButton: false,
      toast: true,
      animation: true,
      position: "top-end",
      timer: 5000,
      timerProgressBar: true,
      showCloseButton: true,
      closeButtonHtml: "&times;",
      didOpen: (toast) => {
        const progressBar = toast.querySelector(
          ".swal2-timer-progress-bar"
        ) as HTMLElement;
        if (progressBar) {
          progressBar.style.backgroundColor = mapTypeToTimerColor[type];
        }
      },
    });
  }, [text, type]);
  return null;
};
export default ToastMsg;
