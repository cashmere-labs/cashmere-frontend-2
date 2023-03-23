import { VeCSMDesktopTable, VeCSMTitle } from "../../../components";
import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

import {
  VeCSMPhoneTable,
  VeCSMPhoneTitle,
} from "../../../components/VeCSM/PhoneTable/PhoneTable";

import { LockersDatas, MyLocksDatas } from "../datas";
import styles from "./Validators.module.scss";
import { useInjection } from 'inversify-react';
import VeCSMStore from '../../../store/VeCSMStore';
import { observer } from 'mobx-react-lite';

const Validators = observer(() => {
  const veCsmStore = useInjection(VeCSMStore);
  const whichValidator = veCsmStore.isActive;
  const validatorCount = veCsmStore.validatorCount;
  const isPhoneOrLaptop = useMediaQuery({
    query: "(max-width: 950px)",
  });
  //const network = useNetwork();
  const filteredData = useMemo(() => {
    if (whichValidator) {
      return MyLocksDatas;
      //return MyLocksDatas.filter((item) => item.network === network);
    } else {
      return LockersDatas;
      //return LockersDatas.filter((item) => item.network === network);
    }
  }, [whichValidator]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboard}>
        {isPhoneOrLaptop ? (
          <VeCSMPhoneTitle whichLockers={whichValidator} />
        ) : (
          <VeCSMTitle whichLockers={whichValidator} />
        )}
        {isPhoneOrLaptop ? (
          <VeCSMPhoneTable
            whichLocker={whichValidator}
            datas={filteredData}
            bodyCount={validatorCount}
          />
        ) : (
          <VeCSMDesktopTable
            whichValidator={whichValidator}
            validatorCount={validatorCount}
            datas={filteredData}
          />
        )}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
});

export { Validators };
