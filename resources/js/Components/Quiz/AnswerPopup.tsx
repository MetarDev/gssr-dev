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
  onClose,
}: {
  question: QuestionInterface;
  answer: AnswerInterface;
  timeSpent: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { colorMode } = useColorMode();
  const [counter, setCounter] = useState(0);
  const [countInterval, setCountInterval] = useState<NodeJS.Timer | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  useEffect(() => {
    if (isOpen && !countInterval) {
      setCountInterval(
        setInterval(() => {
          setCounter((prevCounter) => prevCounter + 1);
        }, 1000)
      );
    }

    if (counter > 2 && countInterval) {
      setIsAnswerRevealed(true);
      clearInterval(countInterval);
      setCountInterval(null);
    }

    return () => {
      clearInterval(counter);
    };
  }, [isOpen, counter]);

  const reset = () => {
    setCounter(0);
    setIsAnswerRevealed(false);
  };

  const correctAnswerTitle =
    question.answers.find((a) => a.isCorrect)?.title || "";

  if (!answer) {
    return null;
  }

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
            <Text as="span" marginRight={4}>
              Your answer is:{" "}
            </Text>
            {isAnswerRevealed && (
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
                <Tr>
                  <Td>
                    <Text as="span">Your answer: </Text>
                  </Td>
                  <Td>
                    <Code>{answer.title}</Code>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text as="span">Correct answer: </Text>
                  </Td>
                  <Td>
                    {isAnswerRevealed && <Code>{correctAnswerTitle}</Code>}
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text as="span">Answered in: </Text>
                  </Td>
                  <Td>
                    <Text as="span">{`${timeSpent}s`}</Text>
                  </Td>
                </Tr>
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
