import React from "react";
import { Heading, Spinner, VStack } from '@chakra-ui/react';
import BikesList from "../components/Bikes/BikesList";
import AddBike from "../components/Bikes/AddBike";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useEffect } from "react";
import { fetchBikes } from "../store/bikes-slice";

const BikesPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.bikes.error);
  const status = useSelector((state: RootState) => state.bikes.status);

  useEffect(() => {
    dispatch(fetchBikes(token));
  }, [dispatch, token]);

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
          Bikes
      </Heading>
      <BikesList />
      { error === '' && <AddBike /> }
    </VStack>
  )
}

export default BikesPage;