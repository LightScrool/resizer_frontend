import { FC } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import styles from "./Logo.module.scss";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link to='/' className={classnames(className, styles.Logo)}>
      Resizer
    </Link>
  );
};

export default Logo;
