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

export default function QuizPage({
  auth,
  quiz,
  questions,
  url,
}: PageProps<{
  slug: string
  quiz: Quiz,
  questions: QuestionInterface[],
  url: string,
}>) {
  const { colorMode } = useColorMode();

  console.log({questions});

  const {
    hasStarted,
    currentQuestion,
    isCurrentQuestionAnswered,
    startQuiz,
    onAnswer,
    onNextQuestion,
  } = useQuiz({ quiz, questions });

  return (
    <DefaultLayout justifyContent="center" title="Quiz">
      {!hasStarted &&
        <QuizSummary
          quiz={quiz}
          url={url}
          onStartQuiz={startQuiz}
        />
      }
      {hasStarted &&
        <Question
          isCurrentQuestionAnswered={isCurrentQuestionAnswered}
          question={currentQuestion}
          onAnswer={onAnswer}
          onNextQuestion={onNextQuestion}
        />
      }
    </DefaultLayout>
  );
}
