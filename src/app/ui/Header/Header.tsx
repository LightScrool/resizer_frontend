import styles from "./Header.module.scss";
import Logo from "./ui/Logo/Logo";
import UserInfo from "./ui/UserInfo/UserInfo";
import Container from "../../../shared/ui/Container/Container";

const Header = () => {
  return (
    <header className={styles.Header}>
      <Container>
        <div className={styles.inner}>
          <Logo />
          <UserInfo />
        </div>
      </Container>
    </header>
  );
};

export default Header;
