import React, { CSSProperties, FC } from "react";
import cn from "classnames";
import styles from "./Loader.module.scss";

const SIZES_PX_DICT = {
  s: 25,
  m: 55,
  l: 80,
} as const;

interface ILoaderProps {
  size: keyof typeof SIZES_PX_DICT;
  className?: string;
}

export const Loader: FC<ILoaderProps> = ({ className, size }) => {
  const sizePx = `${SIZES_PX_DICT[size]}px`;

  return (
    <div 
      style={{'--loader-size-px': sizePx} as CSSProperties}
      className={cn(styles.Loader, className)}
    />
  );
};
