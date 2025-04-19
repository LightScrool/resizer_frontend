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
  preset?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  subtext,
  disabled,
  className,
  type,
  preset = 'primary',
  isLoading = false,
  ...props
}) => {
  const combineClasses = classnames(styles.Button, className, {
    [styles.disabled]: disabled,
    [styles.withSubtext]: subtext,
    [styles.secondary]: preset === 'secondary',
    [styles.danger]: preset === 'danger',
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
