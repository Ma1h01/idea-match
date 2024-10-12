import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, View } from '@tamagui/core'
import config from './tamagui.config'
import { Text } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { auth, firebase } from './app/firebase';

export default function App() {
    const [loaded] = useFonts({
      Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
      InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      // Check if Firebase is initialized
      console.log("Firebase initialized:", auth().app.name ? "Yes" : "No");

      // Anonymous Sign-in for testing Firebase Authentication
      auth()
        .signInAnonymously()
        .then((userCredential) => {
          console.log("Signed in anonymously:", userCredential.user);
          setUser(userCredential.user);
        })
        .catch((error) => {
          console.error("Error during anonymous sign-in:", error);
        });
    }, []);
  return (
    <TamaguiProvider config={config}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {user ? <Text>Signed in as: {user.uid}</Text> : <Text>Loading...</Text>}
      </View>
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
