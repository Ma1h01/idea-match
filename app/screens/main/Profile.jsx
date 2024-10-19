import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationBar from '../../components/NavigationBar';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      {/* Pass navigation prop explicitly to NavigationBar */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;

