import { useContestPageStore } from "../../../pages/Contest";
import { Status } from "../model/types/Status";
import { InputLetter } from "./InputLetter";

// let firstEmpty: number | undefined = undefined;
// for (let i = 0; i < comparedText.length; i++) {
//   if (comparedText[i][1] !== Status.EMPTY) continue;
//   if (!firstEmpty) {
//     firstEmpty = i;
//     break;
//   }
// }
// const lastEmpty =
//   (firstEmpty !== undefined ? firstEmpty : 0) + 10 < comparedText.length - 1
//     ? (firstEmpty !== undefined ? firstEmpty : 0) + 40
//     : comparedText.length - 1;
// return comparedText.slice(firstEmpty, lastEmpty);

export const KeyboardInput = () => {
  const { currentText, testText } = useContestPageStore();
  const compareCurrentToTest = () => {
    const compareString: Array<[letter: string, status: Status]> = [];
    for (let i = 0; i < testText.length; i++) {
      if (testText[i]?.toLowerCase() === currentText[i]?.toLowerCase()) {
        compareString.push([testText[i], Status.CORRECT]);
      } else if (!currentText[i]) {
        compareString.push([testText[i], Status.EMPTY]);
      } else if (testText[i] !== currentText[i]) {
        compareString.push([testText[i], Status.WRONG]);
      }
    }
    return compareString;
  };

  const setViewText = () => {
    let comparedText = compareCurrentToTest();
    const splitSlices = Math.ceil(comparedText.length / 60);
    const splitedComparedText: [letter: string, status: Status][][] = [];
    for (let i = 0; i < splitSlices; i++) {
      splitedComparedText.push([]);
      for (let j = 0; j < 70; j++) {
        splitedComparedText[i].push(comparedText[j]);
        if (j > 60 && comparedText?.[j]?.[0] === " ") {
          delete comparedText[j];
          break;
        }
        delete comparedText[j];
      }
      comparedText = comparedText.filter(Boolean);
    }

    for (const el of splitedComparedText) {
      for (let i = 0; i < el.length; i++) {
        if (el?.[i]?.[1] === Status.EMPTY) return el.filter(Boolean);
      }
    }
  };

  return (
    <div style={{ padding: "0 15%" }}>
      {setViewText()?.map(([letter, status], i) => (
        <InputLetter letter={letter} status={status} key={letter + status + i} />
      ))}
    </div>
  );
};
