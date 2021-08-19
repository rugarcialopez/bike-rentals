import React from "react";
import {
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Stack,
  FormControl,
  Box,
  Select,
  useColorMode,
  useToast } from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import AuthenticatedUser from "../../models/AuthUser";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const UserForm = () => {
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
    // fetch(`${API_URL}/signUp`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     firstName: firstNameRef.current.value,
    //     lastName: lastNameRef.current.value,
    //     email: emailRef.current.value,
    //     password: passwordRef.current.value
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(async (response) => {
    //   const responseData = await response.json();
    //   if (response.ok) {
    //     return responseData;
    //   } else {
    //     throw Error(responseData.message || response.statusText)
    //   }
    // }).then((responseData: AuthenticatedUser) => {
    //   const expirationTime = new Date(
    //     new Date().getTime() + (responseData.expirationTime * 1000)
    //   );
    //   authContext.login(responseData.token, responseData.role, expirationTime.toISOString(), responseData.userId);
    //   history.push('/bikes');
    // }).catch(error => {
    //   toast({
    //     title: `${error}`,
    //     status: 'error',
    //     isClosable: true,
    //     duration: 3000
    //   });
    // })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        bg='gray.200'
        spacing={3}
        borderColor='gray.100'
        borderWidth='2px'
        borderRadius='lg'
        p={6}
        w='100vw'
        maxW={{base: '90vw', sm: '80vw' , lg: '50vw', xl: '40vw'}}
        boxShadow='sm'
			  rounded='lg'
      >
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
        <FormControl isRequired>
          <Select placeholder="Select option" bg={colorMode === 'light' ? 'white' : 'inherit'}>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </Select>
        </FormControl>
        <Box textAlign="center">
          <Button
            type='submit'
            boxShadow='sm'
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}>
            Add
          </Button>
        </Box>
      </Stack>
    </form>
  )
}

export default UserForm;