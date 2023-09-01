import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  ScaleFade,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useCounter,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AnimatedScore = ({
  current,
  addition,
  isAnimating,
}: {
  current: number;
  addition: number;
  isAnimating: boolean;
}) => {
  const [score, setScore] = useState(current);
  const [scoreInterval, setScoreInterval] = useState<NodeJS.Timeout | null>(null); // [1
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  /**
   * Calculated the interval duration so the score increase takes about 2s
   *
   * @returns {number}
   */
  const calculateInterval = () => {
    const duration = 2000;
    const steps = duration / 50;
    const total = addition;
    const interval = total / steps;

    return interval;
  }

  // First use effect for starting the animation
  useEffect(() => {
    if (isAnimating && !isAnimationRunning && !scoreInterval && addition > 0) {

      // Start the animation for the score.
      setTimeout(() => {
        setScoreInterval(setInterval(() => {
          setScore((prev) => prev + 1);
        }, calculateInterval()));
      }, 1000);

      // Start the timeout for the added score animation.
      setIsAnimationRunning(true);
    }
  }, [isAnimating, scoreInterval, isAnimationRunning, addition]);

  // Ending the animation.
  useEffect(() => {
    if (scoreInterval && score >= current + addition) {
      clearInterval(scoreInterval);

      setTimeout(() => {
        setIsAnimationRunning(false);
      }, 1000);
    }

    return () => {
      if (scoreInterval && !isAnimationRunning) {
        clearInterval(scoreInterval);
      }
    }
  }, [score, isAnimating, isAnimationRunning]);

  return (
    <Flex alignItems={"center"}>
      <Text as="span">{score}</Text>

      {addition > 0 && (
        <ScaleFade initialScale={0.2} in={isAnimationRunning}>
          <Tag marginLeft={4} variant="subtle" colorScheme="green">
            <TagLeftIcon boxSize="12px" as={AddIcon} />
            <TagLabel>{addition}</TagLabel>
          </Tag>
        </ScaleFade>
      )}
    </Flex>
  );
};

export default AnimatedScore;
