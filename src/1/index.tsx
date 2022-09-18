import { FunctionComponent, useState } from "react";
import List from "../components/common/list/List";
import ListItem from "../components/common/listItem/ListItem";

const Task1: FunctionComponent = () => {
  const [items] = useState(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);

  return (
    <div>
      <List
        items={items.map((item, index) => (
          <ListItem id={`list-item-${index}`} item={item} />
        ))}
        id={"task-1-list"}
      />
    </div>
  );
};

export default Task1;
