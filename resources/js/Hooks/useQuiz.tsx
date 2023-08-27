import { AnswerInterface, QuestionInterface, Quiz } from "@/types/quiz";
import { useState } from "react";

export const useQuiz = ({
  quiz,
  questions,
}: {
  quiz: Quiz;
  questions: QuestionInterface[];
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] =
    useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionInterface>(
    questions[0]
  );

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
          return {
            ...currentAnswer,
            isHighlighted: true,
          };
        }

        // If the answer is incorrect, highlight the correct answer as well
        if (
          !answer.isCorrect &&
          currentAnswer.id === currentQuestion.correct_answer_id
        ) {
          return {
            ...currentAnswer,
            isHighlighted: true,
          };
        }

        return currentAnswer;
      }
    );

    setCurrentQuestion({
      ...currentQuestion,
      answers: highlightedAnswers,
    });
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
  };

  return {
    currentQuestion,
    hasStarted,
    isCurrentQuestionAnswered,
    currentQuestionIndex,
    numberOfQuestions: questions.length,
    startQuiz,
    onAnswer,
    onNextQuestion,
  };
};
