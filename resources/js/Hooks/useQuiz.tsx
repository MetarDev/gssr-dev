import { QuestionInterface, Quiz } from "@/types/quiz";
import { useState } from "react";

export const useQuiz = ({
  quiz,
  questions
}: {
  quiz: Quiz,
  questions: QuestionInterface[],
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const numberOfQuestions = questions.length;

  const startQuiz = () => {
    setHasStarted(true);
  };

  const onAnswer = () => {
    console.log('Question answererd');
  }

  const onNextQuestion = () => {
    console.log('On next question')
  }

  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  return {
    currentQuestion,
    hasStarted,
    isCurrentQuestionAnswered,
    currentQuestionIndex,
    numberOfQuestions,
    startQuiz,
    onAnswer,
    onNextQuestion,
  }
};
