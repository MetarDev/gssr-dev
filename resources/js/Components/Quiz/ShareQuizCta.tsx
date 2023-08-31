import {
  Card,
  Flex,
  Heading,
  Link,
  Progress,
  Stat,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import CopyToClipboard from "../CopyToClipboard";
import TwitterShareIcon from "../Global/TwitterShareIcon";
import { QuizSummaryInterface } from "@/types/quiz";
import WhatsappShareIcon from "../Global/WhatsappShareIcon";
import LinkedinShareIcon from "../Global/LinkedinShareIcon";
import FacebookShareIcon from "../Global/FacebookShareIcon";
import MastodonShareIcon from "../Global/MastodonShareIcon";

const ShareQuizCta = ({
  url,
  quizSummary,
}: {
  url: string;
  quizSummary: QuizSummaryInterface;
}) => {
  const { colorMode } = useColorMode();
  return (
    <Card
      padding={{ base: 8, md: 16 }}
      bg={colorMode === "dark" ? "green.700" : "green.200"}
      width={"full"}
    >
      <VStack
        align={"center"}
        spacing={{ base: 4, md: 8 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading>Challenge Your Peers!</Heading>
        <Text color={"brandTextDefault"} textAlign={"center"} maxW={"2xl"}>
          Don't keep your quiz success to yourself! Flaunt your guessing-game by
          sharing your quiz accomplishment with your social circle and inspire
          others to take the challenge.
        </Text>

        <Flex gap={4}>
          <TwitterShareIcon quizUrl={url} quizSummary={quizSummary} size="lg" />
          <WhatsappShareIcon quizUrl={url} quizSummary={quizSummary} size="lg" />
          <FacebookShareIcon quizUrl={url} size="lg" />
          <LinkedinShareIcon quizUrl={url} size="lg" />
          <MastodonShareIcon quizUrl={url} quizSummary={quizSummary} size="lg" />
          <CopyToClipboard toCopy={url} subject="Quiz URL" size="lg" variant={"solid"} marginLeft={0} />
        </Flex>
      </VStack>
    </Card>
  );
};

export default ShareQuizCta;
