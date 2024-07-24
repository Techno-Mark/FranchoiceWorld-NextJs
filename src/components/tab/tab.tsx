import styles from "./tab.module.css";

interface Tab {
  id: number;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (id: number) => void;
  titleClassName?: string;
  contentClassName?: string;
  mainClassName?: string;
  dark?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  titleClassName,
  contentClassName,
  mainClassName,
  dark,
}) => {
  return (
    <div className={mainClassName}>
      <div className={`flex gap-6 md:gap-20 tabTitle ${titleClassName}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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
    </div>
  );
};

export default Tabs;
