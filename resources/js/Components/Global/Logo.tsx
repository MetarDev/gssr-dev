import { useColorMode } from "@chakra-ui/react";

export const Logo = ({ size = 42 }) => {
  const { colorMode } = useColorMode();

  const defaultRowColor = colorMode === "dark" ? "var(--chakra-colors-orange-100)" : "var(--chakra-colors-orange-900)";
  const highlightedRowColor = colorMode === "dark" ? "var(--chakra-colors-orange-400)" : "var(--chakra-colors-orange-400)";

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
    >
      <rect x="0" y="0" width={size} height={size} />
      <g>
        <path
          fill={defaultRowColor}
          d="m6,2.78c-.11.59-.2,1.21-.27,1.83h-2.18c.62-.82,1.47-1.46,2.45-1.83Z"
        />
        <path
          fill={defaultRowColor}
          d="m9.07,2.51c.13.59.25,1.3.34,2.1h-2.83c.09-.8.21-1.5.34-2.1.35-.07.7-.11,1.07-.11s.72.03,1.07.11Z"
        />
        <path
          fill={defaultRowColor}
          d="m12.45,4.61h-2.18c-.07-.63-.16-1.25-.27-1.83.98.37,1.82,1.02,2.45,1.83Z"
        />
        <path
          fill={defaultRowColor}
          d="m5.61,11.39c.04.58.1,1.17.17,1.75-.89-.38-1.65-.99-2.23-1.75h2.06Z"
        />
        <path
          fill={defaultRowColor}
          d="m9.54,11.39c-.05.76-.13,1.44-.22,2.05-.42.1-.86.16-1.32.16s-.89-.05-1.32-.16c-.09-.61-.17-1.29-.22-2.05h3.08Z"
        />
        <path
          fill={defaultRowColor}
          d="m12.45,11.39c-.58.76-1.34,1.36-2.23,1.75.07-.58.13-1.17.17-1.75h2.06Z"
        />
        <path
          fill={defaultRowColor}
          d="m5.51,8.65c0,.6.02,1.31.06,2.05h-2.46c-.39-.71-.63-1.51-.68-2.36h3.09c0,.11,0,.21,0,.31Z"
        />
        <path
          fill={defaultRowColor}
          d="m9.63,8.34c0,.1,0,.21,0,.31,0,.73-.02,1.42-.05,2.05h-3.16c-.04-.64-.05-1.32-.05-2.05,0-.1,0-.21,0-.31h3.26Z"
        />
        <path
          fill={defaultRowColor}
          d="m13.58,8.34c-.05.86-.29,1.66-.68,2.36h-2.46c.04-.75.06-1.45.06-2.05,0-.1,0-.2,0-.31h3.09Z"
        />
        <path
          fill={highlightedRowColor}
          d="m3.1,5.3h2.56c-.08.82-.12,1.63-.14,2.36h-3.1c.05-.86.29-1.66.68-2.36Z"
        />
        <path
          fill={highlightedRowColor}
          d="m9.62,7.66h-3.24c.02-.86.07-1.65.13-2.36h2.98c.07.72.11,1.5.13,2.36Z"
        />
        <path
          fill={highlightedRowColor}
          d="m13.58,7.66h-3.1c-.02-.73-.07-1.54-.14-2.36h2.56c.39.71.63,1.51.68,2.36Z"
        />
      </g>
    </svg>
  );
};
