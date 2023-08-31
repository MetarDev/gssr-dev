import { Quiz, QuizSummaryInterface } from "@/types/quiz";
import {
  Button,
  Divider,
  Heading,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { StyledCard } from "../StyledCard";
import CopyToClipboard from "../CopyToClipboard";
import { calculateMaxScore } from "@/Helpers/scoring";
import { CheckIcon, StarIcon, TimeIcon } from "@chakra-ui/icons";
import StatsCard from "./StatCard";
import { HighlightText } from "../HighlightText";
import ShareQuizCta from "./ShareQuizCta";

export default function QuizSummary({
  quiz,
  quizSummary,
  url,
}: {
  quiz: Quiz;
  quizSummary: QuizSummaryInterface | null;
  url: string;
}) {
  if (!quizSummary) {
    return null;
  }

  return (
    <VStack
      align={"center"}
      spacing={{ base: 8, md: 16 }}
      alignItems={"center"}
      marginTop={{ base: 8, md: 36 }}
    >
      <Heading size={"2xl"} marginBottom={8}>
        You completed the quiz!{" "}
      </Heading>

      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 4, lg: 12 }}
        width={"full"}
      >
        <StatsCard
          title={"Score"}
          icon={<StarIcon boxSize={8} />}
          valueAsPercentage={(quizSummary.score / quizSummary.maxScore) * 100}
        >
          {quizSummary.score} / {quizSummary.maxScore}
        </StatsCard>
        <StatsCard
          title={"Correct answers"}
          icon={<CheckIcon boxSize={8} />}
          valueAsPercentage={
            (quizSummary.correctQuestions / quizSummary.totalQuestions) * 100
          }
        >
          {quizSummary.correctQuestions} / {quizSummary.totalQuestions}
        </StatsCard>
        <StatsCard
          title={"Avg. time / question"}
          icon={<TimeIcon boxSize={8} />}
          valueAsPercentage={
            ((quizSummary.avgTimePerQuestion || 0) / quiz.timer) * 100
          }
        >
          {quizSummary.avgTimePerQuestion}s
        </StatsCard>
      </SimpleGrid>

      <ShareQuizCta url={url} quizSummary={quizSummary} />

      <Divider />
      <Heading as="h2" size={"md"}>
        Questions:
      </Heading>
      <Text>
        Accordions with questions and answers (correct marked, answered marked)
        go here
      </Text>
    </VStack>
  );
}
