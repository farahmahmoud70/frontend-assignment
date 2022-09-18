import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
interface CheckItemListProps {
  item: string;
  id: string;
  checked: boolean;
  disabled?: boolean;
  onCheck?: (event: CheckboxChangeEvent) => void;
}

const CheckItemList: React.FC<CheckItemListProps> = ({
  item,
  checked,
  id,
  disabled=false,
  onCheck,
}: CheckItemListProps) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onCheck}
      id={id}
      key={id}
      disabled={disabled}
    >
      {item}
    </Checkbox>
  );
};

export default CheckItemList;
