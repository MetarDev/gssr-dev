import {
  Card,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";
import {
  QuestionInterface,
  QuestionSummaryInterface,
} from "@/types/quiz";
import QuestionTitle from "./QuestionTitle";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { HighlightText } from "../HighlightText";

const QuestionSummary = ({
  index,
  questionSummary,
}: {
  index: number;
  questionSummary: QuestionSummaryInterface;
}) => {
  const { colorMode } = useColorMode();
  const checkIconColor = colorMode === "dark" ? "green.300" : "green.600";
  const closeIconColor = colorMode === "dark" ? "red.300" : "red.600";
  const userAnswer = questionSummary.question.answers.find(
    (a) => a.id === questionSummary.answerId
  );

  const correctAnswer = questionSummary.question.answers.find((a) => a.isCorrect);

  return (
    <Card
      w={"full"}
      p={{ base: 4, md: 8 }}
      background={colorMode === "dark" ? "gray.900" : "white"}
    >
      <Flex
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={4}
        marginBottom={4}
      >
        {questionSummary.answeredCorrectly && (
          <CheckIcon color={checkIconColor} />
        )}
        {!questionSummary.answeredCorrectly && (
          <CloseIcon color={closeIconColor} />
        )}
        <Heading size={"md"} color={"brandTextLight"}>
          Question #{index + 1} -{" "}
          {questionSummary.answeredCorrectly ? "Correct" : "Incorrect"}
        </Heading>
      </Flex>
      <QuestionTitle question={questionSummary.question} />

      <UnorderedList>
        {userAnswer && <ListItem><Text as="span">Your answer: </Text><HighlightText colorScheme="orange">{userAnswer.title}</HighlightText></ListItem>}
        {correctAnswer && <ListItem><Text as="span">Correct answer: </Text><HighlightText colorScheme="orange">{correctAnswer.title}</HighlightText></ListItem>}
      </UnorderedList>
    </Card>
  );
};

export default QuestionSummary;
