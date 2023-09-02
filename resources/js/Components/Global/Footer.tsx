/* global route */
import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

export const Footer = () => {
  return (
    <footer>
      <Container
        maxW={"container.xl"}
        height="footer_height"
        paddingLeft={{
          base: "content_horizontal_spacing",
          lg: "content_horizontal_spacing_lg",
        }}
        paddingRight={{
          base: "content_horizontal_spacing",
          lg: "content_horizontal_spacing_lg",
        }}
      >
        <SimpleGrid
          justifyContent={"space-between"}
          columns={{ base: 1, md: 2 }}
          spacing={4}
        >
          <List>
            <ListItem>
              <Link href={route("cookie-policy")}>Cookie Policy</Link>
            </ListItem>
          </List>

          <Box justifySelf={{ base: "flex-start", md: "flex-end"}}>
            <Text>
              All raw browser / feature support data provided by{" "}
              <Link href="https://caniuse.com/" isExternal>caniuse.com</Link>.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </footer>
  );
};
