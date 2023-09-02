import { AnswerInterface, QuestionInterface, QuestionSummaryInterface, Quiz, QuizSummaryInterface } from "@/types/quiz";
import { useState } from "react";
import { useCountdown } from "./useCountdown";
import { calculateMaxScore, calculateScore } from "@/Helpers/scoring";

export const useQuiz = ({
  quiz,
  questions,
}: {
  quiz: Quiz;
  questions: QuestionInterface[];
}) => {
  const [quizSummary, setQuizSummary] = useState<QuizSummaryInterface|null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
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
    disableTimeout: false,
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
   * Callback when user ends the quiz.
   *
   * @return void
   */
  const endQuiz = () => {
    setHasEnded(true);
  };

  /**
   * Add a question summary to the quiz summary.
   *
   * @param questionSummary Question summary to add to the quiz summary.
   * @returns void
   */
  const addQuestionSummaryToQuizSummary = (questionSummary: QuestionSummaryInterface) => {
    const newQuestions = [...(quizSummary?.questions || []), questionSummary];

    setQuizSummary({
      score: (quizSummary?.score || 0) + (questionSummary?.score || 0),
      questions: [ ...newQuestions ],
      correctQuestions: (quizSummary?.correctQuestions || 0) + (questionSummary?.answeredCorrectly ? 1 : 0),
      totalQuestions: (quizSummary?.totalQuestions || 0) + 1,
      timeSpent: (quizSummary?.timeSpent || 0) + (questionSummary?.timeSpent || 0),
      timeTotal: (quizSummary?.timeTotal || 0) + quiz.timer,
      avgTimePerQuestion: parseFloat((quizSummary ? quizSummary.questions.reduce((acc, question) => {
        return acc + question.timeSpent;
      }, 0) / quizSummary.questions.length : 0).toFixed(2)),
      maxScore: calculateMaxScore(quiz),
    });
  }

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

    const isCorrect = answer?.isCorrect || false;
    const questionSummary = {
      timeSpent: quiz.timer - timer,
      score: calculateScore(isCorrect, quiz.timer - timer, quiz.timer),
      answeredCorrectly: isCorrect,
      answerId: answer?.id || null,
      question: currentQuestion,
    };

    setCurrentQuestionSummary(questionSummary);
  };

  /**
   * Callback when user clicks the "Next Question" button.
   *
   * @return void
   */
  const onNextQuestion = () => {
    const newIndex = currentQuestionIndex + 1;

    if (currentQuestionSummary) {
      addQuestionSummaryToQuizSummary(currentQuestionSummary);
    }

    setCurrentQuestionSummary(null);
    setIsCurrentQuestionAnswered(false);
    setCurrentAnswer(null);
    setIsAnswerPopupOpen(false);

    if (questions[newIndex]) {
      setCurrentQuestionIndex(newIndex);
      setCurrentQuestion(questions[newIndex]);
      startTimer();
    } else {
      endQuiz();
    }
  };

  return {
    timer,
    isTimeout,
    currentQuestion,
    currentAnswer,
    quizSummary,
    currentQuestionSummary,
    hasStarted,
    hasEnded,
    isCurrentQuestionAnswered,
    currentQuestionIndex,
    isAnswerPopupOpen,
    numberOfQuestions: questions.length,
    startQuiz,
    onAnswer,
    onNextQuestion,
  };
};
