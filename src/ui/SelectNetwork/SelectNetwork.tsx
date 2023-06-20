import { useOnClickOutside, usePopper } from "../../hooks";
import {
  CSSProperties,
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Icon } from "../../ui";
import { NetworkBadge } from "../../ui/NetworkBadge/NetworkBadge";

import styles from "./SelectNetwork.module.scss";
import { activeChains, Chain } from '../../constants/chains';
import { useNetwork, useSwitchNetwork } from 'wagmi';

export interface SelectNetworkProps extends ComponentPropsWithoutRef<"div"> {
  size?: number;
  className?: string;
  style?: CSSProperties;
  fontSize?: string;
}

const SelectNetwork = (props: SelectNetworkProps) => {
  const { chain: currentNetwork } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const [expand, setExpand] = useState(false);
  const { reference, floating, popperStyles } = usePopper({
    placement: "bottom-start",
    topDistance: 4,
  });

  const wrapperRef = useOnClickOutside<HTMLDivElement>(() => {
    setExpand(false);
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!optionRef.current || !containerRef.current) return;
    optionRef.current.style.minWidth = `${containerRef.current.offsetWidth}px`;
  }, [expand, optionRef]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div onClick={() => setExpand(!expand)} ref={reference}>
        <div ref={containerRef}>
          <NetworkBadge
            hoverable
            size={28}
            className={styles.badge}
            chain={currentNetwork as Chain}
            {...props}
          />
          <Icon size={16} className={styles.chevron} style={{ color: (currentNetwork as Chain)?.badgeColors.text }}>
            {expand ? <FaChevronUp /> : <FaChevronDown />}
          </Icon>
        </div>
      </div>
      {expand && (
        <div className={styles.menu} style={{ ...popperStyles }} ref={floating}>
          {activeChains.map((item, key) => (
            <div
              key={key}
              onClick={async () => {
                setExpand(false);
                await switchNetworkAsync?.(item.id);
              }}
              ref={optionRef}
              className={styles.option}
            >
              <div className={styles.optionInner}>
                <NetworkBadge chain={item} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { SelectNetwork };
