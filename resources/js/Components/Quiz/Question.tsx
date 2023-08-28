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
import Countdown from "./Countdown";

const Question = ({
  children,
  countdownFrom,
  countdownValue,
  question: { answers, type },
  isCurrentQuestionAnswered,
  subtitle = "",
  onAnswer = (answer: AnswerInterface) => {},
  onNextQuestion,
}: {
  children: React.ReactNode;
  countdownFrom: number;
  countdownValue: number;
  question: QuestionInterface;
  isCurrentQuestionAnswered: boolean;
  subtitle: string;
  onAnswer?: (answer: AnswerInterface) => void;
  onNextQuestion?: () => void;
}) => {
  const showTooltip = type === "feature_support" || type === "usage_global";

  return (
    <div>
      <Heading as="h2" textColor={"gray.500"} size="sm" marginBottom={2}>
        {subtitle}
      </Heading>
      <Countdown from={countdownFrom} value={countdownValue} />
      {children}
      <Divider marginTop={8} marginBottom={8} />
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
    </div>
  );
};

export default Question;
