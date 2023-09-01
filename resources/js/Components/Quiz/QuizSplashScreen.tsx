import { Quiz } from "@/types/quiz";
import {
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { StyledCard } from "../StyledCard";
import CopyToClipboard from "../CopyToClipboard";

export default function QuizSplashScreen({
  quiz: { timer, questions },
  url,
  onStartQuiz,
}: {
  quiz: Quiz;
  url: string;
  onStartQuiz: () => void;
}) {
  const maxWidth = "128px";
  return (
    <VStack
      align={"left"}
      spacing={{ base: 8, md: 12 }}
      maxW={"4xl"}
      alignItems={"flex-start"}
    >
      <Heading size={"2xl"}>Quiz summary:</Heading>
      <StyledCard>
        <TableContainer>
          <Table variant="simple" layout={{ base: "fixed", md: "auto" }}>
            <Tbody>
              <Tr>
                <Td width={{ base: maxWidth, md: "auto" }}>Timer:</Td>
                <Td>{timer}s / question</Td>
              </Tr>
              <Tr>
                <Td width={{ base: maxWidth, md: "auto" }}>Questions:</Td>
                <Td>{questions.length}</Td>
              </Tr>
              <Tr>
                <Td width={{ base: maxWidth, md: "auto" }}>
                  URL: <CopyToClipboard toCopy={url} />
                </Td>
                <Td>
                  <Text>{url}</Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Button
          colorScheme="green"
          alignSelf={"flex-end"}
          marginTop={"8"}
          onClick={onStartQuiz}
        >
          Start quiz!
        </Button>
      </StyledCard>
    </VStack>
  );
}
