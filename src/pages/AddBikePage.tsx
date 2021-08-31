import React from "react";
import { VStack, Heading } from "@chakra-ui/react";
import BikeForm from "../components/Bikes/BikeForm";

const AddBikePage = () => {
  return (
    <VStack p={4} w='100vw'>
      <Heading 
        mb='8'
        fontWeight='extrabold'
        size='2xl'
        bgGradient='linear(to-r, gray.700, gray.500, gray.300)'
        bgClip='text'
      >
          Add Bike
      </Heading>
      <BikeForm editMode={false}/>
    </VStack>    
  )
};

export default AddBikePage;