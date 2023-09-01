// theme/index.js
import {
  StyleFunctionProps,
  defineStyleConfig,
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps,
} from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Foundational style overrides
import colors from "./foundations/colors";

const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  styles,
  // Foundations
  colors,
  // Components
  components: {
    Heading: {
      baseStyle: (props: StyleFunctionProps) => ({
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
      }),
      variants: {
        "main-heading": {
          lineHeight: "120%",
        },
      },
    },
    Text: {
      baseStyle: (props: StyleFunctionProps) => ({
        color: props.colorMode === "dark" ? "gray.400" : "gray.600",
      }),
    },
    Progress: defineStyleConfig({
      baseStyle: {
        track: {
          borderRadius: "md", // <-- this doesn't work
        },
        filledTrack: {
          borderRadius: "md",
        },
      },
    }),
    Modal: defineStyleConfig({
      baseStyle: (props: StyleFunctionProps) => ({
        header: {
          padding: 8,
          fontSize: {base: 24, md: 28}
        },
        dialog: {
          borderRadius: "lg",
          overflow: "hidden",
          margin: "auto",
          backgroundColor: props.colorMode === "dark" ? "gray.800" : "gray.200"
        },
        footer: {
          marginTop: 8
        },
      }),
      defaultProps: {
        size: "xl"
      },
    }),
  },
  /*
	export const foundations = {
		breakpoints,
		zIndices,
		radii,
		blur,
		colors,
		...typography,
		sizes,
		shadows,
		space: spacing,
		borders,
		transition,
	}
	*/
  // https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/foundations/index.ts#L13
  semanticTokens: {
    colors: {
      brandTextDefault: {
        default: "gray.800",
        _dark: "gray.100",
      },
      brandTextLight: {
        default: "gray.600",
        _dark: "gray.400",
      },
    },
    sizes: {
      header_height: "72px",
      footer_height: "72px",
      body_height: `calc(100vh - ${2 * 72}px - 2*var(--chakra-space-8))`, // 100vh - header - footer
      body_height_lg: `calc(100vh - ${2 * 72}px - 2*var(--chakra-space-16))`, // 100vh - header - footer
    },
    space: {
      content_vertical_spacing: 8,
      content_vertical_spacing_lg: 16,
      content_horizontal_spacing: 8,
      content_horizontal_spacing_lg: 16,
    },
    minHeight: {},
  },
};

export default extendTheme(
  withDefaultColorScheme({
    colorScheme: "orange",
    components: [
      "Button",
      "IconButton",
      "Badge",
      "Tabs",
      "Radio",
      "Code",
      "Progress",
    ],
  }),
  withDefaultProps({
    defaultProps: {
      color: "gray.100",
    },
    components: ["Heading"],
  }),
  theme
);
