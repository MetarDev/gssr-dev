import { AnswerInterface, QuestionInterface } from "@/types/quiz";
import { ArrowForwardIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Code,
  Flex,
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
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { HighlightText } from "../HighlightText";
import { useEffect, useState } from "react";

const AnswerPopup = ({
  question,
  answer,
  timeSpent,
  isOpen,
  isTimeout = false,
  howLongToWait = 3000, // in milliseconds
  disableTimeout = false, // for debugging.
  onClose,
}: {
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"xl"}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        backgroundColor={colorMode === "dark" ? "gray.800" : "gray.200"}
        margin={"auto"}
      >
        <ModalHeader padding={8} fontSize={28}>
          <Flex alignItems={"center"}>
            <Text as="span" marginRight={4} flexWrap="wrap">
              {isTimeout ? "Time's up!" : "Your answer is: "}
            </Text>
            {isAnswerRevealed && answer && (
              <HighlightText colorScheme={answer.isCorrect ? "green" : "red"}>
                {answer.isCorrect ? (
                  <CheckIcon boxSize={6} marginRight={1} />
                ) : (
                  <CloseIcon boxSize={4} marginRight={1} />
                )}
                {answer.isCorrect ? "Correct" : "Incorrect"}
              </HighlightText>
            )}
            {!isAnswerRevealed && <Spinner color="orange.500" />}
          </Flex>
        </ModalHeader>
        <ModalBody>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                {!isTimeout && (
                  <Tr>
                    <Td>
                      <Text as="span">Your answer: </Text>
                    </Td>
                    <Td>
                      <Code>{answer?.title || ""}</Code>
                    </Td>
                  </Tr>
                )}
                <Tr>
                  <Td>
                    <Text as="span">Correct answer: </Text>
                  </Td>
                  <Td>
                    {isAnswerRevealed && <Code>{correctAnswerTitle}</Code>}
                  </Td>
                </Tr>
                {!isTimeout && <Tr>
                  <Td>
                    <Text as="span">Answered in: </Text>
                  </Td>
                  <Td>
                    <Text as="span">{`${timeSpent}s`}</Text>
                  </Td>
                </Tr>}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter marginTop={8}>
          <Button
            onClick={
              isAnswerRevealed
                ? () => {
                    onClose();
                    reset();
                  }
                : () => {}
            }
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
