import { getIconSize } from "@/Helpers/icons";
import { IconSize } from "@/types/icon-size";
import { QuizSummaryInterface } from "@/types/quiz";
import { IconButton, Link, Tooltip, useColorMode } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappShareIcon = ({
  quizUrl,
  quizSummary,
  label = 'Share Quiz on WhatsApp',
  title = "Just finished a guessDev quiz:",
  beforeUrlText = "Try it out yourself:",
  size = 'md',
}: {
  quizUrl: string,
  quizSummary: QuizSummaryInterface;
  label?: string;
  title?: string;
  beforeUrlText?: string;
  size?: IconSize
}) => {
  const br = "%0A";

  const getStatsText = () => {
    let text = `- Score: ${quizSummary.score}/${quizSummary.maxScore}%0A`;
    text += `- Questions: ${quizSummary.correctQuestions}/${quizSummary.totalQuestions}%0A`;
    text += `- Avg time spent / question: ${quizSummary.avgTimePerQuestion}s%0A`;
    return text;
  }

  const getHref = () => {
    const fullText = `${title}${br}${getStatsText()}${br}${beforeUrlText} ${quizUrl}`;
    return `https://wa.me/?text=${fullText}`;
  }

  const {iconButtonSize, faIconSize} = getIconSize(size);

  return (
    <Tooltip label={label} fontSize="md" placement="top" closeOnClick={false}>
      <Link href={getHref()} isExternal>
        <IconButton
          boxSize={iconButtonSize}
          aria-label={label}
          colorScheme={"orange"}
          icon={<FaWhatsapp size={faIconSize} />}
        />
      </Link>
    </Tooltip>
  );
};

export default WhatsappShareIcon;
