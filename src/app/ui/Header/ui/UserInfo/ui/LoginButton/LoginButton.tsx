import React, { FC } from "react";

import Button from "../../../../../../../shared/ui/Button/Button";
import { login } from "../../../../../../../shared/lib/auth";

const LoginButton: FC = () => {
  return (
    <Button onClick={login}>
      Войти
    </Button>
  );
};

export default LoginButton;
