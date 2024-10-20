import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationBar from '../../components/NavigationBar';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#6F9595"
  },
});


export default HomeScreen;
