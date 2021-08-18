import React from "react";
import { InputGroup, Input, InputLeftElement, Button, Stack, FormControl, Box, useColorMode, useToast } from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import AuthenticatedUser from "../../models/AuthUser";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const SignUpForm = () => {
  const API_URL = process.env.REACT_APP_BIKES_API_URL || 'http://localhost:4000/api';
  const { colorMode } = useColorMode();
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const history = useHistory();
  const firstNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const lastNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`${API_URL}/signUp`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      const responseData = await response.json();
      if (response.ok) {
        return responseData;
      } else {
        throw Error(responseData.message || response.statusText)
      }
    }).then((responseData: AuthenticatedUser) => {
      const expirationTime = new Date(
        new Date().getTime() + (responseData.expirationTime * 1000)
      );
      authContext.login(responseData.token, responseData.role, expirationTime.toISOString(), responseData.userId);
      history.push('/bikes');
    }).catch(error => {
      toast({
        title: `${error}`,
        status: 'error',
        isClosable: true,
        duration: 3000
      });
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<InfoIcon/>} />
            <Input
              type="text"
              placeholder="First name"
              aria-label="First name"
              ref={firstNameRef}
              bg={colorMode === 'light' ? 'white' : 'inherit'}
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<InfoIcon/>} />
            <Input
              type="text"
              placeholder="Last name"
              aria-label="Last name"
              ref={lastNameRef}
              bg={colorMode === 'light' ? 'white' : 'inherit'}
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<EmailIcon/>} />
            <Input
              type="email"
              placeholder="Email"
              aria-label="Email"
              ref={emailRef}
              bg={colorMode === 'light' ? 'white' : 'inherit'}
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<LockIcon/>} />
            <Input
              type="password"
              placeholder="Password"
              aria-label="Password"
              ref={passwordRef}
              bg={colorMode === 'light' ? 'white' : 'inherit'}
            />
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