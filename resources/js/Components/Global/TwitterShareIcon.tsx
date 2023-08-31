import { getIconSize } from "@/Helpers/icons";
import { IconSize } from "@/types/icon-size";
import { QuizSummaryInterface } from "@/types/quiz";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";

const TwitterShareIcon = ({
  quizUrl,
  quizSummary,
  label = 'Share Quiz on X',
  title = "Just finished a %23guessDev quiz:",
  beforeUrlText = "🔗 Try it out yourself:",
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
    let text = `⭐ Score: ${quizSummary.score}/${quizSummary.maxScore}%0A`;
    text += `✅ Questions: ${quizSummary.correctQuestions}/${quizSummary.totalQuestions}%0A`;
    text += `⌛ Avg time spent / question: ${quizSummary.avgTimePerQuestion}s%0A`;
    return text;
  }

  const onClick = () => {
    const fullText = `${title}${br}${getStatsText()}${br}${beforeUrlText} ${quizUrl}`;
    const url = `https://twitter.com/intent/tweet?text=${fullText}`
    window.open(url, "_blank");
  }

  const {iconButtonSize, faIconSize} = getIconSize(size);

  return (
    <Tooltip label={label} fontSize="md" placement="top" closeOnClick={false}>
      <IconButton
        boxSize={iconButtonSize}
        aria-label={label}
        colorScheme={"orange"}
        onClick={onClick}
        icon={<FaTwitter size={faIconSize} />}
      />
    </Tooltip>
  );
};

export default TwitterShareIcon;
