import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, View } from '@tamagui/core'
import config from './tamagui.config'
import { Text } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './app/screens/Login';
import SignUp from './app/screens/SignUp';
import General from './app/screens/profiles-setup/General';
import Entrepreneur from './app/screens/profiles-setup/Entrepreneur';
import Investor from './app/screens/profiles-setup/Investor';
import Developer from './app/screens/profiles-setup/Developer';
import Home from './app/screens/main/Home';
import Message from './app/screens/main/Message';
import Profile from './app/screens/main/Profile';
export default function App() {
    const [loaded] = useFonts({
      Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
      InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
      Tektur: require('./assets/fonts/Tektur-Regular.ttf'),
      TekturSemiBold: require('./assets/fonts/Tektur-SemiBold.ttf'),
      RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    });
  
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    function LoginHeader({
      viewStyle,
      textStyle,
      text
    }) {
      return (
        <View style={viewStyle}>
          {/* Image */}
          <Image source={require("./assets/images/appIcon.png")} style={{width: 120, height: 120}}></Image>
          {/* Text */}
          <Text style={textStyle}>{text}</Text>
        </View>
      );
    }
    function MainTabs({ route }) {
      const { uid, email, password, name, bio, picture, roles } = route.params; // Destructure passed params
    
      return (
          <Tab.Navigator
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                      let iconName;
                      if (route.name === 'Home') {
                          iconName = 'heart-outline';
                      } else if (route.name === 'Message') {
                          iconName = 'chatbubble-outline';
                      } else if (route.name === 'Profile') {
                          iconName = 'person-outline';
                      }
                      return <Icon name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#6F9595',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: { backgroundColor: '#2c2c2c' },
              })}
          >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Message" component={Message} />
              <Tab.Screen
                  name="Profile"
                  component={Profile}
                  initialParams={{ uid, email, password, name, bio, picture, roles }}
              />
          </Tab.Navigator>
      );
    }
    
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              header: () => (
                <LoginHeader
                  viewStyle={styles.container}
                  textStyle={styles.bold}
                  text="IdeaMatch"
                />
              ),
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              header: () => (
                <LoginHeader
                  viewStyle={styles.container}
                  textStyle={styles.bold}
                  text="IdeaMatch"
                />
              ),
            }}
          />

          <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }} // Hide header for the tabs
          />
          <Stack.Screen
            name="GeneralProfile"
            component={General}
            options={{
              header: () => (
                <LoginHeader
                  viewStyle={styles.container}
                  textStyle={styles.regular}
                  text="General Profile Setup"
                />
              ),
            }}
          />
          <Stack.Screen
            name="EntrepreneurProfile"
            component={Entrepreneur}
            options={{
              header: () => (
                <LoginHeader
                  viewStyle={{...styles.container, height: 300}}
                  textStyle={styles.regular}
                  text="Entrepreneur Profile Setup"
                />
              ),
            }}
          />
          <Stack.Screen
            name="DeveloperProfile"
            component={Developer}
            options={{
              header: () => (
                <LoginHeader
                  viewStyle={styles.container}
                  textStyle={styles.regular}
                  text="Developer Profile Setup"
                />
              ),
            }}
          />
          <Stack.Screen
            name="InvestorProfile"
            component={Investor}
            options={{
              header: () => (
                <LoginHeader
                  viewStyle={styles.container}
                  textStyle={styles.regular}
                  text="Investor Profile Setup"
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    backgroundColor: "#6F9595",
    alignItems: "center",
    justifyContent: "center",
  },
  bold: {
    fontFamily: "TekturSemiBold",
    fontSize: 35,
    color: "white",
    marginTop: 20,
  },
  regular: {
    fontFamily: "RobotoBold",
    fontSize: 20,
    color: "white",
    marginTop: 35,
  },
});


          {/* <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => (
                <LoginHeader
                  viewStyle={styles.container}
                  textStyle={styles.bold}
                  text="Home"
                />
              ),
            }}
          />
          <Stack.Screen
            name="Message"
            component={Message}
            options={{
              header: () => (
                <LoginHeader
                  viewStyle={styles.container}
                  textStyle={styles.bold}
                  text="Message"
                />
              ),
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              header: () => (
                <LoginHeader
                  viewStyle={styles.container}
                  textStyle={styles.bold}
                  text="Profile"
                />
              ),
            }}
          /> */}