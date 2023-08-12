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

export default function Quiz({
  auth,
  quiz,
  questions,
  url,
}: PageProps<{ slug: string }>) {
  const { colorMode } = useColorMode();

  const { hasStarted } = useQuiz({ quiz, questions });

  return (
    <DefaultLayout justifyContent="center" title="Quiz">
      {!hasStarted &&
        <QuizSummary
          quiz={quiz}
          url={url}
        />
      }
      {hasStarted &&
        <div>Quiz started</div>
      }
    </DefaultLayout>
  );
}
