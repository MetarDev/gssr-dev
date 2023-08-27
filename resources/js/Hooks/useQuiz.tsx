import { AnswerInterface, QuestionInterface, QuestionSummaryInterface, Quiz, QuizSummary } from "@/types/quiz";
import { useEffect, useState } from "react";

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

  /**
   * Callback when user starts the quiz.
   *
   * @return void
   */
  const startQuiz = () => {
    setHasStarted(true);
  };

  /**
   * Callback when user answers a question.
   *
   * @param answer Answer that the user clicked
   */
  const onAnswer = (answer: AnswerInterface) => {
    setIsCurrentQuestionAnswered(true);

    const highlightedAnswers = currentQuestion.answers.map(
      (currentAnswer: AnswerInterface) => {
        // Highlight the answer
        if (currentAnswer.id === answer.id) {
          return {...currentAnswer};
        }

        // If the answer is incorrect, highlight the correct answer as well
        if (
          !answer.isCorrect &&
          currentAnswer.id === currentQuestion.correct_answer_id
        ) {
          return { ...currentAnswer };
        }

        return currentAnswer;
      }
    );

    setCurrentQuestion({
      ...currentQuestion,
      answers: highlightedAnswers,
    });

    setCurrentAnswer(answer);
    setIsAnswerPopupOpen(true);
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
  };

  /**
   * Callback when the timer runs out.
   *
   * @return void
   */
  const onTimeout = () => {
    console.log('timeout');
  };

  return {
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
    onTimeout,
  };
};
