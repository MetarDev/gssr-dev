import { QuestionInterface, Quiz, QuizSummaryInterface } from "@/types/quiz";
import { Button, Divider, Heading, Link, SimpleGrid, VStack } from "@chakra-ui/react";
import { CheckIcon, StarIcon, TimeIcon } from "@chakra-ui/icons";
import StatsCard from "./StatCard";
import ShareQuizCta from "./ShareQuizCta";
import QuestionSummary from "./QuestionSummary";

export default function QuizSummary({
  quiz,
  questions,
  quizSummary,
  url,
}: {
  quiz: Quiz;
  questions: QuestionInterface[];
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
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 4, md: 8, lg: 12 }}
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
      <Heading as="h2" size={"xl"}>
        Questions:
      </Heading>

      {quizSummary.questions.map((questionSummary, index) => (
        <QuestionSummary
          index={index}
          key={questionSummary.question.hash}
          questionSummary={questionSummary}
        />
      ))}

      <Button as={Link} href="/quiz" colorScheme="green" alignSelf={"flex-end"}>
        Start another quiz!
      </Button>
    </VStack>
  );
}
