import { Box, Container, useColorModeValue } from "@chakra-ui/react";

export const Footer = () => {
	return (
		<footer>
			<Container
				maxW={"container.xl"}
				height="footer_height"
				paddingLeft={{
					base: "content_horizontal_spacing",
					lg: "content_horizontal_spacing_lg",
				}}
				paddingRight={{
					base: "content_horizontal_spacing",
					lg: "content_horizontal_spacing_lg",
				}}
			>
				This is footer
			</Container>
		</footer>
	);
};
