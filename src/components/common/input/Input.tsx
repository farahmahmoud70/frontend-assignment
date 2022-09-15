import React from "react";
import './input.scss'

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
}

const Inputs = ({
  value,
  label,
  inputId,
  isVertical = false,
  inputContainerClassName = "",
  inputLabelClassName = "",
  inputClassName = "",
  onInputChange,
}: InputProps) => {
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    onInputChange && onInputChange(event);
  };

  return (
    <div
      className={`input-container ${
        isVertical ? "input-container--vertical" : ""
      } ${inputContainerClassName}`}
    >
      <label htmlFor={inputId} className={`${inputLabelClassName}`}>
        {label}{" "}
      </label>
      <input
        onChange={onChange}
        id={inputId}
        value={value}
        className={`${inputClassName}`}
      />
    </div>
  );
};

export default Inputs;
