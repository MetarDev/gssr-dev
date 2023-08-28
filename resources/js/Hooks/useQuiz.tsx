import { AnswerInterface, QuestionInterface, QuestionSummaryInterface, Quiz, QuizSummary } from "@/types/quiz";
import { useState } from "react";
import { useCountdown } from "./useCountdown";

export const useQuiz = ({
  quiz,
  questions,
}: {
  quiz: Quiz;
  questions: QuestionInterface[];
}) => {
  const [quizSummary, setQuizSummary] = useState<QuizSummary|null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] =
    useState(false);
  const [isAnswerPopupOpen, setIsAnswerPopupOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionInterface>(questions[0]);
  const [currentQuestionSummary, setCurrentQuestionSummary] = useState<QuestionSummaryInterface|null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<AnswerInterface | null>(null);

  const {
    timer,
    isTimeout,
    startTimer,
    stopTimer,
  } = useCountdown({
    from: quiz.timer,
    onTimeout: () => {
      onAnswer(null);
    },
  });

  /**
   * Callback when user starts the quiz.
   *
   * @return void
   */
  const startQuiz = () => {
    setHasStarted(true);
    startTimer();
  };

  /**
   * Callback when user answers a question.
   *
   * @param answer Answer that the user clicked
   */
  const onAnswer = (answer: AnswerInterface|null) => {
    setIsCurrentQuestionAnswered(true);
    setCurrentAnswer(answer);
    setIsAnswerPopupOpen(true);
    stopTimer();
  };

  /**
   * Callback when user clicks the "Next Question" button.
   *
   * @return void
   */
  const onNextQuestion = () => {
    const newIndex = currentQuestionIndex + 1;
    setIsCurrentQuestionAnswered(false);
    setCurrentQuestionIndex(newIndex);
    setCurrentQuestion(questions[newIndex]);
    setCurrentAnswer(null);
    setIsAnswerPopupOpen(false);
    startTimer();
  };

  return {
    timer,
    isTimeout,
    currentQuestion,
    currentAnswer,
    quizSummary,
    currentQuestionSummary,
    hasStarted,
    isCurrentQuestionAnswered,
    currentQuestionIndex,
    isAnswerPopupOpen,
    numberOfQuestions: questions.length,
    startQuiz,
    onAnswer,
    onNextQuestion,
  };
};
