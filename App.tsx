import { StatusBar } from 'expo-status-bar';
import RootLayout from './app/_layout';
import { TamaguiProvider, View } from '@tamagui/core'
import config from './tamagui.config'
import { Text } from 'tamagui';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';

export default function App() {
    const [loaded] = useFonts({
      Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
      InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    useEffect(() => {
      if (loaded) {
        // can hide splash screen here
      }
    }, [loaded]);

    if (!loaded) {
      return null;
    }
  return (
    <TamaguiProvider config={config}>
      <View width={200} height={200} backgroundColor="$background" />
      <Text>Hello, world!</Text>
    </TamaguiProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
