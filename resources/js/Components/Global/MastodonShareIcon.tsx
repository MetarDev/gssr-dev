import { getIconSize } from "@/Helpers/icons";
import { IconSize } from "@/types/icon-size";
import { QuizSummaryInterface } from "@/types/quiz";
import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { FaMastodon } from "react-icons/fa";

const MastodonShareIcon = ({
  quizUrl,
  quizSummary,
  label = 'Share Quiz on Mastodon',
  title = "Just finished a %23gssrDev quiz:",
  beforeUrlText = "Try it out yourself!",
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
    const fullText = `${title}${br}${getStatsText()}${br}${beforeUrlText}`;
    const url = `https://mastodonshare.com/?text=${fullText}&url=${quizUrl}`;
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
        icon={<FaMastodon size={faIconSize} />}
      />
    </Tooltip>
  );
};

export default MastodonShareIcon;
