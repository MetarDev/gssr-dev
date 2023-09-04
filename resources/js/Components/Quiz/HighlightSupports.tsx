import { Text, useColorMode } from "@chakra-ui/react";

const HighlightSupports = ({
  condition,
  supportsText,
  notSupportsText,
}: {
  condition: boolean;
  supportsText: string;
  notSupportsText: string;
}) => {
  const { colorMode } = useColorMode();
  const supportsColor = colorMode === "dark" ? "green.300" : "green.600";
  const notSupportsColor = colorMode === "dark" ? "red.300" : "red.600";
  return (
    <Text
      as="span"
      color={condition ? supportsColor : notSupportsColor}
    >
      {condition ? supportsText : notSupportsText}
    </Text>
  );
};

export default HighlightSupports;
