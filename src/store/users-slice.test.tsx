import store  from "./index";
import { addNewUser, setUsers, deleteExistingUser, updateExistingUser } from "./users-slice";

describe('Users slice', () => {

  test('Add a new user', async () => {
    let state = store.getState().users;
    const initialUserCount = state.list.length;
  
    store.dispatch(addNewUser({
      id: '1',
      firstName: 'Learner',
      lastName: 'One',
      email:'learner01@example.com',
      role: 'user'
    }));
    state = store.getState().users;
    const newlyAddedUser = state.list.find((user) => user.email === 'learner01@example.com');
    expect(newlyAddedUser?.firstName).toBe('Learner');
    expect(newlyAddedUser?.lastName).toBe('One');
    expect(state.list.length).toBeGreaterThan(initialUserCount);
  });

  test('Update a user firstName and lastName', async () => {
    const users = [
      {
        id: '1',
        firstName: 'Learner',
        lastName: 'One',
        email:'learner01@example.com',
        role: 'user'
      }
    ];

    store.dispatch(setUsers({ users }));
    let state = store.getState().users;
    const initialUserCount = state.list.length;
  
    store.dispatch(updateExistingUser({
      id: '1',
      firstName: 'Learner updated',
      lastName: 'One updated',
      email:'learner01@example.com',
      role: 'user'
    }));
    state = store.getState().users;
    const newlyAddedUser = state.list.find((user) => user.email === 'learner01@example.com');
    expect(newlyAddedUser?.firstName).toBe('Learner updated');
    expect(newlyAddedUser?.lastName).toBe('One updated');
    expect(state.list.length).toEqual(initialUserCount);
  });

  test('Deletes a user from list with id', () => {
    const users = [
      {
        id: '1',
        firstName: 'Learner',
        lastName: 'One',
        email:'learner01@example.com',
        role: 'user'
      }
    ];

    store.dispatch(setUsers({ users }));
    let state = store.getState().users;
    const initialUserCount = state.list.length;
  
    store.dispatch(deleteExistingUser({ id: '1' }));
    state = store.getState().users;
  
    expect(state.list.length).toBeLessThan(initialUserCount); // Checking if new length smaller than inital length, which is 1
  });
  
});