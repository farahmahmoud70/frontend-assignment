import { FunctionComponent, useState } from "react";
import List from "../components/common/list/List";

const Task1: FunctionComponent = () => {
  const [items] = useState(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);

  return (
    <div>
      <List items={items} id={"task-1-list"} />
    </div>
  );
};

export default Task1;
