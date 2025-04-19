import React, { FC, ReactNode } from "react";
import styles from "./CenterPageText.module.scss";

interface CenterPageTextProps {
  children: ReactNode;
  maxHeight?: number;
}

const CenterPageText: FC<CenterPageTextProps> = ({ children, maxHeight }) => {
  return <div 
      className={styles.main}
      style={{maxHeight}}
    >
      {children}
      </div>;
};

export default CenterPageText;
