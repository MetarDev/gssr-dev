import { IconButton, Tooltip, useClipboard } from "@chakra-ui/react";
import { LinkIcon, CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function CopyToClipboard({
  toCopy,
  subject = "URL",
  marginLeft = 2,
}: {
  toCopy: string;
  subject?: string;
  marginLeft?: number;
}) {
  const { onCopy, hasCopied } = useClipboard(toCopy);

  const copyLabel = hasCopied
    ? `Copied ${subject} to clipboard!`
    : `Copy ${subject} to clipboard`;

  return (
    <Tooltip label={copyLabel} fontSize="md" placement="top" closeOnClick={false}>
      <IconButton
        marginLeft={marginLeft}
        aria-label={`Copy ${subject} to clipboard`}
        variant={"outline"}
        colorScheme={hasCopied ? "green" : "orange"}
        onClick={onCopy}
        disabled={hasCopied}
        icon={hasCopied ? <CheckIcon /> : <LinkIcon />}

      />
    </Tooltip>
  );
}
