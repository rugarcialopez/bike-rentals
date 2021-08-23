import React from "react";
import { Alert, AlertIcon, Stack } from "@chakra-ui/react";

const ErrorMessage: React.FC<{ message: string}> = (props) => {
  return (
  <Stack spacing={3}>
    <Alert status="error">
      <AlertIcon />
      { props.message }
    </Alert>
  </Stack>
  )
};

export default ErrorMessage;