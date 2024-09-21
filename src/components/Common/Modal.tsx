"use client";

import { X } from "lucide-react";
import { useDashboardStore } from "../../store/DashboardStore";

interface IModalProps {
  title: string;
  content: React.ReactNode;
  size: string;
}

const Modal: React.FC<IModalProps> = ({ title, content, size }) => {
  const { setOpenModal } = useDashboardStore();

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
        <div className={`bg-white w-full ${size} min-w-[300px] p-0 rounded-lg shadow-lg`}>
          <div className="flex justify-between items-center p-3">
            <h2 className="text-xl font-light">{title}</h2>
            <button
              onClick={() => setOpenModal(false)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <X
                width={20}
                onClick={() => setOpenModal(false)}
              />
            </button>
          </div>
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
