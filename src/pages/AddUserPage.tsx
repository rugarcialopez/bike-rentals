import { VStack, Heading } from "@chakra-ui/react";
import React from "react"
import UserForm from "../components/Users/UserForm"

const AddUserPage = () => {
  return (
    <VStack p={4} w='100vw'>
      <Heading 
        mb='8'
        fontWeight='extrabold'
        size='2xl'
        bgGradient='linear(to-r, gray.700, gray.500, gray.300)'
        bgClip='text'
      >
          Add User
      </Heading>
      <UserForm />
    </VStack>    
  )
}

export default AddUserPage;