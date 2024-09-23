import { Dispatch, SetStateAction } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="w-full">
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 font-semibold text-sm flex-1 text-center ${
              activeTab === index
                ? "border-t-2 border-blue-500 text-blue-500 rounded-t-md"
                : "text-gray-500 bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
