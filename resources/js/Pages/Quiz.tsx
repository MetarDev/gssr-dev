import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
  Button,
  Heading,
  Stack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { HighlightText } from "@/Components/HighlightText";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useQuiz } from "@/Hooks/useQuiz";
import QuizSummary from "@/Components/Quiz/QuizSummary";
import { QuestionInterface, Quiz } from "@/types/quiz";
import Question from "@/Components/Quiz/Question";
import QuestionTitle from "@/Components/Quiz/QuestionTitle";
import AnswerPopup from "@/Components/Quiz/AnswerPopup";

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

  return (
    <DefaultLayout justifyContent="center" title="Quiz">
      {!hasStarted && (
        <QuizSummary quiz={quiz} url={url} onStartQuiz={startQuiz} />
      )}
      {hasStarted && (
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
        <div className="mt-8">Quiz summary goes here</div>
      }

      <AnswerPopup
        quizSummary={quizSummary}
        currentQuestionSummary={currentQuestionSummary}
        question={currentQuestion}
        timeSpent={quiz.timer - timer}
        answer={currentAnswer}
        isTimeout={isTimeout}
        isOpen={isAnswerPopupOpen}
        // disableTimeout={true}
        onClose={onNextQuestion}
      />
    </DefaultLayout>
  );
}
