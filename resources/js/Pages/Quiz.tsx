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
import { Question, Quiz } from "@/types/quiz";

export default function QuizPage({
  auth,
  quiz,
  questions,
  url,
}: PageProps<{
  slug: string
  quiz: Quiz,
  questions: Question[],
  url: string,
}>) {
  const { colorMode } = useColorMode();

  const { hasStarted, startQuiz } = useQuiz({ quiz, questions });

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
        <div>Quiz started</div>
      }
    </DefaultLayout>
  );
}
