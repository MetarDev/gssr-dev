import { Question, Quiz } from "@/types/quiz";
import { useState } from "react";

export const useQuiz = ({
  quiz,
  questions
}: {
  quiz: Quiz,
  questions: Question[],
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const startQuiz = () => {
    setHasStarted(true);
  };

  return {
    hasStarted,
    startQuiz,
  }
};
