import React, { FC } from "react";
import styles from "./Select.module.scss";
import cn from "classnames";

interface ISelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: Record<string, string>;
  label?: string;
}

export const Select: FC<ISelectProps> = ({
  placeholder,
  options,
  label,
  ...props
}) => {
  const selectElement = (
    <select {...props} className={cn(styles.select, props.className)}>
      {placeholder && (
        <option className={styles.option} disabled={true} value="">
          {placeholder}
        </option>
      )}
      {options &&
        Object.keys(options).map((key) => (
          <option key={key} value={key} className={styles.option}>
            {options[key]}
          </option>
        ))}
    </select>
  )

  if (!label) {
    return selectElement;
  }

  return (
    <div>
      <div>{label}</div>
      {selectElement}
    </div>
  )
};
