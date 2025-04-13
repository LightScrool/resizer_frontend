import React, { FC } from "react";
import styles from "./Logo.module.scss";
import classnames from "classnames";
// import {Link} from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <a className={classnames(className, styles.Logo)} href='/'>
      Resizer
    </a>
  );
};

export default Logo;
