import BlackLogo from '../../assets/images/logos/black.svg';
import WhiteLogo from '../../assets/images/logos/white.svg';
import { Link } from "react-router-dom";
import { clsnm } from "../../utils/clsnm";

import styles from "./Logo.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../store/ThemeStore';
import { observer } from 'mobx-react-lite';

const Logo = observer(({
  disableLink = false,
  hideLabel = false,
}: {
  disableLink?: boolean;
  hideLabel?: boolean;
}) => {
    const themeStore = useInjection(ThemeStore);

  return (
    <div className={styles.logoWrapper}>
      <Link
        className={clsnm("link", disableLink && styles.disabled)}
        to={disableLink ? "#" : "/"}
      >
        <img alt="logo" src={themeStore.theme === "dark" ? WhiteLogo : BlackLogo} />
        {!hideLabel && <span>Cashmere</span>}
      </Link>
    </div>
  );
});

export { Logo };
