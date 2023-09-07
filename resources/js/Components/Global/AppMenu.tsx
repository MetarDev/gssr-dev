"use client";
import React from "react";
import { getIconSize } from "@/Helpers/icons";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Box, Flex, IconButton, Link } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";

export const AppMenu = () => {
  const { faIconSize, chakraIconSize } = getIconSize('lg');
	return (
    <Flex alignItems={"center"} gap={1}>
      <Link href="https://discord.gg/dCcDSgQq" isExternal>
        <IconButton
          aria-label="Discord"
          variant={"ghost"}
          colorScheme="gray"
          icon={<FaDiscord size={faIconSize} />}
        />
      </Link>
      <ColorModeSwitcher size={chakraIconSize} />
    </Flex>
	);
};
