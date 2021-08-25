import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Spacer, StackDivider, Text, VStack } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";
import AuthContext from "../../store/auth-context";
import { deleteUser } from "../../store/users-slice";
import ErrorMessage from "../UI/ErrorMessage";
import InfoMessage from "../UI/InfoMessage";

const UsersList = () => {
  const history = useHistory();
  const users = useSelector((state: RootState) => state.users.list);
  const error = useSelector((state: RootState) => state.users.error);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  const removeHandle = (id: string) => {
    dispatch(deleteUser(authContext.token, id));
  }

  return (
    <Fragment>
      { error !== '' &&  <ErrorMessage message={error} />}
      { error === '' && users.length === 0 && <InfoMessage message='There are no users' />}
      { users.length > 0 && <VStack
        divider={<StackDivider/>}
        borderColor='gray.100'
        borderWidth='2px'
        p='4'
        borderRadius='lg'
        width='100%'
        maxW={{base: '90vw', sm: '80vw' , lg: '50vw', xl: '40vw'}}
        alignItems='strecht'
      >
        { (users).map(user => (
          <HStack key={user.id} bg='gray.200' p={4}>
            <VStack alignItems='flex-start'>
              <HStack>
                <Text fontWeight='bold'>Name:</Text>
                <Text>{user.firstName} {user.lastName}</Text>
              </HStack>
              <HStack>
                <Text fontWeight='bold'>Email:</Text>
                <Text>{user.email}</Text>
              </HStack>
              <HStack>
                <Text fontWeight='bold'>Role:</Text>
                <Text>{user.role}</Text>
              </HStack>
            </VStack>
            <Spacer/>
            <IconButton
              onClick={() => history.push(`/users/${user.id}`)}
              aria-label='Edit icon'
              icon={<EditIcon/>}
              isRound
              bg='gray.500'
              _hover={{ boxShadow: 'md' }}/>
            <IconButton

              onClick={removeHandle.bind(null, user.id)}
              aria-label='Delete icon'
              icon={<DeleteIcon/>}
              isRound
              bg='gray.500'
              _hover={{ boxShadow: 'md' }}/>
          </HStack>
        ))}
      </VStack> }
    </Fragment>
  )
}

export default UsersList;