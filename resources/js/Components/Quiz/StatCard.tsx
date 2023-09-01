import { Flex, Heading, Progress, Stat, Text, VStack } from "@chakra-ui/react";
import { stat } from "fs";
import { StyledCard } from "../StyledCard";

const StatsCard = ({
  title,
  children,
  valueAsPercentage,
  icon,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  valueAsPercentage?: number;
  icon: React.ReactNode;
}) => {
  return (
    <StyledCard>
      <Stat>
        <VStack alignItems={"flex-start"} gap={0}>
          <Text as="h3" color={"brandTextLight"}>
            {title}
          </Text>
          <Flex
            justifyContent={"space-between"}
            gap={2}
            alignItems={"center"}
            width={"full"}
            marginBottom={4}
          >
            <Text as="h3" fontSize={"2xl"} color={"brandTextDefault"}>
              {children}
            </Text>
            {icon}
          </Flex>

          <Progress
            size={"sm"}
            w={"full"}
            value={valueAsPercentage}
            colorScheme="orange"
            flexGrow={1}
            flexShrink={0}
          />
        </VStack>
      </Stat>
    </StyledCard>
  );
};

export default StatsCard;
