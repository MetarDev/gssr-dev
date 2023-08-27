import { Flex, Progress, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Countdown = ({
  initial,
  onTimeout,
}: {
  initial: number,
  onTimeout: () => void,
}) => {
  const [current, setCurrent] = useState(initial);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev - 1);
    }, 1000);

    if (current <= 0) {
      onTimeout();
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  const valueAsPercentage = (current / initial) * 100;

  return (
    <Flex alignItems={"center"} gap={4} marginTop={8} marginBottom={8}>
      <Text width={10} flexShrink={0}>{current}s</Text>
      <Progress size={"md"} value={valueAsPercentage} colorScheme="gray" flexGrow={1} flexShrink={0} />
    </Flex>
  );
};

export default Countdown;
