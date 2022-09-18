// Style
import { FunctionComponent, useState } from "react";
import Input from "../components/common/input/Input";
import "./index.scss";

// Please Note that in this component I'm not simulating anything and not validating the input it's a happy scenario with it's UI

const Task5: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // If you want to do something with form submit
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="task-5" className="login-container">
      <div className="login-container__form">
        <form onSubmit={onSubmit}>
          <Input
            label="Email"
            inputId="email-input"
            onInputChange={(event) => setEmail(event.currentTarget.value)}
            value={email}
            isVertical={true}
            inputContainerClassName={"login-container__input-container"}
            inputClassName={"login-container__input"}
            inputLabelClassName={"login-container__label"}
          />

          <Input
            label="Password"
            inputId="password-input"
            onInputChange={(event) => setPassword(event.currentTarget.value)}
            value={password}
            isVertical={true}
            inputContainerClassName={"login-container__input-container"}
            inputClassName={"login-container__input"}
            inputLabelClassName={"login-container__label"}
          />
          <button className={"login-container__login-btn"}>Login</button>
        </form>
      </div>
      <div className="login-container__result">
        {submitted ? (
          <>
            <div>{"You have entered Email and Password"}</div>
            <div>{email}</div>
          </>
        ) : (
          <div>{"You haven't submitted anything yet"}</div>
        )}
      </div>
    </div>
  );
};

export default Task5;
