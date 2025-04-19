import React, { FC } from "react";
import styles from "./Button.module.scss";
import classnames from "classnames";
import { Loader } from "../Loader/Loader";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  subtext?: string;
  danger?: boolean;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  subtext,
  disabled,
  className,
  type,
  danger = false,
  isLoading = false,
  ...props
}) => {
  const combineClasses = classnames(styles.Button, className, {
    [styles.disabled]: disabled,
    [styles.withSubtext]: subtext,
    [styles.danger]: danger,
  });

  const content = subtext ? (
      <div className={styles.textWrapper}>
        <div>{children}</div>
        <div className={styles.subtext}>{subtext}</div>
      </div>
  ) : (
    children
  )

  let childElement;
  if (isLoading) {
    childElement = (
      <div className={styles.loaderWrapper}>
        <Loader className={styles.loader} size="s" />
        <div className={styles.invisible}>
          {content}
        </div>
      </div>
    )
  } else {
    childElement = content
  }

  return (
    <button
      disabled={!!disabled}
      type={type}
      className={combineClasses}
      {...props}
    >
      {childElement}
    </button>
  );
};

export default Button;
