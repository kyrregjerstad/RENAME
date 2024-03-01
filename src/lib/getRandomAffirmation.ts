import { affirmations } from '$lib/constants';

function shuffleArray(array: Array<string>): Array<string> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledAffirmations = shuffleArray(affirmations);

let currentIndex = 0;

export const getNextAffirmation = (): string => {
  const affirmation = shuffledAffirmations[currentIndex % shuffledAffirmations.length];
  currentIndex++;
  return affirmation;
};
