import { tokenize, textify } from "./tokenizer.js";

const range = (count: number) => Array.from(Array(count).keys());
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = <T>(list: T[]) => list[random(0, list.length - 1)];

const escapeString = (token: string) => `_+${token}`;
const fromTokens = (tokens: string[]) => escapeString(tokens.join(""));

function sliceCorpus(corpus: string[], sampleSize: number) {
  return corpus
    .map((_, index) => corpus.slice(index, index + sampleSize))
    .filter((group) => group.length === sampleSize);
}

function collectTransitions(samples: string[][]) {
  return samples.reduce((transitions, sample) => {
    const lastIndex = sample.length - 1;
    const lastToken = sample[lastIndex];
    const restTokens = sample.slice(0, lastIndex);

    const state = fromTokens(restTokens);
    const next = lastToken;

    transitions[state] = transitions[state] ?? [];
    transitions[state].push(next);
    return transitions;
  }, {});
}

function createChain(startText: string, transitions: Record<string, string>) {
  const head = startText ?? pickRandom(Object.keys(transitions));
  return tokenize(head);
}

function predictNext(chain: string[], transitions: Record<string, string>, sampleSize: number) {
  const lastState = fromTokens(chain.slice(-(sampleSize - 1)));
  const nextWords = transitions[lastState] ?? [];
  return pickRandom<string>(nextWords);
}

function* generateChain(startText: string, transitions: Record<string, string>, sampleSize) {
  const chain = createChain(startText, transitions);

  while (true) {
    const state = predictNext(chain, transitions, sampleSize);
    yield state;

    if (state) chain.push(state);
    else chain.pop();
  }
}

export function generate({
  source,
  start = "",
  wordsCount = 200,
  sampleSize = 3,
}: {
  source: string;
  start: string;
  wordsCount: number;
  sampleSize: number;
}) {
  if (!source) throw new Error("The source text cannot be empty.");
  if (sampleSize < 2) throw new Error("Sample size must not be less than 2.");

  const corpus = tokenize(String(source));
  const samples = sliceCorpus(corpus, sampleSize);
  const transitions = collectTransitions(samples);

  const generator = generateChain(start, transitions, sampleSize);
  const chain = range(wordsCount).map(() => generator.next().value);
  return textify(chain);
}
