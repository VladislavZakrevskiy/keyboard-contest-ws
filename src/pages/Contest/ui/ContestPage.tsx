import { Keyboard } from "@/components/Keyboard";
import { WaitPanel } from "@/components/WaitPanel";
import styles from "./ContestPage.module.scss";

const ContestPage = () => {
  return (
    <div className={styles.page}>
      <WaitPanel />
      <Keyboard />
    </div>
  );
};

export default ContestPage;
