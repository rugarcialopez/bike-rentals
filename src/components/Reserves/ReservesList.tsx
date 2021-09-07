import { useToast } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Reserve from '../../models/Reserve';
import { RootState } from '../../store';
import AuthContext from '../../store/auth-context';
import { cancelReserve } from '../../store/reserves-slice';
import InfoMessage from '../UI/InfoMessage';
import ReserveCard from '../UI/ReserveCard';

const ReservesList = () => {
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.reserves.error);
  const status = useSelector((state: RootState) => state.reserves.status);
  const name = useSelector((state: RootState) => state.reserves.name);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let user = '';
  let bike = '';
  if (queryParams.get('user')) {
    user = queryParams.get('user') as string;
  }
  if (queryParams.get('bike')) {
    bike = queryParams.get('bike') as string;
  }
  const reserves = useSelector((state: RootState) => {
    let filteredReserves = [...state.reserves.list];
    if (user) {
      filteredReserves = filteredReserves.filter((reserve: Reserve) => reserve.userId === user);
    }
    if (bike) {
      filteredReserves = filteredReserves.filter((reserve: Reserve) => reserve.bikeId === bike);
    }
    return filteredReserves;
  });
  


  useEffect(() => {
    if (status === 'completed' && error === '' && name === 'CANCEL') {
      toast({
        title: 'Your reserve has been cancelled successfully',
        status: 'success',
        isClosable: true,
        duration: 2000
      });
    }
  }, [name, status, error, toast]);

  useEffect(() => {
    if (status === 'completed' && error !== '' && name === 'CANCEL') {
      toast({
        title: `${error}`,
        status: 'error',
        isClosable: true,
        duration: 1000
      });
    }
  }, [name, status, error, toast]);



  const cancelReservationHandler = useCallback((id: string) => {
    dispatch(cancelReserve(authContext.token, id));
  }, [dispatch, authContext.token])

  return (
    <Fragment>
      { error === '' && reserves.length === 0 && <InfoMessage message='There are no reserves' />}
      { reserves.length > 0 &&
        (reserves).map(reserve => <ReserveCard key={reserve.id} reserve={reserve} onCancelReservation={cancelReservationHandler}/> )
      }
    </Fragment>
  )
}

export default React.memo(ReservesList);