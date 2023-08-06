import { Footer } from "@/Components/Global/Footer";
import { Header } from "@/Components/Global/Header";
import { Container } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import React from "react";

const DefaultLayout = ({
    title,
    children,
    justifyContent = "flex-start",
}: {
    title: string,
    children: React.ReactNode;
    justifyContent?: string;
}) => (
    <>
        <Head title="" />
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
