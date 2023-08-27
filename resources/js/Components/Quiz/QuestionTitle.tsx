import React from "react";
import { Heading, Code } from "@chakra-ui/react";
import { QuestionInterface } from "@/types/quiz";
import HighlightSupports from "./HighlightSupports";

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

  const headingProps: {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    marginBottom: number,
    size: { base: string, lg: string },
  } = {
    as: "h1",
    marginBottom: 6,
    size: { base: "md", lg: 'xl' },
  };

	switch(question.type) {
		case "feature_support":

			if (!featureSupportData) {
				return <></>;
			}

			return (
				<Heading {...headingProps}>
					Which {featureSupportData.subjectType.toUpperCase()} feature <HighlightSupports condition={featureSupportData.isSupported} supportsText="IS" notSupportsText="IS NOT" /> supported by <Code style={{ fontSize: "inherit"}}>{featureSupportData.browserName} {featureSupportData.browserVersion}</Code> ({featureSupportData.browserYear})
				</Heading>
			);
		case "browser_support":
			if (!browserSupportData) {
				return <></>;
			}

			return (
				<Heading {...headingProps}>
					Which {browserSupportData.subjectType} browser <HighlightSupports condition={browserSupportData.isSupported} supportsText="SUPPORTS" notSupportsText="DOES NOT SUPPORT" /> <Code style={{ fontSize: "inherit"}}>{browserSupportData.featureShortName}</Code> {`(${browserSupportData.featureFullName})`}
				</Heading>
			);
		case "usage_global":
			if (!globalUsageData) {
				return <></>;
			}

			return (
				<Heading {...headingProps}>
					Which {globalUsageData.subjectType.toUpperCase()} feature is <HighlightSupports condition={globalUsageData.isMostUsed} supportsText="MOST" notSupportsText="LEAST" /> globally supported?
				</Heading>
			);
		default:
			return <></>;
	}
};

export default QuestionTitle;
