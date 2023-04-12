import {
  FaDiscord,
  FaGithub,
  FaMediumM,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { Icon } from "../../ui";
import { clsnm } from "../../utils/clsnm";

import styles from "./Footer.module.scss";

const Footer = () => {
  const footerLinks = [
    {
      name: "Contact",
      url: "mailto:contact@cashmere.exchange",
    },
    {
      name: "Whitepaper",
      url: "https://www.dropbox.com/s/9wphe0hp4t00qn6/cashmere_wp.pdf?dl=0",
    },
    {
      name: "Developers",
      url: "https://docs.cashmere.exchange",
    },
    {
      name: "Terms",
      url: "#",
    },
  ];

  const footerSocial = [
    {
      name: "Twitter",
      url: "https://twitter.com/cashmerelabs",
      icon: <FaTwitter />,
    },
    {
      name: "Telegram",
      url: "https://t.me/cashmerelabs",
      icon: <FaTelegram />,
    },
    {
      name: "Discord",
      url: "https://discord.com/invite/dherf6VbRX",
      icon: <FaDiscord />,
    },
    {
      name: "Medium",
      url: "https://cashmerelabs.medium.com/",
      icon: <FaMediumM />,
    },
    {
      name: "Github",
      url: "https://github.com/cashmere-labs",
      icon: <FaGithub />,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.links}>
          {footerLinks.map((item) => {
            return (
              <div key={item.name} className={styles.linkWrapper}>
                <a className={clsnm(styles.link, "link")} href={item.url} target='_blank' rel='noreferrer'>
                  {item.name}
                </a>
              </div>
            );
          })}
        </div>
        <div className={styles.links}>
          {footerSocial.map((item) => {
            return (
              <div
                key={item.name}
                className={clsnm(styles.linkWrapper, styles.social)}
              >
                <a className={clsnm(styles.icon, "link")} href={item.url} target='_blank' rel='noreferrer'>
                  <Icon>{item.icon}</Icon>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export { Footer };
