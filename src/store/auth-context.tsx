import React, { useEffect, useState } from 'react';

let logoutTimer: NodeJS.Timeout;

type AuthContextObj = {
  token: string,
  role: string,
  userId: string,
  isLoggedIn: boolean,
  login: (token: string, role: string, expirationTime: string, userId: string) => void,
  logout: () => void
};

const calculateRemainingTime = (expirationTime: string): number => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const AuthContext = React.createContext<AuthContextObj>({
  token: '',
  role: '',
  userId: '',
  isLoggedIn: false,
  login: (token: string, role: string, expirationTime: string, userId: string) => {},
  logout: () => {},
});

export const AuthProvider: React.FC = (props) => {
  let storedToken = localStorage.getItem('token');
  let storedRole = localStorage.getItem('role');
  let storedExpirationDate = localStorage.getItem('duration');
  let storedUserId = localStorage.getItem('userId');
  if (!storedToken) {
    storedToken = '';
  }
  if (!storedRole) {
    storedRole = '';
  }
  if (!storedUserId) {
    storedUserId = '';
  }
  let remainingTime = storedExpirationDate ? calculateRemainingTime(storedExpirationDate) : 0;

  const [token, setToken] = useState(storedToken); 
  const [role, setRole] = useState(storedRole);
  const [userId, setUserId] = useState(storedUserId);

  useEffect(() => {
    if (remainingTime > 3600) {
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationTime');
    }
  }, [remainingTime]);

  const loginHandler = (token: string, role: string, expirationTime: string, userId: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    setUserId(userId);
    localStorage.setItem('userId', userId);
    setRole(role);
    localStorage.setItem('role', role);
    localStorage.setItem('duration', expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  }

  const logoutHandler = () => {
    setToken('');
    localStorage.removeItem('token');
    setRole('');
    localStorage.removeItem('role');
    localStorage.removeItem('duration');
    setUserId('');
    localStorage.removeItem('userId');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }

  const authValue: AuthContextObj = {
    token: token,
    role: role,
    userId: userId,
    isLoggedIn: token !== '',
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;