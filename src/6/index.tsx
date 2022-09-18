import { useEffect, useState } from "react";
import Input from "../components/common/input/Input";
import List from "../components/common/list/List";
import Tabs from "../components/common/tabs/Tabs";
import { useDebounce } from "../handlers/useDebounce";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

// Style
import "./index.scss";
import TodoItem from "./todoItem/TodoItem";

// Components
/*
 * Create the components you need in the components folder.
 * You may find inspiration in task 4
 */

interface TodoItemInterface {
  id: string;
  value: string;
  checked: boolean;
}

// hello there I have to choose to work with antDesign lib to have the tabs component from there

const Task6: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [pending, setPending] = useState<TodoItemInterface[]>([]);
  const [done, setDone] = useState<TodoItemInterface[]>([]);
  const [deleted, setDeleted] = useState<TodoItemInterface[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchRes, setSearchRes] = useState<{
    list: string;
    result: TodoItemInterface[];
  }>({ list: "", result: [] });
  const [noSearchRes, setNoSearchRes] = useState(false);

  // I did use 500 because it is the determined number for good user accessability
  const debouncedSearchTerm: string = useDebounce<string>(inputValue, 500);

  const onPendingItemCheck = (event: CheckboxChangeEvent) => {
    let doneItem: TodoItemInterface;
    const pendings = pending.filter((item) => {
      if (item.id !== (event.target as HTMLInputElement).id) {
        return item;
      } else {
        doneItem = item;
      }
    });
    setPending(pendings);
    setDone((done) => [...done, { ...doneItem, checked: true }]);
  };

  const onDoneItemCheck = (event: CheckboxChangeEvent) => {
    let pendingItem: TodoItemInterface;
    const dones = done.filter((item) => {
      if (item.id !== (event.target as HTMLInputElement).id) {
        return item;
      } else {
        pendingItem = item;
      }
    });

    setDone(dones);
    setPending((done) => [...done, { ...pendingItem, checked: false }]);
  };

  const onDeleteClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    list: string
  ) => {
    let deletedItem: TodoItemInterface;
    switch (list) {
      case "pending":
        const pendings = pending.filter((item) => {
          if (item.id !== (event.target as HTMLInputElement).id) {
            return item;
          } else {
            deletedItem = item;
          }
        });

        setPending(pendings);
        break;

      case "done":
        const dones = done.filter((item) => {
          if (item.id !== (event.target as HTMLInputElement).id) {
            return item;
          } else {
            deletedItem = item;
          }
        });

        setDone(dones);
        break;

      default:
        break;
    }

    setSearchRes({
      list: "",
      result: [],
    });
    setDeleted((deleted) => (deletedItem ? [...deleted, deletedItem] : []));
  };
  const onDeleteFromDeleteListClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    setSearchRes({
      list: "",
      result: [],
    });
    const deletedArr = deleted.filter(
      (item) => item.id !== (event.target as HTMLInputElement).id
    );

    setDeleted(deletedArr);
  };

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue((event.target as HTMLInputElement).value);
  };

  const onEnter = (event: React.FormEvent<HTMLInputElement>) => {
    setNoSearchRes(false);
    setSearchRes({ list: "", result: [] });
    setPending((val) => [
      ...val,
      {
        value: (event.target as HTMLInputElement).value,
        checked: false,
        id: `${(event.target as HTMLInputElement).value}_${Math.random()}`,
      },
    ]);
  };

  const onTabClick = (
    activeKey: string,
    e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => {
    setActiveTab(activeKey);
  };

  const tabs = [
    {
      label: "Pending",
      key: "pending",
      children: noSearchRes ? (
        "No search result in pending items"
      ) : (
        <List
          id="pending-items-list"
          items={(searchRes.list === "pending" && searchRes.result.length
            ? searchRes.result
            : pending
          ).map((item, index) => (
            <TodoItem
              item={item}
              onItemCheck={onPendingItemCheck}
              onDeleteClick={(event) => onDeleteClick(event, "pending")}
              key={item.id}
            />
          ))}
        />
      ),
    },
    {
      label: "Done",
      key: "done",
      children: noSearchRes ? (
        "No search result in done items"
      ) : (
        <List
          id="done-items-list"
          items={(searchRes.list === "done" && searchRes.result.length
            ? searchRes.result
            : done
          ).map((item, index) => (
            <TodoItem
              item={item}
              onItemCheck={onDoneItemCheck}
              onDeleteClick={(event) => onDeleteClick(event, "done")}
              key={item.id}
            />
          ))}
        />
      ),
    },
    {
      label: "Deleted",
      key: "deleted",
      children: noSearchRes ? (
        "No search result in deleted items"
      ) : (
        <List
          id="deleted-items-list"
          items={(searchRes.list === "deleted" && searchRes.result.length
            ? searchRes.result
            : deleted
          ).map((item, index) => (
            <TodoItem
              item={item}
              onDeleteClick={onDeleteFromDeleteListClick}
              key={item.id}
              disabled
              todoItemClassName={"deleted"}
            />
          ))}
        />
      ),
    },
  ];

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        let searchArrRes: { list: string; result: TodoItemInterface[] } = {
          list: "",
          result: [],
        };

        let searchArr: TodoItemInterface[] = [];
        switch (activeTab) {
          case "pending":
            searchArrRes.list = "pending";
            searchArr = pending;
            break;

          case "done":
            searchArrRes.list = "done";
            searchArr = done;
            break;

          case "deleted":
            searchArrRes.list = "deleted";
            searchArr = deleted;
            break;

          default:
            break;
        }
        searchArr.forEach((val) => {
          if (val.value.toLocaleLowerCase().includes(debouncedSearchTerm)) {
            searchArrRes.result.push(val);
          }
        });
        setNoSearchRes(!searchArrRes.result.length);

        setSearchRes(searchArrRes);
      } else {
        setInputValue("");
        setSearchRes({ list: "", result: [] });
        setNoSearchRes(false);
      }
    },
    [debouncedSearchTerm] //  Only call effect if debounced search term changes
  );

  return (
    <div id="task-6">
      <Input
        inputId="todo-input"
        label="Enter New Item"
        value={inputValue}
        onInputChange={onInputChange}
        onPressEnter={onEnter}
      />
      <Tabs defaultActiveKey={activeTab} tabs={tabs} onTabClick={onTabClick} />
    </div>
  );
};

export default Task6;
