import React, {FC} from "react";
import cn from "classnames";
import styles from "./Input.module.scss";

type TBase = React.InputHTMLAttributes<HTMLTextAreaElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

interface IInputProps extends TBase {
  rows?: number;
  label?: string;
}

export const Input: FC<IInputProps> = ({label, ...props}) => {
  const rows = props?.rows || 1;

  const inputElement = rows === 1 ? (
    <input maxLength={255} {...props} className={cn(styles.input, props.className)}/>
  ) : (
    <textarea maxLength={255}  {...props} className={cn(styles.input, props.className)}/>
  );

  if (!label) {
    return inputElement;
  }

  return (
    <div>
      <div>{label}</div>
      {inputElement}
    </div>
  )
};
