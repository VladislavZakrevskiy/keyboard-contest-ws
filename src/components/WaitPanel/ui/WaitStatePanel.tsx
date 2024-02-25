import { useContestPageStore } from "@/pages/Contest";
import { Button } from "../../ui/Button/ui/Button";
import { WaitState } from "..";
export const WaitStatePanel = () => {
  const { setWaitState } = useContestPageStore();

  return (
    <div>
      <Button onClick={() => setWaitState(WaitState.READY)}>START</Button>
    </div>
  );
};
