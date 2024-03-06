import { InputNumber } from "antd";
import inputPinStyles from "./inputPin.module.css";

export default function inputPin() {
  const inputBoxTotal = [1, 2, 3, 4, 5, 6]; //print 6 box

  return (
    <div>
      {inputBoxTotal.map((v, index) => (
        <InputNumber
          key={index}
          // controls={false}
          placeholder={"-"}
          min={1}
          max={1}
          className={`mr-2 ${inputPinStyles.container}`}
          //   style={{ display: "none" }}
        />
      ))}
    </div>
  );
}
