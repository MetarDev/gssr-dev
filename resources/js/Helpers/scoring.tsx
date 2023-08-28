const CORRECT_ANSWER_SCORE = 100;

/**
 * Calculate the score for an answer. The timeSpent is a modifier to the score.
 *
 * @param {boolean} isCorrect Is the answer correct?
 * @param {number} timeSpent Time spent on the question in seconds.
 * @param {number} totalTime Total time the user had to answer the question in seconds.
 * @returns {number} The score for the answer
 */
export const calculateScore = (
  isCorrect: boolean,
  timeSpent: number,
  totalTime: number
) => {
  if (!isCorrect) {
    return 0;
  }

  // Modifier should be a number between 1 and 2 depending on the time spent.
  const modifier = 1 + (1 - timeSpent / totalTime);
  return Math.round(CORRECT_ANSWER_SCORE * modifier);
};
