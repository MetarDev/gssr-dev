import { Footer } from "@/Components/Global/Footer";
import { Header } from "@/Components/Global/Header";
import { PageHead } from "@/Components/Global/PageHead";
import { Metadata } from "@/types/meta";
import { Box, Container } from "@chakra-ui/react";
import React from "react";

const DefaultLayout = ({
  children,
  justifyContent = "flex-start",
  metadata,
}: {
  children: React.ReactNode;
  justifyContent?: string;
  metadata: Metadata,
}) => (
  <>
    <PageHead meta={metadata} />
    <Header></Header>
    <Container
      maxW={"container.xl"}
      minHeight={{ base: "body_height", lg: "body_height_lg" }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={justifyContent}
      marginTop={{
        base: "content_vertical_spacing",
        lg: "content_vertical_spacing_lg",
      }}
      marginBottom={{
        base: "content_vertical_spacing",
        lg: "content_vertical_spacing_lg",
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
      {children}
    </Container>
    <Footer />
  </>
);

export default DefaultLayout;
