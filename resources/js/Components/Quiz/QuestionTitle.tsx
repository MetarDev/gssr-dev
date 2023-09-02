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

  const headingProps: {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    marginBottom: number,
    size: string|{ base: string, md?: string },
  } = {
    as: "h1",
    marginBottom: 6,
    size: { base: "lg" },
  };

	switch(question.type) {
		case "feature_support":

			if (!featureSupportData) {
				return <></>;
			}

			return (
				<Heading {...headingProps}>
					Which {featureSupportData.subjectType.toUpperCase()} feature <HighlightSupports condition={featureSupportData.isSupported} supportsText="is" notSupportsText="is not" /> supported by <Code style={{ fontSize: "inherit"}}>{featureSupportData.browserName} {featureSupportData.browserVersion}</Code> ({featureSupportData.browserYear})?
				</Heading>
			);
		case "browser_support":
			if (!browserSupportData) {
				return <></>;
			}

			return (
				<Heading {...headingProps}>
					Which browser <HighlightSupports condition={browserSupportData.isSupported} supportsText="supports" notSupportsText="does not support" /> <Code style={{ fontSize: "inherit"}}>{browserSupportData.featureShortName}</Code> {`(${browserSupportData.featureFullName})`}?
				</Heading>
			);
		case "usage_global":
			if (!globalUsageData) {
				return <></>;
			}

			return (
				<Heading {...headingProps}>
					Which {globalUsageData.subjectType.toUpperCase()} feature is <HighlightSupports condition={globalUsageData.isMostUsed} supportsText="most" notSupportsText="least" /> globally supported?
				</Heading>
			);
		default:
			return <></>;
	}
};

export default QuestionTitle;
