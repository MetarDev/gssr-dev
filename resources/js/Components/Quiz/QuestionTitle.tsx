import React from "react";
import { Heading } from "@chakra-ui/react";
import { QuestionInterface } from "@/types/quiz";

const QuestionTitle = ({
	question,
}: {
	question: QuestionInterface;
}) => {

	const {
		featureSupportData,
		browserSupportData,
		globalUsageData,
	} = question;

  console.log({
    type: question.type,
  })

	switch(question.type) {
		case "feature_support":

			if (!featureSupportData) {
				return <></>;
			}

			return (
				<Heading as="h1" marginBottom={6}>
					Which {featureSupportData.subjectType.toUpperCase()} feature {featureSupportData.isSupported ? 'IS' : 'IS NOT '} supported by {featureSupportData.browserName} {featureSupportData.browserVersion} ({featureSupportData.browserYear})
				</Heading>
			);
		case "browser_support":
			if (!browserSupportData) {
				return <></>;
			}

			return (
				<Heading as="h1" marginBottom={6}>
					Which {browserSupportData.subjectType} browser {browserSupportData.isSupported ? 'SUPPORTS' : 'DOES NOT SUPPORT'} {browserSupportData.featureShortName} {`(${browserSupportData.featureFullName})`}
				</Heading>
			);
		case "usage_global":
			if (!globalUsageData) {
				return <></>;
			}

			return (
				<Heading as="h1" marginBottom={6}>
					Which {globalUsageData.subjectType.toUpperCase()} feature is {globalUsageData.isMostUsed ? 'MOST' : 'LEAST'} globally supported?
				</Heading>
			);
		default:
			return <></>;
	}
};

export default QuestionTitle;
