import * as Icons from "@mui/icons-material";

interface IconRendererProps {
  iconName: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ iconName }) => {
  const IconComponent = Icons[iconName as keyof typeof Icons];

  if (!IconComponent) {
    return <span>N</span>;
  }

  return <IconComponent />;
};

export default IconRenderer;
