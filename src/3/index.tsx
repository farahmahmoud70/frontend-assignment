import { FunctionComponent, useState } from "react";
import Inputs from "../components/common/input/Input";
import { useDebounce } from "../handlers/useDebounce";
import { useEffect } from "react";
import List from "../components/common/list/List";

const Task3: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchRes, setSearchRes] = useState<Array<string>>([]);
  const [noSearchRes, setNoSearchRes] = useState(false);
  const [items] = useState(["Dogs", "Cats", "Dinosaurs", "Otters", "Panda"]);

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  // I did use 500 because it is the determined number for good user accessability
  const debouncedSearchTerm: string = useDebounce<string>(inputValue, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        let searchArrRes: Array<string> = [];

        items.forEach((val) => {
          // this condition will not respect case sensitivity and will check if the input included in the value in the items
          // In general it depends on the business that we should take care of case sensitivity or the search with exact word or not

          if (val.toLocaleLowerCase().includes(debouncedSearchTerm)) {
            searchArrRes.push(val);
          }
        });
        setNoSearchRes(!searchArrRes.length);

        setSearchRes(searchArrRes);
      } else {
        setInputValue("");
        setSearchRes([]);
        setNoSearchRes(false);
      }
    },
    [debouncedSearchTerm] //  Only call effect if debounced search term changes
  );

  return (
    <div>
      <form>
        <Inputs
          label="Search Input: "
          inputId="search-controlled-input"
          onInputChange={onInputChange}
          value={inputValue}
        />
      </form>
      <br />
      {noSearchRes ? (
        "Sorry! No search results were found."
      ) : (
        <>
          {searchRes.length ? "Search Result" : "Data"}
          <br />
          <List items={searchRes.length ? searchRes : items} id={"task-3-list"}/>
        </>
      )}
    </div>
  );
};

export default Task3;
