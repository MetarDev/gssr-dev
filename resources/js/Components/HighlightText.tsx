"use client";
import { Text, useColorMode } from "@chakra-ui/react";

export const HighlightText = ({
	children
}: {
	children: React.ReactNode
}) => {
	const { colorMode } = useColorMode();
	return (
		<Text as="span" color={colorMode === 'dark' ? 'orange.400' : 'orange.600'}>
			{children}
		</Text>
	)
}