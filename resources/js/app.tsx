import "./bootstrap";
import "../css/app.css";
import theme from "../../theme";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

createInertiaApp({
  title: (title) => title,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App {...props} />
      </ChakraProvider>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
