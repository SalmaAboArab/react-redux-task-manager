import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserListScreen from './screens/UserListScreen';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <UserListScreen />
    </Provider>
  );
}
