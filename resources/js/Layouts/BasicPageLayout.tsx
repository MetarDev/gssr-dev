import { Footer } from "@/Components/Global/Footer";
import { Header } from "@/Components/Global/Header";
import { PageHead } from "@/Components/Global/PageHead";
import { Metadata } from "@/types/meta";
import { Container, Divider, Heading, VStack } from "@chakra-ui/react";
import React from "react";

const BasicPageLayout = ({
  children,
  meta,
  meta: {
    title,
  }
}: {
  meta: Metadata
  children: React.ReactNode;
}) => (
  <>
    <PageHead meta={meta} />
    <Header></Header>
    <Container
      maxW={"container.xl"}
      minHeight={{ base: "body_height", lg: "body_height_lg" }}
      marginTop={{
        base: "basic_page_vertical_spacing",
        lg: "basic_page_vertical_spacing_lg",
      }}
      marginBottom={{
        base: "basic_page_vertical_spacing",
        lg: "basic_page_vertical_spacing_lg",
      }}
      paddingLeft={{
        base: "content_horizontal_spacing",
        lg: "content_horizontal_spacing_lg",
      }}
      paddingRight={{
        base: "content_horizontal_spacing",
        lg: "content_horizontal_spacing_lg",
      }}
    >
      <VStack spacing={{ base: 8, lg: 16 }} alignItems={"flex-start"}>
        <Heading as="h1" size="xl" alignSelf={"center"}>{title}</Heading>
        <Divider />
        <VStack spacing={5} alignItems={"flex-start"} maxW={"xl"} margin={"auto"} width={"full"}>
          {children}
        </VStack>
      </VStack>
    </Container>
    <Footer />
  </>
);

export default BasicPageLayout;
