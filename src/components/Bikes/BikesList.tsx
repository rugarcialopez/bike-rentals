import { Spinner } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import AuthContext from '../../store/auth-context';
import { deleteBike } from '../../store/bikes-slice';
import BikeCard from '../UI/BikeCard';
import InfoMessage from '../UI/InfoMessage';

const BikesList = () => {
  const authContext = useContext(AuthContext);
  const bikes = useSelector((state: RootState) => state.bikes.list);
  const status = useSelector((state: RootState) => state.bikes.status);
  const dispatch = useDispatch();

  const removeHandler = useCallback((id: string) => {
    dispatch(deleteBike(authContext.token, id));
  }, [authContext.token, dispatch]);

  if (status === 'pending') {
    return <Spinner/>
  }

  return (
    <Fragment>
      { bikes.length === 0 && <InfoMessage message='There are no bikes' />}
      { bikes.length > 0 &&
        (bikes).map(bike => <BikeCard key={bike.id} bike={bike} onRemove={removeHandler}/> )
      }
    </Fragment>
  )
}

export default React.memo(BikesList);