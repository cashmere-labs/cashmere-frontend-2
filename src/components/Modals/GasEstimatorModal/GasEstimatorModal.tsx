import { ModalController } from "../../../hooks/useModal";
import { ReactNode, useMemo } from "react";
import { Network } from "../../../types/network";
import { Modal, NetworkBadge } from "../../../ui";
import { v4 as uuid } from "uuid";

import styles from "./GasEstimatorModal.module.scss";

export type EstimateMapping = Map<
  Network,
  Map<
    Network,
    {
      native?: string;
      usd?: string;
    }
  >
>;

type GasEstimatorModalProps = {
  modalController: ModalController;
  estimates: EstimateMapping;
};

const GasEstimatorModal = ({
  modalController,
  estimates,
}: GasEstimatorModalProps) => {
  const headers = useMemo(() => {
    const _headers = [];
    estimates.forEach((_, key) => {
      _headers.push(key.name);
    });
    _headers.unshift("From/To");
    return _headers;
  }, [estimates]);

  const estimatedItems = useMemo(() => {
    const _estimatedItems: ReactNode[] = [];

    //Iterate each network
    estimates.forEach((item, key) => {
      const elements: ReactNode[] = [];

      //Iterate each entry in estimates
      item.forEach((el, key) => {
        elements.push(
          <td key={uuid()} className={styles.bodyCell}>
            <div className={styles.bodyCellInner}>
              <span className={styles.usd}>{el.usd}</span>
              <span className={styles.native}>{el.native}</span>
            </div>
          </td>,
        );
      });
      _estimatedItems.push(
        <tr key={uuid()}>
          <>
            <td className={styles.bodyCell}>
              <div className={styles.bodyCellInner}>
                <NetworkBadge
                  className={styles.tableNetwork}
                  label={key.type}
                />
              </div>
            </td>
            {elements}
          </>
        </tr>,
      );
    });
    return _estimatedItems;
  }, [estimates]);

  return (
    <Modal
      width="1200px"
      paddingTop="1.5rem"
      close={modalController.close}
      isOpen={modalController.isOpen}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Transfer Gas Estimator</h2>
        <p className={styles.subtitle}>
          This table provides an average gas fee estimation for transfer between
          networks. Values may flucture due to network traffic or congestion.
        </p>
      </div>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              {headers.map((item, index) => (
                <th className={styles.headerCell} key={index}>
                  <div>
                    <span className={styles.headerItem}>{item}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{estimatedItems}</tbody>
        </table>
      </div>
    </Modal>
  );
};

export { GasEstimatorModal };
