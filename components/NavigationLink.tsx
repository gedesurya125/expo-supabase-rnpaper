import React from 'react';
import { Href, Link } from 'expo-router';
import { ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

export const NavigationLink = ({
  href,
  children,
  style
}: {
  href: Href;
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <Link href={href} asChild>
      <Button mode="contained" style={style}>
        {children}
      </Button>
    </Link>
  );
};
