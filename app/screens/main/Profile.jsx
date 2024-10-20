import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { database } from '../../firebase/firebase';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const Profile = ({ route, navigation }) => {
  const { uid, updateRoles } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("backackakcakscka");
  console.log(updateRoles);

  const fetchUserData = async () => {
    try {
      const userRef = database().ref(`/users/${uid}`); // Reference to user data in Firebase
      const snapshot = await userRef.once('value'); // Get the data once
      if (snapshot.exists()) {
        setUserData(snapshot.val()); // Set the fetched data to state
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

 
  useFocusEffect(
    useCallback(() => {
      setLoading(true); 
      fetchUserData(); 
    }, [uid]) 
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const rolesName = Object.keys(userData.roleProfile);
  console.log("rolesName: " + rolesName)

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text>Name: {userData.name}</Text>
          <Text>Bio: {userData.bio}</Text>

          {!rolesName.includes('entrepreneur') && (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('EntrepreneurProfile', {
                  uid,
                  email: userData.email,
                  password: userData.password,
                  name: userData.name,
                  bio: userData.bio,
                  picture: userData.picture,
                  roles: rolesName,
                })
              }
            >
              <Text style={styles.buttonText}>Entrepreneur Profile</Text>
            </TouchableOpacity>
          )}

          {!rolesName.includes('developer') && (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('DeveloperProfile', {
                  uid,
                  email: userData.email,
                  password: userData.password,
                  name: userData.name,
                  bio: userData.bio,
                  picture: userData.picture,
                  roles: rolesName,
                })
              }
            >
              <Text style={styles.buttonText}>Developer Profile</Text>
            </TouchableOpacity>
          )}

          {!rolesName.includes('investor') && (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('InvestorProfile', {
                  uid,
                  email: userData.email,
                  password: userData.password,
                  name: userData.name,
                  bio: userData.bio,
                  picture: userData.picture,
                  roles: rolesName,
                })
              }
            >
              <Text style={styles.buttonText}>Investor Profile</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text>No data found for this user.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6F9595',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: '#4B7B7B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Profile;
