import { Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserForm from "../components/Users/UserForm";
import User from "../models/User";
import { RootState } from "../store";

const EditUserPage = () => {
  const users = useSelector((state: RootState) => state.users.list);
  type UserFormHandle = React.ElementRef<typeof UserForm>;
  const userFormRef = useRef() as React.MutableRefObject<UserFormHandle>;
  const { id } = useParams< { id: string }>();

  useEffect(() => {
    if (id && users.length > 0) {
      const  user = users.find((user: User) => user.id === id);
      if (user) {
        userFormRef.current.setValues(user.firstName, user.lastName, user.email, user.role);
      }
    }
  }, [ id, users ]);

  return (
    <VStack p={4} w='100vw'>
      <Heading 
        mb='8'
        fontWeight='extrabold'
        size='2xl'
        bgGradient='linear(to-r, gray.700, gray.500, gray.300)'
        bgClip='text'
      >
        Edit User
      </Heading>
        <UserForm ref={ userFormRef } editMode={true}/>
    </VStack>
  )
}

export default EditUserPage;