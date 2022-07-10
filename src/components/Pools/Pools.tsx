import styles from "./Pools.module.scss";
import { useModal, useTheme } from "hooks";
import { clsnm } from "utils/clsnm";
import { Button } from "ui";
import { useEffect, useState } from "react";
import { PersonalData, GlobalData } from "./datas";
import INFOBLACK from "../../assets/pool/info-black.png";
import INFOWHITE from "../../assets/pool/info-white.png";
import { useMediaQuery } from "react-responsive";
import { GrDown } from "react-icons/gr";
import DOWNBLACK from "../../assets/pool/down-icon-black.png";
import DOWNWHITE from "../../assets/pool/down-icon-white.png";

interface Pools {
  whichPool?: boolean;
  bodyCount: number;
  setBodyCount: any;
}

const Pools = ({ whichPool, bodyCount, setBodyCount }: Pools) => {
  const isPhoneOrLaptop = useMediaQuery({
    query: "(max-width: 850px)",
  });
  const { theme } = useTheme();
  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboard}>
        {isPhoneOrLaptop ? <PhoneTitle /> : <DesktopTitle />}
        {isPhoneOrLaptop ? (
          <PhoneTable whichPool={whichPool} bodyCount={bodyCount} />
        ) : (
          <DesktopTable whichPool={whichPool} bodyCount={bodyCount} />
        )}
      </div>
      <div className={styles.footer}>
        The base emission rate is currently 1.5 CSM per second.
      </div>
      {whichPool
        ? PersonalData.length > bodyCount && (
            <div className={styles.more}>
              <Button
                height="40px"
                width="156px"
                onClick={() => setBodyCount(bodyCount + 10)}
                color={theme === "light" ? "black" : "neutral"}
                className={clsnm(
                  styles.moreButton,
                  theme === "light" ? styles.white : styles.black
                )}
              >
                more
              </Button>{" "}
            </div>
          )
        : GlobalData.length > bodyCount && (
            <div className={styles.more}>
              <Button
                height="40px"
                width="156px"
                fontSize="fs16"
                onClick={() => setBodyCount(bodyCount + 10)}
                color={theme === "light" ? "black" : "neutral"}
                className={clsnm(
                  styles.moreButton,
                  theme === "light" ? styles.white : styles.black
                )}
              >
                more
              </Button>
            </div>
          )}
    </div>
  );
};

interface Table {
  whichPool?: boolean;
  bodyCount: number;
}

const DesktopTitle = () => {
  return (
    <div className={styles.tableTitle}>
      <div className={styles.title1}>Name</div>
      <div className={styles.title2}>Network</div>
      <div className={styles.title3}>Liquidity</div>
      <div className={styles.title4}>Volume (24h)</div>
      <div className={styles.title5}>VEAPR</div>
      <div className={styles.title6}>My Total APR</div>
    </div>
  );
};

const DesktopTable = ({ whichPool, bodyCount }: Table) => {
  const { theme } = useTheme();
  return (
    <>
      {whichPool
        ? PersonalData.map((data, i) => {
            return (
              <div className={styles.tableBody}>
                <div className={styles.line}></div>
                <div className={styles.datas}>
                  <div className={styles.data1}>
                    <span className={styles.logoAndName}>
                      {data.logo && (
                        <img
                          style={{ width: "25px", marginRight: "14.5px" }}
                          src={data.logo}
                        ></img>
                      )}
                      <span>{data.name}</span>
                    </span>
                    <span className={styles.cRatio}>
                      Compensation Ratio: %154.89 <span>i</span>
                    </span>
                  </div>
                  <div className={styles.data2}>{data.network}</div>
                  <div className={styles.data3}>%{data.liquidity}</div>
                  <div className={styles.data4}>%{data.volume}</div>
                  <div className={styles.data5}>{data.veapr}%</div>
                  <div className={styles.data6}>{data.myTotalApr}%</div>
                </div>
              </div>
            );
          })
        : GlobalData.map((data, i) => {
            if (i < bodyCount) {
              return (
                <div className={styles.tableBody}>
                  <div className={styles.line}></div>
                  <div className={styles.datas}>
                    <div className={styles.data1}>
                      <span className={styles.logoAndName}>
                        {data.logo && (
                          <img
                            style={{ width: "25px", marginRight: "14.5px" }}
                            src={data.logo}
                          ></img>
                        )}
                        <span>{data.name}</span>
                      </span>
                      <span className={styles.cRatio}>
                        <span>Compensation Ratio: %154.89</span>
                        &nbsp;
                        <img
                          src={theme === "light" ? INFOBLACK : INFOWHITE}
                          className={styles.info}
                        ></img>
                      </span>
                    </div>
                    <div className={styles.data2}>{data.network}</div>
                    <div className={styles.data3}>%{data.liquidity}</div>
                    <div className={styles.data4}>%{data.volume}</div>
                    <div className={styles.data5}>{data.veapr}%</div>
                    <div className={styles.data6}>{data.myTotalApr}%</div>
                  </div>
                </div>
              );
            }
          })}
    </>
  );
};

