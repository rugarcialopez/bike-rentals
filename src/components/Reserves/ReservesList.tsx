import { useToast } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import AuthContext from '../../store/auth-context';
import { cancelReserve } from '../../store/reserves-slice';
import ErrorMessage from '../UI/ErrorMessage';
import InfoMessage from '../UI/InfoMessage';
import ReserveCard from '../UI/ReserveCard';

const ReserveList = () => {
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const dispatch = useDispatch();
  const reserves = useSelector((state: RootState) => state.reserves.list);
  const error = useSelector((state: RootState) => state.reserves.error);
  const status = useSelector((state: RootState) => state.reserves.status);
  const name = useSelector((state: RootState) => state.reserves.name);

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
  }, [name, status, error, toast])

  const cancelReservationHandler = useCallback((id: string) => {
    dispatch(cancelReserve(authContext.token, id));
  }, [dispatch, authContext.token])

  return (
    <Fragment>
      { error !== '' &&  <ErrorMessage message={error} />}
      { error === '' && reserves.length === 0 && <InfoMessage message='There are no reserves' />}
      { reserves.length > 0 &&
        (reserves).map(reserve => <ReserveCard key={reserve.id} reserve={reserve} onCancelReservation={cancelReservationHandler}/> )
      }
    </Fragment>
  )
}

export default React.memo(ReserveList);