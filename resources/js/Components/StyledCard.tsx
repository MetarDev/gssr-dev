"use client";
import { Card, CardProps, useColorMode } from "@chakra-ui/react";

export const StyledCard = ({
  children,
  cardProps = {},
}: {
  children: React.ReactNode;
  cardProps?: CardProps;
}) => {
  const { colorMode } = useColorMode();
  return (
    <Card
      background={colorMode === "dark" ? "gray.900" : "white"}
      {...cardProps}
      padding={{ base: 4, md: 8 }}
    >
      {children}
    </Card>
  );
};
