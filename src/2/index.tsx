import React from "react";
import { FunctionComponent, useState } from "react";
import Input from "../components/common/input/Input";

const Task2: FunctionComponent = () => {
  const [value, setValue] = useState("");

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <div>
      <form>
        <Input
          label="Controlled Input: "
          inputId="controlled-input"
          onInputChange={onInputChange}
          value={value}
        />
      </form>
      <br />
      <br />
      <p>{value}</p>
    </div>
  );
};

export default Task2;
