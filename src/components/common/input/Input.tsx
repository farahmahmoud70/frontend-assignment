import React from "react";
import { Input as AntdInput } from "antd";
import "./input.scss";

interface InputProps {
  value: any;
  label: string;
  inputId: string;
  isVertical?: boolean;
  inputContainerClassName?: string;
  inputLabelClassName?: string;
  inputClassName?: string;
  // in the onInputChange I passed to entire event because sometimes we need extra intro not just the value
  onInputChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  onPressEnter?: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({
  value,
  label,
  inputId,
  isVertical = false,
  inputContainerClassName = "",
  inputLabelClassName = "",
  inputClassName = "",
  onInputChange,
  onPressEnter,
}: InputProps) => {
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    onInputChange && onInputChange(event);
  };

  const onEnter = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    onPressEnter && onPressEnter(event);
  };
  // fist I created the component with the native input but when I used Antd I did use ant input

  return (
    <div
      className={`input-container ${
        isVertical ? "input-container--vertical" : ""
      } ${inputContainerClassName}`}
    >
      <label htmlFor={inputId} className={`${inputLabelClassName}`}>
        {label}{" "}
      </label>

      <AntdInput
        onChange={onChange}
        onPressEnter={onEnter}
        id={inputId}
        value={value}
        className={`${inputClassName}`}
      />
      {/* <input
        onChange={onChange}
        id={inputId}
        value={value}
        className={`${inputClassName}`}
      /> */}
    </div>
  );
};

export default Input;
