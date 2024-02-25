import { KeyboardInput } from "@/components/KeyboardInput";
import { Timer } from "../../ui/Timer";
export const ReadyStatePanel = () => {
  return (
    <div>
      <div>
        <Timer />
      </div>
      <KeyboardInput />
    </div>
  );
};
