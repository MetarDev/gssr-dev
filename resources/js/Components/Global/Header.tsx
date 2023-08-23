"use client";
import React from "react";
import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link } from "@inertiajs/react";
import { Logo } from "./Logo";

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
              <Text marginLeft={4}>GUESS.DEV</Text>
            </Flex>
          </Link>
					<ColorModeSwitcher />
				</Flex>
			</Container>
		</header>
	);
};
