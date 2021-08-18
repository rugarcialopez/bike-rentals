import { Alert, AlertIcon, AlertTitle, Stack } from "@chakra-ui/react";
import React from "react";

const NotFoundPage = () => {
  return (
    <Stack
      borderColor='gray.100'
      borderWidth='2px'
      p='4'
      borderRadius='lg'
      width='100%'
      maxW={{base: '90vw', sm: '80vw' , lg: '50vw', xl: '40vw'}}
    >
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Page not found!</AlertTitle>
      </Alert>
    </Stack>
  );
};

export default NotFoundPage;