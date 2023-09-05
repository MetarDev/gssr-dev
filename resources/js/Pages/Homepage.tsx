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
import { Metadata } from "@/types/meta";

export default function Homepage({
  auth,
  laravelVersion,
  phpVersion,
  metadata,
}: PageProps<{ laravelVersion: string; phpVersion: string, metadata: Metadata }>) {
  const { colorMode } = useColorMode();

  return (
    <DefaultLayout justifyContent="center" metadata={metadata}>
      <Stack
        spacing={12}
        direction={{ base: "column", xl: "row" }}
        alignItems={{ base: "flex-start", xl: "center"}}
      >
        <VStack
          align={"left"}
          spacing={{ base: 8, md: 12 }}
          maxW={"xl"}
          alignItems={"flex-start"}
        >
          <Heading variant={"main-heading"} size={"3xl"}>
            Do you know your <HighlightText>frontend</HighlightText> feature
            support?
          </Heading>
          <Text>
            Which feature is most / least supported? Which of the listed
            features does browser X support? Test your knowledge with this endless quizzes generated from caniuse.com data.
          </Text>

          <Button colorScheme="green" as={Link} href="/quiz">Start quiz!</Button>
        </VStack>
      </Stack>
    </DefaultLayout>
  );
}
