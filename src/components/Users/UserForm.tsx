import React, { Fragment, useImperativeHandle } from "react";
import {
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Stack,
  FormControl,
  Box,
  Select} from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../../store/users-slice";
import { RootState } from "../../store";
import { useEffect } from "react";
import ErrorMessage from "../UI/ErrorMessage";

type UserFormProps = {
  editMode: boolean
}
    
type UserFormHandle = {
  setValues: (firstName: string, lastName: string, email: string, role: string) => void,
}

const UserForm = React.forwardRef((props: UserFormProps, ref: React.Ref<UserFormHandle>) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);
  const name = useSelector((state: RootState) => state.users.name);
  const firstNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const lastNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const roleRef = useRef() as React.MutableRefObject<HTMLSelectElement>;


  const setValues = (firstName: string, lastName: string, email: string, role: string) => {
    firstNameRef.current.value = firstName;
    lastNameRef.current.value = lastName;
    emailRef.current.value = email;
    roleRef.current.value = role;
  }

  useImperativeHandle(ref, () => {
    return {
      setValues: setValues
    }
  });

  useEffect(() => {
    if (['ADD', 'UPDATE'].includes(name) && status === 'completed' && error === '') {
      history.push('/users');
    }
  }, [ history, status, error, name ]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const role = roleRef.current.value;
    if (!props.editMode) {
      const password = passwordRef.current.value;
      dispatch(addUser(authContext.token, firstName, lastName, email, password, role));
    } else {
      dispatch(updateUser(authContext.token, id, firstName, lastName, email, role));
    }
  }

  return (
    <Fragment>
      { error !== '' && <ErrorMessage message={error} /> }
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
                bg='white'
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
                bg='white'
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
                bg='white'
              />
            </InputGroup>
          </FormControl>
          { !props.editMode && <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<LockIcon/>} />
              <Input
                type="password"
                placeholder="Password"
                aria-label="Password"
                ref={passwordRef}
                bg='white'
              />
            </InputGroup>
          </FormControl> }
          <FormControl isRequired>
            <Select placeholder="Select option" ref={roleRef} bg='white' data-testid="select-user-role">
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
              { props.editMode ? 'Update' : 'Add'}
            </Button>
          </Box>
        </Stack>
      </form>
    </Fragment>
  )
})

export default UserForm;