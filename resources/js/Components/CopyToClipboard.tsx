import { IconButton, Tooltip, useClipboard } from "@chakra-ui/react";
import { LinkIcon, CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { IconSize } from "@/types/icon-size";
import { getIconSize } from "@/Helpers/icons";

export default function CopyToClipboard({
  toCopy,
  subject = "URL",
  marginLeft = 2,
  size = 'md',
  variant = 'outline',
}: {
  toCopy: string;
  subject?: string;
  marginLeft?: number;
  size: IconSize,
  variant?: 'outline' | 'solid';
}) {
  const { onCopy, hasCopied } = useClipboard(toCopy);

  const copyLabel = hasCopied
    ? `Copied ${subject} to clipboard!`
    : `Copy ${subject} to clipboard`;

  const {iconButtonSize, chakraIconSize} = getIconSize(size);

  return (
    <Tooltip label={copyLabel} fontSize="md" placement="top" closeOnClick={false}>
      <IconButton
        boxSize={iconButtonSize}
        marginLeft={marginLeft}
        aria-label={`Copy ${subject} to clipboard`}
        variant={variant}
        colorScheme={hasCopied ? "green" : "orange"}
        onClick={onCopy}
        disabled={hasCopied}
        icon={hasCopied ? <CheckIcon boxSize={chakraIconSize} /> : <LinkIcon boxSize={chakraIconSize} />}
      />
    </Tooltip>
  );
}
