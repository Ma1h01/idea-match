import React, {useState} from 'react'
import { View, TextInput, Button, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebase';
const SignUp = () => {
    const nav = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");  
    const [showError, setShowError] = useState(false);

    const handleSignUp = async () => {
        try {
        await auth().createUserWithEmailAndPassword(email, password);
        console.log("Signed up successfully:", auth().currentUser);
        nav.goBack();
        } catch (error) {
        setErrorMessage(error.message);
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);    
        }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="gray"
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 60,
          marginVertical: 20,
        }}
      >
        <Pressable
          style={{ ...styles.button, backgroundColor: "#EEF4F9" }}
          onPress={() => nav.goBack()}
        >
          <Text style={{ color: "black" }}>Cancel</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={{ color: "white" }}>Create</Text>
        </Pressable>
      </View>

      {showError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity onPress={() => setShowError(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6F9595",
    alignItems: "center",
  },
  header: {
    fontFamily: "TekturSemiBold",
    fontSize: 20,
    color: "white",
  },
  inputView: {
    flexDirection: "row",
    width: "80%",
    height: 40,
    gap: 5,
    marginVertical: 20,
  },
  inputLabel: {
    fontFamily: "Inter",
    fontSize: 14,
    paddingVertical: 10,
    color: "white",
    width: 80,
    textAlign: "right",
    paddingRight: 15,
  },
  inputField: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    borderRadius: 7,
    padding: 10,
    color: "white",
  },
  button: {
    backgroundColor: "#282828",
    padding: 10,
    borderRadius: 7,
    width: "auto",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    position: "absolute",
    top: 250,
    left: 20,
    right: 20,
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
  closeButtonText: {
    color: "yellow",
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default SignUp