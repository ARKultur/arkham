import React from 'react';
import {useSelector} from 'react-redux';
import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';

const Router = () => {
  const {isLoggedIn} = useSelector(state => state.userReducer);

  return <>{isLoggedIn ? <AppRouter /> : <AuthRouter />}</>;
};

export default Router;
