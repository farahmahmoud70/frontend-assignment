import { Tabs as AntdTabs } from "antd";

interface TabsProps {
  defaultActiveKey: string;
  tabs: { label: string; key: string; children: any }[];
  onTabClick?: (
    activeKey: string,
    e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => void;
}

const Tabs = ({ defaultActiveKey = "1", tabs, onTabClick }: TabsProps) => {
  return (
    <AntdTabs
      defaultActiveKey={defaultActiveKey}
      items={tabs}
      onTabClick={onTabClick}
    />
  );
};

export default Tabs;
