import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
  Button,
  Heading,
  Stack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { HighlightText } from "@/Components/HighlightText";
import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Homepage({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  const { colorMode } = useColorMode();

  return (
    <DefaultLayout justifyContent="center" title="Support Guesser">
      <Stack
        spacing={12}
        direction={{ base: "column", xl: "row" }}
        alignItems={"center"}
      >
        <VStack
          align={"left"}
          spacing={{ base: 8, md: 12 }}
          maxW={"xl"}
          alignItems={"flex-start"}
        >
          <Heading variant={"main-heading"} size={"4xl"}>
            Do you know your <HighlightText>frontend</HighlightText> feature
            support?
          </Heading>
          <Text>
            Which feature is most / least supported? Which of the listed
            features does browser X support? Test your knowledge with this fun
            trivia quiz!
          </Text>
        </VStack>
      </Stack>
    </DefaultLayout>
  );
}
