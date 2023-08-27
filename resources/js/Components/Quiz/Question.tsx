import React from "react";
import {
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { AnswerInterface, QuestionInterface } from "@/types/quiz";
import { InfoIcon } from "@chakra-ui/icons";

const Question = ({
  children,
  question: { answers },
  isCurrentQuestionAnswered,
  subtitle = "",
  onAnswer = (answer: AnswerInterface) => {},
  onNextQuestion,
}: {
  children: React.ReactNode;
  question: QuestionInterface;
  isCurrentQuestionAnswered: boolean;
  subtitle: string;
  onAnswer?: (answer: AnswerInterface) => void;
  onNextQuestion?: () => void;
}) => (
  <div>
    <Heading as="h2" textColor={"gray.500"} size="sm" marginBottom={2}>
      {subtitle}
    </Heading>
    {children}
    <Divider marginBottom={8} />
    <SimpleGrid columns={{base: 1, lg: 2 }} spacing={8}>
      {answers.map((answer, index) => (
        <Flex key={answer.title} alignItems={"center"}>
          <Button
            flexGrow="1"
            flexShrink="50%"
            flexWrap={"wrap"}
            // flexShrink="50%"
            onClick={() => onAnswer(answer)}
            isDisabled={isCurrentQuestionAnswered}
            whiteSpace={"normal"}
            variant="outline"
            height={"auto"}
          >
            {answer.title}
            {answer.isHighlighted && answer.isCorrect && "✅"}
            {answer.isHighlighted && !answer.isCorrect && "❌"}
          </Button>

          <Tooltip label={answer.description}>
            <IconButton
              alignSelf={"center"}
              marginLeft={"2"}
              aria-label={`More info about ${answer.title}`}
              variant={"ghost"}
              colorScheme={"gray"}
              icon={<InfoIcon />}
            />
          </Tooltip>
        </Flex>
      ))}
    </SimpleGrid>

    {isCurrentQuestionAnswered && (
      <Button flexGrow="1" flexShrink="50%" onClick={onNextQuestion}>
        Next Question
      </Button>
    )}
  </div>
);

export default Question;
