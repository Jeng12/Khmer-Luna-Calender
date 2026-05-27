/**
 * RootNavigator
 *
 * Top-level Stack navigator. Switches between:
 *  - AuthNavigator  (unauthenticated: Splash → Onboarding → Login …)
 *  - MainNavigator  (authenticated:  Tab bar with Home/Calendar/Explore/Profile)
 *
 * Auth state is read from Zustand authStore (token persisted in MMKV).
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useAuthStore } from '../store/authStore';
// import AuthNavigator from './AuthNavigator';
// import MainNavigator from './MainNavigator';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // const isAuth = useAuthStore(state => state.isAuth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* {isAuth ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )} */}

      {/* TODO: replace placeholders with real navigators after scaffold */}
    </Stack.Navigator>
  );
}
