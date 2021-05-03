import { ChakraProvider, CSSReset, theme } from "@chakra-ui/react";

import React from "react";
import { Router } from "./routes/Router";
function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset/>
      <Router />
    </ChakraProvider>
  )
}

export default App;