const PhoneTitle = () => {
  return (
    <div className={styles.tableTitle}>
      <div className={styles.title1}>Name</div>
    </div>
  );
};

const PhoneTable = ({ whichPool, bodyCount }: Table) => {
  const [bodyOpenGlobal, setBodyOpenGlobal] = useState<{
    [key: number]: boolean;
  }>({});
  const [bodyOpenPersonal, setBodyOpenPersonal] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    let firstArray = [];
    for (let i = 0; i < GlobalData.length; i++) {
      firstArray[i] = false;
    }
    setBodyOpenGlobal(firstArray);

    firstArray = [];
    for (let i = 0; i < PersonalData.length; i++) {
      firstArray[i] = false;
    }
    setBodyOpenPersonal(firstArray);
  }, []);

  const updateMyArray = (
    oldArray: any,
    setOldArray: any,
    whichIndex: number
  ) => {
    let x: boolean = oldArray[whichIndex];
    setOldArray((items: any) => {
      return items.map((item: any, i: number) => {
        return whichIndex === i ? !item : item;
      });
    });
  };
  const { theme } = useTheme();
  return (
    <>
      {!whichPool
        ? GlobalData.map((data, i) => {
            if (i < bodyCount) {
              return (
                <div
                  className={clsnm(
                    bodyOpenGlobal[i] === true
                      ? styles.openIt
                      : styles.phoneTableWrapper
                  )}
                  key={i}
                >
                  <div className={styles.line}></div>
                  <div className={styles.titles}>
                    <div className={styles.title}>
                      <div className={styles.logoAndName}>
                        {data.logo && (
                          <img
                            style={{ width: "25px", marginRight: "8.5px" }}
                            src={data.logo}
                          ></img>
                        )}
                        <span className={styles.name}>{data.name}</span>
                      </div>
                      <div className={styles.cRatio}>
                        <span>Compensation Ratio: %154.89</span>
                        &nbsp;
                        <img
                          src={theme === "light" ? INFOBLACK : INFOWHITE}
                          className={styles.info}
                        ></img>
                      </div>
                    </div>
                    <img
                      onClick={() =>
                        updateMyArray(bodyOpenGlobal, setBodyOpenGlobal, i)
                      }
                      className={clsnm(
                        styles.modalKey,
                        bodyOpenGlobal[i] && styles.reverse
                      )}
                      src={theme === "light" ? DOWNBLACK : DOWNWHITE}
                    ></img>
                  </div>
                  {bodyOpenGlobal[i] === true && (
                    <div className={styles.openDatas}>
                      <div className={styles.openData}>
                        <div className={styles.text1}>Network</div>
                        <div>{data.network}</div>
                      </div>
                      <div className={styles.openData}>
                        <div className={styles.text1}>Liquidity</div>
                        <div>${data.liquidity}</div>
                      </div>
                      <div className={styles.openData}>
                        <div className={styles.text1}>Volume (24h)</div>
                        <div>${data.volume}</div>
                      </div>
                      <div className={styles.openData}>
                        <div className={styles.text1}>
                          VEAPR{" "}
                          <img
                            src={theme === "light" ? INFOBLACK : INFOWHITE}
                            className={styles.info}
                          ></img>
                        </div>
                        <div>{data.veapr}%</div>
                      </div>
                      <div className={styles.openData}>
                        <div className={styles.text1}>My Total APR</div>
                        <div>{data.myTotalApr}%</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          })
        : PersonalData.map((data, i) => {
            if (i < bodyCount) {
              if (bodyOpenPersonal[i]) {
                return (
                  <div
                  className={clsnm(
                    bodyOpenPersonal[i] === true
                      ? styles.openIt
                      : styles.phoneTableWrapper
                  )}
                  key={i}
                >
                    <div className={styles.line}></div>
                    <div className={styles.titles}>
                      <div className={styles.title}>
                        <div className={styles.logoAndName}>
                          {data.logo && (
                            <img
                              style={{ width: "25px", marginRight: "8.5px" }}
                              src={data.logo}
                            ></img>
                          )}
                          <span>{data.name}</span>
                        </div>
                        <div className={styles.cRatio}>
                          <span>Compensation Ratio: %154.89</span>
                          &nbsp;
                          <img
                            src={theme === "light" ? INFOBLACK : INFOWHITE}
                            className={styles.info}
                          ></img>
                        </div>
                      </div>
                      <img
                        onClick={() =>
                          updateMyArray(
                            bodyOpenPersonal,
                            setBodyOpenPersonal,
                            i
                          )
                        }
                        className={clsnm(
                          styles.modalKey,
                          bodyOpenPersonal[i] && styles.reverse
                        )}
                        src={theme === "light" ? DOWNBLACK : DOWNWHITE}
                      ></img>
                    </div>
                    {bodyOpenPersonal[i] === true && (
                    <div className={styles.openDatas}>
                      <div className={styles.openData}>
                        <div className={styles.text1}>Network</div>
                        <div>{data.network}</div>
                      </div>
                      <div className={styles.openData}>
                        <div className={styles.text1}>Liquidity</div>
                        <div>${data.liquidity}</div>
                      </div>
                      <div className={styles.openData}>
                        <div className={styles.text1}>Volume (24h)</div>
                        <div>${data.volume}</div>
                      </div>
                      <div className={styles.openData}>
                        <div className={styles.text1}>
                          VEAPR{" "}
                          <img
                            src={theme === "light" ? INFOBLACK : INFOWHITE}
                            className={styles.info}
                          ></img>
                        </div>
                        <div>{data.veapr}%</div>
                      </div>
                      <div className={styles.openData}>
                        <div className={styles.text1}>My Total APR</div>
                        <div>{data.myTotalApr}%</div>
                      </div>
                    </div>
                  )}
                  </div>
                );
              } else {
                return (
                  <div
                    className={clsnm(
                      styles.phoneTableWrapper,
                      bodyOpenPersonal[i] === true && styles.openIt
                    )}
                    key={i}
                  >
                    <div className={styles.line}></div>
                    <div className={styles.titles}>
                      <div className={styles.title}>
                        <div className={styles.logoAndName}>
                          {data.logo && (
                            <img
                              style={{ width: "25px", marginRight: "8.5px" }}
                              src={data.logo}
                            ></img>
                          )}
                          <span>{data.name}</span>
                        </div>
                        <div className={styles.cRatio}>
                          <span>Compensation Ratio: %154.89</span>
                          &nbsp;
                          <img
                            src={theme === "light" ? INFOBLACK : INFOWHITE}
                            className={styles.info}
                          ></img>
                        </div>
                      </div>
                      <img
                        onClick={() =>
                          updateMyArray(
                            bodyOpenPersonal,
                            setBodyOpenPersonal,
                            i
                          )
                        }
                        className={clsnm(
                          styles.modalKey,
                          bodyOpenPersonal[i] && styles.reverse
                        )}
                        src={theme === "light" ? DOWNBLACK : DOWNWHITE}
                      ></img>
                    </div>
                  </div>
                );
              }
            }
          })}
    </>
  );
};

export { Pools, DesktopTable, DesktopTitle, PhoneTitle, PhoneTable };