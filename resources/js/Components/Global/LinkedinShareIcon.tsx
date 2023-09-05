import { isMobile } from "@/Helpers/device";
import { getIconSize } from "@/Helpers/icons";
import { IconSize } from "@/types/icon-size";
import { QuizSummaryInterface } from "@/types/quiz";
import { IconButton, Link, Tooltip, useColorMode } from "@chakra-ui/react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

const LinkedinShareIcon = ({
  quizUrl,
  label = 'Share Quiz on Linkedin',
  size = 'md',
}: {
  quizUrl: string,
  label?: string;
  size?: IconSize
}) => {
  const href = `https://www.linkedin.com/sharing/share-offsite/?url=${quizUrl}`;

  const {iconButtonSize, faIconSize} = getIconSize(size);

  return (
    <Tooltip label={label} fontSize="md" placement="top" closeOnClick={false}>
      <Link href={href} isExternal>
        <IconButton
          boxSize={iconButtonSize}
          aria-label={label}
          colorScheme={"orange"}
          icon={<FaLinkedin size={faIconSize} />}
        />
      </Link>
    </Tooltip>
  );
};

export default LinkedinShareIcon;
