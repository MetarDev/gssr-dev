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
import { ArrowForwardIcon, ArrowRightIcon, InfoIcon } from "@chakra-ui/icons";

const Question = ({
  children,
  question: { answers, type },
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
}) => {
  const showTooltip = type === "feature_support" || type === "global_support";

  return (
    <div>
      <Heading as="h2" textColor={"gray.500"} size="sm" marginBottom={2}>
        {subtitle}
      </Heading>
      {children}
      <Divider marginBottom={8} />
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {answers.map((answer, index) => (
          <Flex key={answer.title} alignItems={"center"}>
            <Button
              flexGrow="1"
              flexShrink="50%"
              padding={4}
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

            {showTooltip && (
              <Tooltip label={`${answer.titleLong}: ${answer.description}`}>
                <IconButton
                  alignSelf={"center"}
                  marginLeft={"2"}
                  aria-label={`More info about ${answer.title}`}
                  variant={"ghost"}
                  colorScheme={"gray"}
                  icon={<InfoIcon />}
                />
              </Tooltip>
            )}
          </Flex>
        ))}
      </SimpleGrid>

      <Flex justifyContent={"flex-end"} marginTop={8}>
        <Button
          onClick={isCurrentQuestionAnswered ? onNextQuestion : () => {}}
          disabled={isCurrentQuestionAnswered}
          visibility={isCurrentQuestionAnswered ? "visible" : "hidden"}
          colorScheme={"green"}
        >
          Next Question <ArrowForwardIcon marginLeft={2} />
        </Button>
      </Flex>
    </div>
  );
};

export default Question;
