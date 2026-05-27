/**
 * AuthNavigator — Stack navigator for unauthenticated flow.
 *
 * Splash → Onboarding → Login → Register → ForgotPassword → OTPVerify
 *
 * Screens reference: docs/screens/KhmerScreenLibrary.jsx (Auth stack)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Splash:         undefined;
  Onboarding:     undefined;
  Login:          undefined;
  Register:       undefined;
  ForgotPassword: undefined;
  OTPVerify:      { contact: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* TODO: import and register screen components
      <Stack.Screen name="Splash"         component={SplashScreen} />
      <Stack.Screen name="Onboarding"     component={OnboardingScreen} />
      <Stack.Screen name="Login"          component={LoginScreen} />
      <Stack.Screen name="Register"       component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTPVerify"      component={OTPVerifyScreen} />
      */}
    </Stack.Navigator>
  );
}
