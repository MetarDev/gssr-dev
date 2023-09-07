import { Flex, Progress, Text } from "@chakra-ui/react";

const Countdown = ({
  from,
  value,
}: {
  from: number,
  value: number,
}) => {
  const valueAsPercentage = (value / from) * 100;

  const progressColorScheme = valueAsPercentage > 50 ? "gray" : valueAsPercentage > 20 ? "yellow" : "red";
  const textColor = valueAsPercentage > 50 ? "brandTextLight" : valueAsPercentage > 20 ? "brandTextYellow" : "brandTextRed";

  return (
    <Flex alignItems={"center"} gap={4} marginTop={{base: 4, md: 8}} marginBottom={{ base: 4, md: 8}} flex={1}>
      <Progress size={"sm"} value={valueAsPercentage} colorScheme={progressColorScheme} flexGrow={1} flexShrink={0} />
      <Text
        width={10}
        flexShrink={0}
        color={textColor}
      >{value}s</Text>
    </Flex>
  );
};

export default Countdown;
