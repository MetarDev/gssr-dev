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

	// Which of the following ${realFeatureType.toUpperCase()} features IS ${isSupported ? '' : 'NOT '} supported by ${agents[browser].browser} ${version} (${browserYear})?
	// title: `Which of the following ${realBrowserType} browsers ${isSupported ? 'SUPPORTS' : 'DOESN\'T SUPPORT '} <code>${feature}</code> (${data[feature].title})?`,

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
					Which of the following {featureSupportData.featureType.toUpperCase()} features is {featureSupportData.isSupported ? '' : ' NOT '} supported by {featureSupportData.browserName} {featureSupportData.browserVersion}
				</Heading>
			);
		case "browser_support":
			if (!browserSupportData) {
				return <></>;
			}

			return (
				<Heading as="h1" marginBottom={6}>
					Which of the following {browserSupportData.browserType} browsers {browserSupportData.isSupported ? 'SUPPORTS' : 'DOESN\'T SUPPORT '} {browserSupportData.featureShortName} {`(${browserSupportData.featureFullName})`}
				</Heading>
			);
		case "usage_global":
			if (!globalUsageData) {
				return <></>;
			}

			return (
				<Heading as="h1" marginBottom={6}>
					Which feature is {globalUsageData.isMostUsed ? 'MOST' : 'LEAST'} globally supported?
				</Heading>
			);
		default:
			return <></>;
	}
};

export default QuestionTitle;
