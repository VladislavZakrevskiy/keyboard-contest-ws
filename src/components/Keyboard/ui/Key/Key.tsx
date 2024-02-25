import { CSSProperties, useEffect, useState } from "react";
import styles from "./Key.module.scss";
import { useContestPageStore } from "@/pages/Contest";

interface Props {
  letter: string;
  viewLetter?: string;
  style?: CSSProperties;
  type?: "Key" | "Digit";
}

const addSign = (key: string, addCb: (letter: string) => void, removeCb: () => void) => {
  switch (key) {
    case "Space":
      return addCb(" ");
    case "Backspace":
      return removeCb();
    default:
      return addCb(key);
  }
};

export const Key = ({ letter, viewLetter, style, type = "Key" }: Props) => {
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false);
  const { addLetterCurrentText, removeLastLetterCurrentText } = useContestPageStore();

  useEffect(() => {
    addEventListener("keydown", (e) => {
      if (e.code === `${type}${letter}` || e.code === letter || e.key === letter) {
        setIsKeyDown(true);
        addSign(e.key, addLetterCurrentText, removeLastLetterCurrentText);
      }
    });

    addEventListener("keyup", (e) => {
      if (e.code === `${type}${letter}` || e.code === letter || e.key === letter) {
        setIsKeyDown(false);
      }
    });
  }, []);

  return (
    <div className={styles.key + " " + (isKeyDown ? styles.down : "")} style={style}>
      <p className={styles.letter}>{viewLetter ? viewLetter : letter}</p>
    </div>
  );
};
