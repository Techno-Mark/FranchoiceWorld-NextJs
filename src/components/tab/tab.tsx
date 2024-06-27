import { useState, ReactNode } from "react";
import styles from "./tab.module.css";
interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  titleClassName?: string;
  contentClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  titleClassName,
  contentClassName,
}) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  return (
    <div className={`w-full`}>
      <div className={`flex space-x-12 tabTitle ${titleClassName}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 font-extrabold text-sm border-b-2 ${
              activeTab === tab.id
                ? `${styles.activeClass}`
                : "border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`mt-4 ${contentClassName}`}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? "block" : "hidden"}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
