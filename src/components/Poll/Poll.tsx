import { ResponsivePie } from "@nivo/pie";
import { Column, ExecutingModal, Row } from "../../components";
import { useModal } from "../../hooks";
import { useMediaQuery } from "react-responsive";
import { clsnm } from "../../utils/clsnm";

import styles from "./Poll.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../store/ThemeStore';
import { observer } from 'mobx-react-lite';
import { useNetwork } from 'wagmi';

type PollData = {
  id: string;
  label: string;
  value: number;
  color: string;
}[];

type PollProps = Readonly<{
  id: number | string;
  title: string;
  isExecuted: boolean;
  estimatedEndTime: string;
  votes: PollData;
}>;

const Poll = observer(({
  id,
  title,
  isExecuted,
  estimatedEndTime,
  votes,
}: PollProps) => {
  const themeStore = useInjection(ThemeStore);
  const isSmall = useMediaQuery({
    query: "(max-width: 540px)",
  });

  const modal = useModal();
  const { chain } = useNetwork();

  return (
    <>
      <ExecutingModal network={chain} modalController={modal} />
      <div onClick={modal.open} className={clsnm(styles.wrapper)}>
        <Column
          className={styles.contentWrapper}
          justifyContent="space-between"
        >
          <Row justifyContent="flex-start">
            <div className={styles.id}>ID: {id}</div>
            <div className={styles.id} style={{ marginLeft: "12px" }}>
              Multiple execute
            </div>
          </Row>

          <span className={styles.content}>{title}</span>

          <span className={styles.executed}>
            {isExecuted ? "Executed" : "Not executed"}
          </span>

          <Column>
            <span className={styles.date}>Estimated end time</span>
            <span className={styles.date} style={{ marginTop: "0.5rem" }}>
              {estimatedEndTime}
            </span>
          </Column>
        </Column>

        <div className={styles.pollWrapper}>
          <ResponsivePie
            data={votes}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.96}
            padAngle={11}
            cornerRadius={20}
            activeOuterRadiusOffset={4}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.1]],
            }}
            colors={{ datum: "data.color" }}
            animate={false}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextOffset={5}
            arcLinkLabelsTextColor={themeStore.theme === "dark" ? "white" : "black"}
            arcLinkLabelsOffset={isSmall ? 2 : 10}
            arcLinkLabelsDiagonalLength={12}
            arcLinkLabelsStraightLength={isSmall ? 5 : 24}
            enableArcLabels={false}
            arcLabelsRadiusOffset={0}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 1.1]],
            }}
            legends={[]}
          />
          <div className={styles.pollCenter}>
            <Column>
              <span className={styles.voted}>Voted</span>
              <span className={styles.percent}>48.4%</span>
            </Column>
          </div>
        </div>
      </div>
    </>
  );
});

export { Poll };
