import { FC } from "react";

import AuthUserInfo from "./ui/AuthUserInfo/AuthUserInfo";
import LoginButton from "./ui/LoginButton/LoginButton";
import { useAuthData } from "../../../../../shared/lib/auth";
import { Loader } from "../../../../../shared/ui/Loader/Loader";


const UserInfo: FC = () => {
  const { isAuth, isLoading, userData } = useAuthData();

  if (isAuth) {
      return <AuthUserInfo {...userData} />
  }

  if (isLoading) {
      return <Loader size="s"/>
  }

  return <LoginButton />
};

export default UserInfo;
