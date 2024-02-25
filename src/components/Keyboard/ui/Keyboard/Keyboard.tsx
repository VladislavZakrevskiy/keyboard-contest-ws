import { Key } from "../Key/Key";
import styles from "./Keyboard.module.scss";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "+"];
const firstLetters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "\\"];
const secondLetters = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":", ";"];
const thirdLetters = ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "?"];

export const Keyboard = () => {
  return (
    <div className={styles.keyboard}>
      <div className={styles.letter_collumn}>
        {numbers.map((num) => (
          <Key letter={num} key={num} type="Digit" />
        ))}
        <Key letter={"Backspace"} viewLetter="Del" key={"Backspace"} type="Digit" />
      </div>
      <div className={styles.letter_collumn}>
        {firstLetters.map((letter) => (
          <Key letter={letter} key={letter} />
        ))}
      </div>
      <div className={styles.letter_collumn}>
        {secondLetters.map((letter) => (
          <Key letter={letter} key={letter} />
        ))}
      </div>
      <div className={styles.letter_collumn}>
        {thirdLetters.map((letter) => (
          <Key letter={letter} key={letter} />
        ))}
      </div>
      <div className={styles.letter_collumn}>
        <Key letter={"Space"} style={{ width: "50%", borderRadius: "4vw" }} key={"Space"} />
      </div>
    </div>
  );
};
