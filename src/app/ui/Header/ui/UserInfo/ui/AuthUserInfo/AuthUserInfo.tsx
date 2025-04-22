import { FC } from "react";
import styles from "./AuthUserInfo.module.scss";

import { UserData } from "../../../../../../../shared/api/types";
import { logout } from "../../../../../../../shared/lib/auth";

import logoutImg from "./assets/logout.svg";

const AuthUserInfo: FC<UserData> = ({ name, avatarUrl }) => {
  return (
    <div className={styles.AuthAccInfo}>
      <img className={styles.avatar} src={avatarUrl} />
      <span className={styles.nickname}>{name}</span>
      <img
        className={styles.logout}
        src={logoutImg}
        alt="Выйти"
        onClick={logout}
      />
    </div>
  );
};

export default AuthUserInfo;
