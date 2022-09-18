import CheckItemList from "../../components/common/checkItemList/CheckItemList";
import { ReactComponent as DeleteIcon } from "../../style/images/delete.svg";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import "./TodoItem.scss";

interface TodoItemProps {
  item: { value: string; checked: boolean; id: string };
  todoItemClassName?: string;
  disabled?: boolean;
  onItemCheck?: (event: CheckboxChangeEvent) => void;
  onDeleteClick: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}
const TodoItem = ({
  item,
  todoItemClassName,
  disabled,
  onItemCheck,
  onDeleteClick,
}: TodoItemProps) => {
  return (
    <div className={`todo-item ${todoItemClassName}`}>
      <CheckItemList
        item={item.value}
        checked={item.checked}
        id={item.id}
        onCheck={onItemCheck}
        disabled={disabled}
      />
      <DeleteIcon
        className="todo-item__delete"
        onClick={onDeleteClick}
        id={item.id}
      />
    </div>
  );
};

export default TodoItem;
