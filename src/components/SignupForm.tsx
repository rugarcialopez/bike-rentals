import React from "react";
import { InputGroup, Input, InputLeftElement, Button, Stack, FormControl, Box } from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";

const SignUpForm = () => {
  return (
    <form action="submit">
      <Stack spacing="24px" width="100vh">
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<InfoIcon/>} />
            <Input type="text" placeholder="First name" aria-label="First name"/>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<InfoIcon/>} />
            <Input type="text" placeholder="Last name" aria-label="Last name"/>
          </InputGroup>
        </FormControl>
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
            Sign up!
          </Button>
        </Box>
      </Stack>
    </form>
  )
}

export default SignUpForm;