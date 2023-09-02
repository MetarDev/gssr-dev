import { Footer } from "@/Components/Global/Footer";
import { Header } from "@/Components/Global/Header";
import { Container, Divider, Heading, VStack } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import React from "react";

const DefaultLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <>
    <Head title={title} />
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
        <Heading as="h1">{title}</Heading>
        <Divider />
        <VStack spacing={{ base: 4, lg: 8 }} alignItems={"flex-start"}>
          {children}
        </VStack>
      </VStack>
    </Container>
    <Footer />
  </>
);

export default DefaultLayout;
