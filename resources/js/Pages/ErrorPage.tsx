import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Metadata } from "@/types/meta";

export default function ErrorPage({
  status,
  metadata,
}: PageProps<{ status: number; metadata: Metadata }>) {
  const title = {
    503: "503: Service Unavailable",
    500: "500: Server Error",
    404: "404: Page Not Found",
    403: "403: Forbidden",
  }[status];

  const description = {
    503: "Sorry, we are doing some maintenance. Please check back soon.",
    500: "Whoops, something went wrong on our servers.",
    404: "Sorry, the page you are looking for could not be found.",
    403: "Sorry, you are forbidden from accessing this page.",
  }[status];

  return (
    <DefaultLayout justifyContent="center" metadata={metadata}>
      <Stack
        spacing={12}
        direction={{ base: "column", xl: "row" }}
        alignItems={{ base: "flex-start", xl: "center" }}
      >
        <VStack
          align={"left"}
          spacing={{ base: 8, md: 12 }}
          maxW={"xl"}
          alignItems={"flex-start"}
        >
          <Heading variant={"main-heading"} size={"3xl"}>
            {title}
          </Heading>
          <Text>{description}</Text>

          <Flex gap={4}>
            <Button colorScheme="green" as={Link} href="/quiz">
              Go to homepage
            </Button>
            <Button colorScheme="green" variant="outline" as={Link} href="/quiz">
              Start a random quiz!
            </Button>
          </Flex>
        </VStack>
      </Stack>
    </DefaultLayout>
  );
}
