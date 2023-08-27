import { AnswerInterface, QuestionInterface } from "@/types/quiz";
import { ArrowForwardIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Code,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
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
  isOpen,
  onClose,
}: {
  question: QuestionInterface;
  answer: AnswerInterface;
  isOpen: boolean;
  onClose: () => void;
}) => {
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

  console.log({ isOpen, answer, counter });

  const correctAnswerTitle = question.answers.find((a) => a.isCorrect)?.title || "";

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
      <ModalContent>
        <ModalHeader>
          <Text as="span" marginRight={2}>
            Your answer is:{" "}
          </Text>
          {isAnswerRevealed && (
            <HighlightText colorScheme={answer.isCorrect ? "green" : "red"}>
              {answer.isCorrect ? (
                <CheckIcon marginRight={1} />
              ) : (
                <CloseIcon boxSize={3} marginRight={1} />
              )}
              {answer.isCorrect ? "Correct" : "Incorrect"}
            </HighlightText>
          )}
          {!isAnswerRevealed && (
            <Progress
              size="xs"
              value={counter * 33}
              colorScheme="orange"
              isIndeterminate
            />
          )}
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
                    {isAnswerRevealed && (<Code>{correctAnswerTitle}</Code>)}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          {/* <List>
            <ListItem>
              <Text as="span">Your answer: </Text>
              <Code>{answer.title}</Code>
            </ListItem>
            <ListItem>
              <Text as="span">Correct answer: </Text>
            </ListItem>
          </List> */}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={isAnswerRevealed ? onClose : () => {}}
            colorScheme={isAnswerRevealed ? "orange" : "gray"}
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
