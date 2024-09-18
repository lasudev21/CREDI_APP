import { useEffect, useState } from "react";

interface CardProps {
  title: string;
  content: React.ReactNode;
  icons: React.ReactNode[];
  texts: React.ReactNode[];
}

const Card: React.FC<CardProps> = ({ title, content, icons, texts = [] }) => {
  const [divHeight, setDivHeight] = useState<number>(0);

  useEffect(() => {
    const handleSetIcons = () => {
      // setIcons(icons);
    };
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 117;
      setDivHeight(calculatedHeight);
    };

    handleResize();
    handleSetIcons();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{ height: `${divHeight}px` }}
      className="w-full bg-white rounded-t-lg shadow dark:bg-gray-800 dark:border-gray-700 border-l-2 border-sky-800"
    >
      <div className="flex justify-between items-center border-b p-2 text-sky-700">
        <div className="text-pretty font-bold">{title}</div>
        <div className="flex-2 gap-2 text-pretty text-black">
          {
            texts
          }
        </div>
        <div className="flex">
          {
            icons
          }
        </div>
      </div>
      <div className="">{content}</div>
    </div>
  );
};

export default Card;
