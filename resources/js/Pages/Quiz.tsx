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
import { Metadata } from "@/types/meta";

export default function QuizPage({
  auth,
  quiz,
  questions,
  metadata,
  metadata: { url }
}: PageProps<{
  slug: string;
  quiz: Quiz;
  questions: QuestionInterface[];
  metadata: Metadata,
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

  return (
    <DefaultLayout justifyContent="center" metadata={metadata}>
      {!hasStarted && (
        <QuizSplashScreen
          quiz={quiz}
          url={url}
          onStartQuiz={startQuiz}
        />
      )}
      {hasStarted && !hasEnded && (
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

      {hasEnded &&
        <QuizSummary
          quiz={quiz}
          questions={questions}
          quizSummary={quizSummary}
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
