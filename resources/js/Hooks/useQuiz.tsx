import { useState } from "react";

export const useQuiz = ({ quiz, questions }) => {
  const [hasStarted, setHasStarted] = useState(false);
  return {
    hasStarted,
  }
};
