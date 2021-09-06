import React from "react";
import { Heading, Spinner, useToast, VStack } from '@chakra-ui/react';
import BikesList from "../components/Bikes/BikesList";
import AddBike from "../components/Bikes/AddBike";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BikesFilter from "../components/Bikes/BikesFilter";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useEffect } from "react";

const BikesPage = () => {
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const error = useSelector((state: RootState) => state.bikes.error);
  const status = useSelector((state: RootState) => state.bikes.status);
  const name = useSelector((state: RootState) => state.bikes.name);
  const reserveError = useSelector((state: RootState) => state.reserves.error);
  const reserveName = useSelector((state: RootState) => state.reserves.name);
  const reserveStatus = useSelector((state: RootState) => state.reserves.status);


  useEffect(() => {
    if (error !== '' || reserveError !== '') {
      toast({
        title: `${error || reserveError}`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [error, reserveError, toast]);

  useEffect(() => {
    if (status === 'completed' && error === '' && !['', 'LIST'].includes(name)) {
      let message; 
      switch (name) {
        case 'ADD':
          message = 'Your bike has been added successfully';
          break;
        case 'UPDATE':
          message = 'Your bike has been updated successfully';
          break;
        case 'DELETE':
          message = 'Your bike has been deleted successfully';
          break;
        case 'ADD-RATE':
          message = 'You rate has been added succesfully';
          break;
        default:
          break;
      }
      toast({
        title: `${message}`,
        status: 'success',
        isClosable: true,
        duration: 2000
      });
    }
  }, [name, status, error, toast]);

  useEffect(() => {
    if (reserveStatus === 'completed' && reserveError === '' && reserveName === 'ADD') {
      toast({
        title: 'Your reserve has been added successfully',
        status: 'success',
        isClosable: true,
        duration: 2000
      });
    }
  }, [reserveName, reserveStatus, reserveError, toast]);


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
      <BikesList />
      { authContext.role === 'manager' && status !== 'pending' && error === '' &&  <AddBike /> }
    </VStack>
  )
}

export default BikesPage;