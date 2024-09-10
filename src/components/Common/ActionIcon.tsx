import { LucideIcon } from "lucide-react";
import React from "react";

interface IActionsIcons {
  IconComponent: LucideIcon;
  action: () => void;
}

const ActionIcon: React.FC<IActionsIcons> = ({
  IconComponent,
  action
}) => {
  return (
    <IconComponent
      size={20}
      className="h-6 w-6 hover:shadow-lg hover:bg-sky-50 transition-shadow duration-500 cursor-pointer "
      onClick={action}
    />
  );
};
export default ActionIcon;
