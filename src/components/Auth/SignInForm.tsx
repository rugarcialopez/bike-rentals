import React from "react";
import { InputGroup, Input, InputLeftElement, Button, Stack, FormControl, useColorMode, Box, useToast } from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthenticatedUser from "../../models/AuthUser";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import ApiError from "../../models/ApiError";

const SignInForm = () => {
  const API_URL = process.env.REACT_APP_BIKES_API_URL || 'http://localhost:4000/api';
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signIn`, {
        method: 'POST',
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const responseData: ApiError = await response.json();
        throw new Error(responseData.message || response.statusText);
      }
      const responseData: AuthenticatedUser = await response.json();
      const expirationTime = new Date(
        new Date().getTime() + (responseData.expirationTime * 1000)
      );
      authContext.login(responseData.token, responseData.role, expirationTime.toISOString(), responseData.userId);
      history.push('/bikes');
    } catch (error) {
      toast({
        title: `${error}`,
        status: 'error',
        isClosable: true,
        duration: 3000
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <Stack spacing={3}>
      <FormControl isRequired>
        <InputGroup>
          <InputLeftElement children={<EmailIcon/>} />
          <Input
            type='email'
            placeholder='Email'
            aria-label='Email'
            bg={colorMode === 'light' ? 'white' : 'inherit'}
            ref={emailRef}
          />
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <InputGroup>
          <InputLeftElement children={<LockIcon/>} />
          <Input
            type='password'
            placeholder='Password'
            aria-label='Password'
            bg={colorMode === 'light' ? 'white' : 'inherit'}
            ref={passwordRef}
          />
        </InputGroup>
      </FormControl>
      <Box textAlign="center">
        <Button
          type='submit'
          boxShadow='sm'
          _hover={{ boxShadow: 'md' }}
          _active={{ boxShadow: 'lg' }}>
          Sign in!
        </Button>
      </Box>
    </Stack>
  </form>
  )
}

export default SignInForm;