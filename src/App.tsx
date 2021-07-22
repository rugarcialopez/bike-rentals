import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
  Center,
} from "@chakra-ui/react";
import Auth from "./pages/Auth";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="xl">
      <Center>
        <Auth/>
      </Center>
    </Box>
  </ChakraProvider>
)
