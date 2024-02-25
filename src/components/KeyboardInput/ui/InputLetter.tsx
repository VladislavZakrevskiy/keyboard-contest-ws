import { Status } from "../model/types/Status";
import styles from "./InputLetter.module.scss";

interface Props {
  letter: string;
  status: Status;
}

export const InputLetter = ({ letter, status }: Props) => {
  return <p className={`${styles.letter} ${styles[status]}`}>{letter}</p>;
};
