import { useContestPageStore } from "@/pages/Contest";
import { WaitState } from "../model/types/WaitState";
import { WaitStatePanel } from "./WaitStatePanel";
import { ReadyStatePanel } from "./ReadyStatePanel";
import styles from "./WaitPanel.module.scss";

export const WaitPanel = () => {
  const { waitState } = useContestPageStore();

  if (waitState === WaitState.WAIT) {
    return (
      <div className={styles.panel}>
        <WaitStatePanel />
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <ReadyStatePanel />
    </div>
  );
};
