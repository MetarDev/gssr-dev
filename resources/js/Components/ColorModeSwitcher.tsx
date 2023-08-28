"use client";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, IconButton, useColorMode } from "@chakra-ui/react";

export const ColorModeSwitcher = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<header>
			<IconButton
        onClick={toggleColorMode}
        variant={"ghost"}
        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      />
		</header>
	)
}
