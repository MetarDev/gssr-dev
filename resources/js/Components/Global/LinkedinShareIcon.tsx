import { getIconSize } from "@/Helpers/icons";
import { IconSize } from "@/types/icon-size";
import { IconButton, Link, Tooltip } from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";

const LinkedinShareIcon = ({
  quizUrl,
  label = 'Share Quiz on Linkedin',
  size = 'md',
}: {
  quizUrl: string,
  label?: string;
  size?: IconSize
}) => {
  const href = `https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${encodeURI(quizUrl)}&display=popup&ref=plugin&src=share_button`;

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
