import React from "react";
import { Alert, AlertIcon, Stack } from "@chakra-ui/react";

const InfoMessage: React.FC<{ message: string}> = (props) => {
  return (
  <Stack spacing={3}>
    <Alert status="info">
      <AlertIcon />
      { props.message }
    </Alert>
  </Stack>
  )
};

export default InfoMessage;