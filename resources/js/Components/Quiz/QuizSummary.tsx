import { Quiz } from "@/types/quiz";
import {
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
  VStack,
  useClipboard,
} from "@chakra-ui/react";
import { StyledCard } from "../StyledCard";
import CopyToClipboard from "../CopyToClipboard";

export default function QuizSummary({
  quiz: {
    timer,
    questions,
  },
  url,
  onStartQuiz,
}: {
  quiz: Quiz;
  url: string;
  onStartQuiz: () => void;
}) {
  return (
    <VStack
      align={"left"}
      spacing={{ base: 8, md: 12 }}
      maxW={"xl"}
      alignItems={"flex-start"}
    >
      <Heading>Quiz summary:</Heading>
      <StyledCard>
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Timer:</Td>
                <Td>{timer}s</Td>
              </Tr>
              <Tr>
                <Td>Questions:</Td>
                <Td>{questions.length}</Td>
              </Tr>
              <Tr>
                <Td>URL:</Td>
                <Td>
                  <Flex alignItems={'center'} justifyContent={"space-between"}>
                    <Text>{url}</Text>
                    <CopyToClipboard toCopy={url} />
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Button colorScheme="green" alignSelf={"flex-end"} marginTop={"8"} onClick={onStartQuiz}>Start quiz!</Button>
      </StyledCard>
    </VStack>
  );
}
