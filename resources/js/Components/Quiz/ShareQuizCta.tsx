import {
  Card,
  Flex,
  Heading,
  Link,
  Progress,
  SimpleGrid,
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
      padding={{ base: 8, md: 12, lg: 16 }}
      bg={colorMode === "dark" ? "green.700" : "green.200"}
      width={"full"}
    >
      <Flex
        gap={{base: 8, lg: 16}}
        justifyContent={{ base: "flex-start", md: "space-between"}}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"center"}
      >
        <VStack
          align={"center"}
          spacing={8}
          alignItems={"flex-start"}
          justifyContent={"center"}
        >
          <Heading>
            Challenge Your Peers!
          </Heading>
          <Text
            color={"brandTextDefault"}
            alignSelf={{ base: "flex-start", sm: "center" }}
            maxW={"2xl"}
          >
            Don't keep your quiz success to yourself! Flaunt your guessing-game
            by sharing your quiz accomplishment with your social circle and
            inspire others to take the challenge.
          </Text>
        </VStack>
        <SimpleGrid spacing={{ base: 4, sm: 8 }} columns={3} flexShrink={0}>
          <TwitterShareIcon quizUrl={url} quizSummary={quizSummary} size="lg" />
          <WhatsappShareIcon
            quizUrl={url}
            quizSummary={quizSummary}
            size="lg"
          />
          <FacebookShareIcon quizUrl={url} size="lg" />
          <LinkedinShareIcon quizUrl={url} size="lg" />
          <MastodonShareIcon
            quizUrl={url}
            quizSummary={quizSummary}
            size="lg"
          />
          <CopyToClipboard
            toCopy={url}
            subject="Quiz URL"
            size="lg"
            variant={"solid"}
            marginLeft={0}
          />
        </SimpleGrid>
      </Flex>
    </Card>
  );
};

export default ShareQuizCta;
