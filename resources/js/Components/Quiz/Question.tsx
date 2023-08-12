import React from "react";
import { Button, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { AnswerInterface, QuestionInterface } from "@/types/quiz";

const Question = ({
	question: {
    answers
  },
	isCurrentQuestionAnswered,
	subtitle = "",
	onAnswer = (answer: AnswerInterface) => {},
	onNextQuestion,
}: {
	question: QuestionInterface;
	answers: AnswerInterface[];
	isCurrentQuestionAnswered: boolean;
	subtitle: string;
	onAnswer?: (answer: AnswerInterface) => void;
	onNextQuestion?: () => void;
}) => (
	<div>
		<Heading as="h2" textColor={"gray.500"} size="sm" marginBottom={2}>
			{subtitle}
		</Heading>
		<Flex gap={4} flexDirection={"column"} justifyContent="space-between">
			{answers.map((answer, index) => (
				<div key={answer.title}>
					<Button
						flexGrow="1"
						flexShrink="50%"
						onClick={() => onAnswer(answer)}
						isDisabled={isCurrentQuestionAnswered}
						variant="outline"
					>
						{answer.title}
						{answer.isHighlighted && answer.isCorrect && "✅"}
						{answer.isHighlighted && !answer.isCorrect && "❌"}
					</Button>
					<Text>{answer.description}</Text>
				</div>
			))}

			{isCurrentQuestionAnswered && (
				<Button flexGrow="1" flexShrink="50%" onClick={onNextQuestion}>
					Next Question
				</Button>
			)}
		</Flex>
	</div>
);

export default Question;
