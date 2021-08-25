import { Heading, Spinner, VStack } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "../components/Users/AddUser";
import UsersList from "../components/Users/UsersList";
import { RootState } from "../store";
import AuthContext from "../store/auth-context";
import { fetchUsers } from "../store/users-slice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers(authContext.token));
  }, [dispatch, authContext.token]);

  if (status === 'pending') {
    return <Spinner />;
  }
  return (
      <VStack p={4} w='100vw'>
        <Heading 
          mb='8'
          fontWeight='extrabold'
          size='2xl'
          bgGradient='linear(to-r, gray.700, gray.500, gray.300)'
          bgClip='text'
        >
          Users
        </Heading>
        <UsersList />
        { error === '' && <AddUser /> }
    </VStack>
  )
}

export default UsersPage;