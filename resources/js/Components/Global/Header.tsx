"use client";
import React from "react";
import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import { Logo } from "./Logo";
import { AppMenu } from "./AppMenu";

export const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<header>
			<Container
				maxW={"container.xl"}
				paddingX={4}
				paddingY={4}
				height="header_height"
				paddingLeft={{
					base: "content_horizontal_spacing",
					lg: "content_horizontal_spacing_lg",
				}}
				paddingRight={{
					base: "content_horizontal_spacing",
					lg: "content_horizontal_spacing_lg",
				}}
			>
				<Flex justifyContent={"space-between"} alignItems={"center"}>
					<Link href="/">
            <Flex alignItems={"center"}>
              <Logo />
              <Text
                marginLeft={2}
                fontWeight={"bold"}
                color={colorMode === 'dark' ? "orange.100" : "black"}
                textTransform={"uppercase"}
                display={{base: "none", md: "block"}}
              >GSSR.DEV</Text>
            </Flex>
          </Link>
          <AppMenu />
				</Flex>
			</Container>
		</header>
	);
};
