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
  timer,
  question: { answers, type },
  isCurrentQuestionAnswered,
  subtitle = "",
  onAnswer = (answer: AnswerInterface) => {},
  onNextQuestion,
  onTimeout,
}: {
  children: React.ReactNode;
  timer: number;
  question: QuestionInterface;
  isCurrentQuestionAnswered: boolean;
  subtitle: string;
  onAnswer?: (answer: AnswerInterface) => void;
  onNextQuestion?: () => void;
  onTimeout: () => void;
}) => {
  const showTooltip = type === "feature_support" || type === "global_support";

  return (
    <div>
      <Heading as="h2" textColor={"gray.500"} size="sm" marginBottom={2}>
        {subtitle}
      </Heading>
      <Countdown initial={timer} onTimeout={onTimeout} />
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
