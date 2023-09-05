import { Flex, Progress, Text } from "@chakra-ui/react";

const Countdown = ({
  from,
  value,
}: {
  from: number,
  value: number,
}) => {
  const valueAsPercentage = (value / from) * 100;

  return (
    <Flex alignItems={"center"} gap={4} marginTop={{base: 4, md: 8}} marginBottom={{ base: 4, md: 8}} flex={1}>
      <Progress size={"sm"} value={valueAsPercentage} colorScheme="gray" flexGrow={1} flexShrink={0} />
      <Text width={10} flexShrink={0}>{value}s</Text>
    </Flex>
  );
};

export default Countdown;
