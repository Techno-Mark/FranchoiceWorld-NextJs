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
  dark?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  titleClassName,
  contentClassName,
  dark,
}) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  return (
    <div className={`w-full`}>
      <div className={`flex gap-6 md:gap-12 tabTitle ${titleClassName}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 font-extrabold text-sm border-b-2 ${
              activeTab === tab.id
                ? `${styles.activeClass}`
                : "border-transparent"
            } ${dark && `!text-white ${styles.darkActive}`}`}
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
