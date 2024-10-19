import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationBar from '../../components/NavigationBar';

const Message = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Message</Text>
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

export default Message;

