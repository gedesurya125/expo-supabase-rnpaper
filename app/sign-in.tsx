/* eslint-disable import/order */
import 'react-native-url-polyfill/auto';
import React from 'react';

import { useSession } from '@/components/AuthContext';
import { Redirect } from 'expo-router';
// @ts-ignore
import { SignInScreen } from '@/screen/sign-in/SignInScreen';

export default function SignIn() {
  const { session, inSessionLoginInfo, isSessionExist } = useSession();

  return session && session.user && inSessionLoginInfo.email && inSessionLoginInfo.pin ? (
    <Redirect href="/(tabs)/" />
  ) : (
    <SignInScreen isSessionExist={isSessionExist} />
  );
}
