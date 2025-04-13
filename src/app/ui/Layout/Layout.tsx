import React, { PropsWithChildren } from "react";

import Header from "../Header/Header";
import Container from "../../../shared/ui/Container/Container";

import styles from "./Layout.module.scss";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.app}>
      <Header />
      <div className={styles.contentWrapper}>
        <Container>
          {children}
        </Container>
      </div>
    </main>
  );
};

export default Layout;
