import { Heading, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import BasicPageLayout from "@/Layouts/BasicPageLayout";
import { Metadata } from "@/types/meta";

export default function CookiePolicy({
  metadata,
}: {
  metadata: Metadata,
}) {
  return (
    <BasicPageLayout meta={metadata}>
      <Heading as="h2" size="lg">What is GSSR.DEV?</Heading>
      <Text>Gssr.dev is a quiz app, where you can take quizzes generated based on caniuse.com data.</Text>
      <Text>Questions are in the format of:</Text>
      <UnorderedList>
        <ListItem>
          <Text>Which browser supports / doesn't support feature X?</Text>
        </ListItem>
        <ListItem>
          <Text>Which feature is / isn't supported by browser X?</Text>
        </ListItem>
        <ListItem>
          <Text>Which feature is most / least globally supported?</Text>
        </ListItem>
      </UnorderedList>
      <Text>The site is built in free time by Ivan Grginov (@MetarDev):</Text>
      <UnorderedList>
        <ListItem>
          <Text>Twitter: <Link href="https://twitter.com/MetarDev" isExternal>https://twitter.com/MetarDev</Link></Text>
        </ListItem>
        <ListItem>
          <Text>GitHub: <Link href="https://github.com/MetarDev">https://github.com/MetarDev</Link>
          </Text>
        </ListItem>
      </UnorderedList>
      <Heading as="h2" size="lg">Community</Heading>
      <Text>We have a community on Discord. Join to discuss the quizzes, suggest new features, report bugs or just hang out: <Link display="inlineBlock" href="https://discord.gg/dCcDSgQq" isExternal>https://discord.gg/dCcDSgQq</Link></Text>
      <Heading as="h2" size="lg">FAQ</Heading>
      <Heading as="h3" size="md">How many quizzes are there?</Heading>
      <Text>Currently there are ~10,000 different generated Quizzes. While there may be some question overlap, most quizzes have unique questions.</Text>
      <Heading as="h3" size="md">Are the stats / score for a quiz I finish tracked anywhere?</Heading>
      <Text>Not yet, tho this feature is in the backlog.</Text>
      <Heading as="h3" size="md">Can I create my own quiz?</Heading>
      <Text>Not yet, tho this feature is in the backlog.</Text>
      <Heading as="h3" size="md">Can I create my own quiz?</Heading>
      <Text>Not yet, tho this feature is in the backlog.</Text>
    </BasicPageLayout>
  );
}
