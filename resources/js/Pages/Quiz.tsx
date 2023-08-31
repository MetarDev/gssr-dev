import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useQuiz } from "@/Hooks/useQuiz";
import QuizSplashScreen from "@/Components/Quiz/QuizSplashScreen";
import { QuestionInterface, Quiz } from "@/types/quiz";
import Question from "@/Components/Quiz/Question";
import QuestionTitle from "@/Components/Quiz/QuestionTitle";
import AnswerPopup from "@/Components/Quiz/AnswerPopup";
import QuizSummary from "@/Components/Quiz/QuizSummary";

export default function QuizPage({
  auth,
  quiz,
  questions,
  url,
}: PageProps<{
  slug: string;
  quiz: Quiz;
  questions: QuestionInterface[];
  url: string;
}>) {
  const {
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
    numberOfQuestions,
    startQuiz,
    onAnswer,
    onNextQuestion,
  } = useQuiz({ quiz, questions });

  const mockQuizSummary = {
    score: 123,
    questions: [
      {
        timeSpent: 23,
        score: 0,
        answerId: 253,
        answeredCorrectly: false,
      },
      {
        timeSpent: 23,
        score: 120,
        answerId: 66,
        answeredCorrectly: true,
      },
      {
        timeSpent: 23,
        score: 123,
        answerId: 1,
        answeredCorrectly: true,
      },
      {
        timeSpent: 12,
        score: 0,
        answerId: 5,
        answeredCorrectly: false,
      },
      {
        timeSpent: 23,
        score: 0,
        answerId: 59,
        answeredCorrectly: false,
      },
      {
        timeSpent: 23,
        score: 120,
        answerId: 128,
        answeredCorrectly: true,
      },
      {
        timeSpent: 23,
        score: 123,
        answerId: 67,
        answeredCorrectly: true,
      },
      {
        timeSpent: 12,
        score: 0,
        answerId: 120,
        answeredCorrectly: false,
      },
      {
        timeSpent: 23,
        score: 123,
        answerId: 1,
        answeredCorrectly: true,
      },
      {
        timeSpent: 12,
        score: 0,
        answerId: 122,
        answeredCorrectly: false,
      },
    ],
    correctQuestions: 5,
    totalQuestions: 10,
    timeSpent: 167,
    timeTotal: 30 * 10,
    avgTimePerQuestion: 19.99,
    maxScore: 200 * 10
  };

  const test = true;

  return (
    <DefaultLayout justifyContent="center" title="Quiz">
      {!hasStarted && !test && (
        <QuizSplashScreen
          quiz={quiz}
          url={url}
          onStartQuiz={startQuiz}
        />
      )}
      {hasStarted && !hasEnded && !test && (
        <Question
          countdownFrom={quiz.timer}
          countdownValue={timer}
          subtitle={`Question ${
            currentQuestionIndex + 1
          } of ${numberOfQuestions}`}
          isCurrentQuestionAnswered={isCurrentQuestionAnswered}
          question={currentQuestion}
          onAnswer={onAnswer}
          onNextQuestion={onNextQuestion}
        >
          <QuestionTitle question={currentQuestion} />
        </Question>
      )}

      {test &&
      // {hasEnded &&
        <QuizSummary
          quiz={quiz}
          questions={questions}
          quizSummary={mockQuizSummary}
          url={url}
        />
      }

      <AnswerPopup
        quizSummary={quizSummary}
        currentQuestionSummary={currentQuestionSummary}
        question={currentQuestion}
        timeSpent={quiz.timer - timer}
        answer={currentAnswer}
        isTimeout={isTimeout}
        isOpen={isAnswerPopupOpen}
        disableTimeout={true}
        onClose={onNextQuestion}
      />
    </DefaultLayout>
  );
}
