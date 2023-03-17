import { VeCSMDesktopTable, VeCSMTitle } from "../../../components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useTypedSelector } from "../../../store";

import {
  VeCSMPhoneTable,
  VeCSMPhoneTitle,
} from "../../../components/VeCSM/PhoneTable/PhoneTable";

import { LockersDatas, MyLocksDatas } from "../datas";
import styles from "./Validators.module.scss";

const Validators = () => {
  const whichValidator = useTypedSelector((state) => state.veCSM.isActive);
  const validatorCount = useSelector(
    (state: any) => state.veCSM.validatorCount,
  );
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
};

export { Validators };
