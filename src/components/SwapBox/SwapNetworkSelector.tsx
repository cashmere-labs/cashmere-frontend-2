import { ModalController } from "../../hooks/useModal";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Token } from "../../types/token";
import { Icon, Input } from "../../ui";

import styles from "./SwapBox.module.scss";
import { ethers } from "ethers";
import { ERC20 } from "ethylene/constants/abi";
import { Chain } from '../../constants/chains';

type SwapNetworkSelectorProps = {
  modalController: ModalController;
  onSelect?: (item: Chain | Token) => void;
  options:
    | { data: Token[]; type: "token"; network: Chain }
    | { data: Chain[]; type: "network"; network?: never };
};

const selectorShowKeyframes = [
  { transform: "translateY(120%)" },
  { transform: "translateY(0%)" },
];

const selectorShowSettings = {
  duration: 200,
  iterations: 1,
};

const SwapNetworkSelector = ({
  modalController,
  onSelect,
  options,
}: SwapNetworkSelectorProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!boxRef.current) return;
    if (modalController.isOpen) {
      inputRef.current?.focus();
      boxRef.current.animate(selectorShowKeyframes, selectorShowSettings);
      boxRef.current.style.transform = "translateY(0%)";
    } else {
      setText("");
      boxRef.current.style.transform = "translateY(120%)";
    }
  }, [modalController.isOpen]);

  const filteredOptions = useMemo(() => {
    if (options.type === "network") {
      return options.data.filter(
        (item: Chain) =>
          item.name.toUpperCase().includes(text.toUpperCase()),
      );
    } else {
      return options.data.filter(
        (item: Token) =>
          item.name.toUpperCase().includes(text.toUpperCase())
            || item.address.toUpperCase().includes(text.toUpperCase())
      );
    }
  }, [options, text]);

  const [ dynamicToken, setDynamicToken ] = useState<Token>();
  const [ dynamicTokenLoading, setDynamicTokenLoading ] = useState<boolean>(false);
  useEffect(() => {
    setDynamicToken(undefined);
    if (options.type === "token" && ethers.utils.isAddress(text)) {
      setDynamicTokenLoading(true);
      const address = ethers.utils.getAddress(text);
      const tokenContract = new ethers.Contract(
          address,
          ERC20,
          new ethers.providers.JsonRpcProvider(options.network.rpcUrls.default.http[0]),
      );
      Promise.all([
          tokenContract.name(),
          tokenContract.symbol(),
          tokenContract.decimals(),
      ]).then(([ name, symbol, decimals ]) => {
        setDynamicToken(new Token({
          address,
          asset: address,
          decimals,
          iconUrl: "",
          name,
          symbol,
          type: "",
        }));
      }).catch(() => {
        console.log("not erc20?");
      }).finally(() => {
        setDynamicTokenLoading(false);
      });
    }
  }, [filteredOptions, options.network?.rpcUrls, options.type, text]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div ref={boxRef} className={styles.networkSelector}>
      <div className={styles.top}>
        <Icon
          hoverable
          onClick={modalController.close}
          className={styles.close}
          borderRadius="50%"
        >
          <IoMdClose />
        </Icon>
        <span style={{ color: "var(--text)" }} className={styles.title}>
          Select {options.type === "network" ? "Network" : "Token"}
        </span>
        <div className={styles.search}>
          <Input
            inputRef={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Search ${
              options.type === "network" ? "Network" : "Token"
            }`}
          />
        </div>
      </div>

      <div>
        <div className={styles.options}>
          {dynamicToken && (
              <div
                  onClick={() => {
                    options.network?.tokenList.push(dynamicToken);
                    modalController.close();
                    onSelect?.(dynamicToken);
                  }}
                  className={styles.option}
              >
                <img src={""} />
                <span>{dynamicToken.name}</span>
              </div>
          )}
          {filteredOptions.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                modalController.close();
                onSelect?.(item);
              }}
              className={styles.option}
            >
              <img src={item.iconUrl} />
              <span>{item.name}</span>
            </div>
          ))}
          {dynamicTokenLoading && (
            <div
              className={styles.option}
            >
              <img src={""} />
              <span>Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { SwapNetworkSelector };
