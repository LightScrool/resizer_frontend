import { FC, ReactNode } from "react";
import cn from 'classnames';
import styles from "./CenterPageText.module.scss";

interface CenterPageTextProps {
  children: ReactNode;
  maxHeight?: number;
  size?: 'm' | 'l';
}

const CenterPageText: FC<CenterPageTextProps> = ({ children, maxHeight, size='l' }) => {
  return (
    <div 
      className={cn(styles.main, styles[`main_${size}`])}
      style={{maxHeight}}
    >
      {children}
    </div>
  )
};

export default CenterPageText;
