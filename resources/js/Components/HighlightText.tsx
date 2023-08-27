"use client";
import { Text, useColorMode } from "@chakra-ui/react";

export const HighlightText = ({
	children,
  colorScheme = 'orange',
}: {
	children: React.ReactNode
  colorScheme?: 'orange' | 'green' | 'red',
}) => {
	const { colorMode } = useColorMode();
  const color = colorMode === 'dark' ? `${colorScheme}.400` : `${colorScheme}.600`;

	return (
		<Text as="span" color={color}>
			{children}
		</Text>
	)
}
