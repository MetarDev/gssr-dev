"use client";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, IconButton, useColorMode } from "@chakra-ui/react";

export const ColorModeSwitcher = ({ size }: { size: number }) => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<header>
			<IconButton
        onClick={toggleColorMode}
        variant={"ghost"}
        colorScheme="gray"
        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        icon={colorMode === 'light' ? <MoonIcon boxSize={size} /> : <SunIcon boxSize={size} />}
      />
		</header>
	)
}
