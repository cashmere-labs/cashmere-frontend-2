import {
  Footer,
  Navbar,
} from "../../components";
import { useTitle } from "../../hooks/useTitle";
import { Container, Layout } from "../../ui";

import styles from "./DAO.module.scss";
import { UpperPageReplaced } from '../../components/DAO/UpperPageReplaced/UpperPageReplaced';

const DAO = () => {
  useTitle("DAO");

  return (
    <Layout>
      <Navbar />
      <div className={styles.wrapper}>
        <Container compact>
          <UpperPageReplaced />
          {/*<VoteGauge />*/}
          {/*<Polls />*/}
          {/*<Statistics />*/}
        </Container>
      </div>

      <Footer />
    </Layout>
  );
};

export { DAO };
