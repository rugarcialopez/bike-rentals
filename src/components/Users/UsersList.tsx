import React, { Fragment } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import AuthContext from "../../store/auth-context";
import { deleteUser } from "../../store/users-slice";
import ErrorMessage from "../UI/ErrorMessage";
import InfoMessage from "../UI/InfoMessage";
import UserCard from "../UI/UserCard";

const UsersList = () => {
  const users = useSelector((state: RootState) => state.users.list);
  const error = useSelector((state: RootState) => state.users.error);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  const removeHandler = (id: string) => {
    dispatch(deleteUser(authContext.token, id));
  }

  return (
    <Fragment>
      { error !== '' &&  <ErrorMessage message={error} />}
      { error === '' && users.length === 0 && <InfoMessage message='There are no users' />}
      { users.length > 0 &&
        (users).map(user => <UserCard key={user.id} user={user} onRemove={removeHandler}/> )
      }
    </Fragment>
  )
}

export default UsersList;