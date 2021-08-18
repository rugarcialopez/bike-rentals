import React from "react";
import { Heading, VStack } from '@chakra-ui/react';
import BikesList from "../components/Bikes/BikesList";
import AddBike from "../components/Bikes/AddBike";

const BikesPage = () => {
  return (
    <VStack p={4} w='100vw'>
      <Heading 
        mb='8'
        fontWeight='extrabold'
        size='2xl'
        bgGradient='linear(to-r, pink.500, pink.300, blue.500)'
        bgClip='text'
      >
          Bikes
      </Heading>
      <BikesList />
      <AddBike/>
    </VStack>
  )
}

export default BikesPage;