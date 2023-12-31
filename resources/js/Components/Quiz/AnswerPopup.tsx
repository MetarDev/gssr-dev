import {
  AnswerInterface,
  QuestionInterface,
  QuestionSummaryInterface,
  QuizSummaryInterface,
} from "@/types/quiz";
import { ArrowForwardIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  Code,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { HighlightText } from "../HighlightText";
import { useEffect, useRef, useState } from "react";
import AnimatedScore from "./AnimatedScore";
import { CORRECT_ANSWER_SCORE } from "@/Helpers/scoring";

const AnswerPopup = ({
  quizSummary,
  currentQuestionSummary,
  question,
  answer,
  timeSpent,
  isOpen,
  isTimeout = false,
  howLongToWait = 1000, // in milliseconds
  disableTimeout = false, // for debugging.
  onClose,
}: {
  quizSummary: QuizSummaryInterface | null;
  currentQuestionSummary: QuestionSummaryInterface | null;
  question: QuestionInterface;
  answer: AnswerInterface | null;
  timeSpent: number;
  isOpen: boolean;
  isTimeout?: boolean;
  howLongToWait?: number;
  disableTimeout?: boolean;
  onClose: () => void;
}) => {
  const { colorMode } = useColorMode();
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const initialRef = useRef(null);

  useEffect(() => {
    // No need to do anything if we already revealed the answer
    if (isAnswerRevealed) {
      return;
    }

    // If we have a delay, we need to wait for the delay to pass before revealing the answer.
    if (isOpen) {
      if (isTimeout || disableTimeout) {
        setIsAnswerRevealed(true);
      } else {
        setTimeout(() => {
          setIsAnswerRevealed(true);
        }, howLongToWait);
      }
    }
  }, [isOpen]);

  const reset = () => {
    setIsAnswerRevealed(false);
  };

  const correctAnswerTitle =
    question.answers.find((a) => a.isCorrect)?.title || "";

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems={"center"}>
            <Heading
              marginRight={2}
              flexWrap="wrap"
              color={"brandTextLight"}
              size="lg"
              as="h2"
            >
              {isTimeout ? "Time's up!" : "You guessed: "}
            </Heading>
            {isAnswerRevealed && answer && (
              <HighlightText colorScheme={answer.isCorrect ? "green" : "red"}>
                {answer.isCorrect ? "Wisely" : "Poorly"}
              </HighlightText>
            )}
            {!isAnswerRevealed && <Spinner color="orange.500" />}
          </Flex>
        </ModalHeader>
        <ModalBody>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td paddingLeft={{ base: 0, md: 4 }}>
                    <Text as="span">Score:</Text>
                    <Tooltip label={`Your receive from ${CORRECT_ANSWER_SCORE} to ${CORRECT_ANSWER_SCORE * 2} for a correct answer depending on how fast your answered.`}>
                      <IconButton
                        size={"xs"}
                        alignSelf={"center"}
                        marginLeft={"2"}
                        aria-label={'How score is calculated'}
                        variant={"ghost"}
                        colorScheme={"gray"}
                        icon={<InfoIcon />}
                      />
                    </Tooltip>
                  </Td>
                  <Td>
                    <AnimatedScore
                      current={quizSummary?.score || 0}
                      addition={currentQuestionSummary?.score || 0}
                      isAnimating={isAnswerRevealed}
                    />
                  </Td>
                </Tr>
                {!isTimeout && (
                  <Tr>
                    <Td paddingLeft={{ base: 0, md: 4 }}>
                      <Text as="span">Your answer: </Text>
                    </Td>
                    <Td>
                      <Code>{answer?.title || ""}</Code>
                    </Td>
                  </Tr>
                )}
                <Tr>
                  <Td paddingLeft={{ base: 0, md: 4 }}>
                    <Text as="span">Correct answer: </Text>
                  </Td>
                  <Td>
                    {isAnswerRevealed && <Code>{correctAnswerTitle}</Code>}
                  </Td>
                </Tr>
                {!isTimeout && (
                  <Tr>
                    <Td paddingLeft={{ base: 0, md: 4 }}>
                      <Text as="span">Answered in: </Text>
                    </Td>
                    <Td>
                      <Text as="span">{`${timeSpent}s`}</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={
              isAnswerRevealed
                ? () => {
                    onClose();
                    reset();
                  }
                : () => {}
            }
            ref={initialRef}
            colorScheme={isAnswerRevealed ? "green" : "gray"}
            disabled={!isAnswerRevealed}
          >
            Next Question <ArrowForwardIcon marginLeft={2} />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AnswerPopup;
