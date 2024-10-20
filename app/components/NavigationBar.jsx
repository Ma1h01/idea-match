import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing icons from Ionicons

const NavigationBar = ({ navigation }) => {
  return (
    <View style={styles.navBarContainer}>
        <TouchableOpacity
            style={[styles.navItem, { zIndex: 1, padding: 10 }]} // Ensure clickable with zIndex
            onPress={() => navigation.navigate('Home')}
            >
            
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="heart-outline" size={35} color="#fff" />
            </View>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.navItem, { zIndex: 1, padding: 10}]} // Transparent background for debugging
            onPress={() => {
            navigation.navigate('Message');
            }}
            >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="chatbubble-outline" size={35} color="#fff" />
            </View>
        </TouchableOpacity>


        <TouchableOpacity
            style={[styles.navItem, { zIndex: 1, padding: 10 }]} // Ensure clickable with zIndex
            onPress={() => navigation.navigate('Profile')}
        >
            
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="person-outline" size={35} color="#fff" />
            </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2c2c2c', // Dark background color
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
});

export default NavigationBar;
