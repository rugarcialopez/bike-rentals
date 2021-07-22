import React from "react";
import { InputGroup, Input, InputLeftElement, Button, Stack, FormControl, Box } from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

const LoginForm = () => {
  return (
    <form action="submit">
      <Stack spacing="24px" width="100vh">
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<EmailIcon/>} />
            <Input type="email" placeholder="Email" aria-label="Email"/>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<LockIcon/>} />
            <Input type="password" placeholder="Password" aria-label="Password"/>
          </InputGroup>
        </FormControl>
        <Box textAlign="center">
          <Button
            type='submit'
            boxShadow='sm'
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}>
            Login!
          </Button>
        </Box>
      </Stack>
    </form>
  )
}

export default LoginForm;