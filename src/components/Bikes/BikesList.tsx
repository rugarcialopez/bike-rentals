import React, { Fragment } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import AuthContext from '../../store/auth-context';
import { deleteBike } from '../../store/bikes-slice';
import BikeCard from '../UI/BikeCard';
import ErrorMessage from '../UI/ErrorMessage';
import InfoMessage from '../UI/InfoMessage';

const BikesList = () => {
  const authContext = useContext(AuthContext);
  const bikes = useSelector((state: RootState) => state.bikes.list);
  const error = useSelector((state: RootState) => state.bikes.error);
  const reserveError = useSelector((state: RootState) => state.reserves.error);
  const dispatch = useDispatch();

  const removeHandler = (id: string) => {
    dispatch(deleteBike(authContext.token, id));
  }

  return (
    <Fragment>
      { (error !== '' || reserveError !== '') &&  <ErrorMessage message={error || reserveError} />}
      { error === '' && bikes.length === 0 && <InfoMessage message='There are no bikes' />}
      { bikes.length > 0 &&
        (bikes).map(bike => <BikeCard key={bike.id} bike={bike} onRemove={removeHandler}/> )
      }
    </Fragment>
  )
}

export default BikesList;