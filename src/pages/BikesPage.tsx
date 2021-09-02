import React from "react";
import { Heading, Spinner, VStack } from '@chakra-ui/react';
import BikesList from "../components/Bikes/BikesList";
import AddBike from "../components/Bikes/AddBike";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BikesFilter from "../components/Bikes/BikesFilter";

const BikesPage = () => {
  const error = useSelector((state: RootState) => state.bikes.error);
  const status = useSelector((state: RootState) => state.bikes.status);

  return (
    <VStack p={4} w='100vw'>
      <Heading 
          mb='8'
          fontWeight='extrabold'
          size='2xl'
          bgGradient='linear(to-r, gray.700, gray.500, gray.300)'
          bgClip='text'
        >
          Bikes
      </Heading>
      <BikesFilter/>
      { status === 'pending' && <Spinner />}
      { status !== 'pending' && error === '' && <BikesList /> }
      { status !== 'pending' && error === '' && <AddBike /> }
    </VStack>
  )
}

export default BikesPage;