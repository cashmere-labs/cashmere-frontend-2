import { CSSProperties, ComponentPropsWithoutRef, useRef } from "react";
import { clsnm } from "../../utils/clsnm";
import QUESTIONMARK from '../../assets/images/networks/question.png';

import styles from "./NetworkBadge.module.scss";
import { BadgeColors, Chain } from '../../constants/chains';

export interface NetworkBadgeProps extends ComponentPropsWithoutRef<"div"> {
  chain?: Chain;
  size?: number;
  className?: string;
  style?: CSSProperties;
  fontSize?: string;
  hoverable?: boolean;
}

const NetworkBadge = ({
  chain,
  size = 30,
  style = {},
  className,
  fontSize,
  hoverable = false,
  ...props
}: NetworkBadgeProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const icon = chain?.iconUrl || QUESTIONMARK;
  const badgeColors: BadgeColors = chain?.badgeColors || {
    bg: "#d6f4ff",
    hoverBg: "#cff2ff",
    text: "#2c374b",
  };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => {
        if (!hoverable) return;
        const el = wrapperRef.current;
        if (el != null) {
          el.style.background = badgeColors.bg;
        }
      }}
      onMouseLeave={() => {
        if (!hoverable) return;
        const el = wrapperRef.current;
        if (el != null) {
          el.style.background = badgeColors.bg;
        }
      }}
      style={{ background: badgeColors.bg, ...style }}
      className={clsnm(styles.wrapper, className)}
      {...props}
    >
      <div
        style={{ height: `${size}px`, width: `${size}px` }}
        className={styles.iconWrapper}
      >
        <img className={styles.icon} src={icon} />
      </div>
      <span
        className={styles.text}
        style={{ color: chain?.badgeColors.text, fontSize: fontSize ?? "16px" }}
      >
        {chain?.name || 'Unknown'}
      </span>
    </div>
  );
};

export { NetworkBadge };
