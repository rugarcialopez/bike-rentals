import React from "react";
import { Heading, Spinner, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchReserves } from "../store/reserves-slice";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import ReservesList from "../components/Reserves/ReservesList";
import ReservesFilter from "../components/Reserves/ReservesFilter";

const ReservesPage = () => {
  const authContext = useContext(AuthContext);
  const error = useSelector((state: RootState) => state.reserves.error);
  const status = useSelector((state: RootState) => state.reserves.status);
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(fetchReserves(authContext.token)); 
  }, [authContext.token, dispatch]);

  return (
    <VStack p={4} w='100vw'>
      <Heading 
          mb='8'
          fontWeight='extrabold'
          size='2xl'
          bgGradient='linear(to-r, gray.700, gray.500, gray.300)'
          bgClip='text'
        >
          Reserves
      </Heading>
      { status === 'pending' && <Spinner />}
      { status !== 'pending' && error === '' && authContext.role === 'manager' && <ReservesFilter/> }
      { status !== 'pending' && error === '' && <ReservesList /> }
    </VStack>
  )
}

export default ReservesPage;