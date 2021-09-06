import React from "react";
import { Heading, Spinner, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import ReserveList from "../components/Reserves/ReservesList";
import { useEffect } from "react";
import { fetchReserves } from "../store/reserves-slice";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

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
          My Reserves
      </Heading>
      { status === 'pending' && <Spinner />}
      { status !== 'pending' && error === '' && <ReserveList /> }
    </VStack>
  )
}

export default ReservesPage;