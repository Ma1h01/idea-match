import React,  {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Image, Pressable, TouchableOpacity, Dimensions } from 'react-native'
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from '@react-navigation/native';
const General = ({route}) => {
  const { email, password } = route.params;
  const nav = useNavigation();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [picture, setPicture] = useState("");
  const [role, setRole] = useState("");
  const [transition, setTransition] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  
  const [showError, setShowError] = useState(false);

  const selectImage = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets) {        
        const { uri } = response.assets[0];
        if (uri) {
          setPicture(uri);
          console.log(uri);
        }
      }
    });
  }

  const handleTransition = (role) => {
    setRole(role);
    setTransition(true);
  }

  useEffect(() => {
    if (transition) {
      if (name.trim() === "" && bio.trim() === "") {
        setErrorMessage("Please enter your name and bio.");        
      } else if (name.trim() === "") {
        setErrorMessage("Please enter your name.");        
      } else if (bio.trim() === "") {
        setErrorMessage("Please enter your bio.");        
      } else {
        console.log(name, bio, picture, role);
        nav.navigate(`${role}Profile`, { email, password, name, bio, picture, role });
        setTransition(false);
        return
      }
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      setTransition(false);
    }    
  }, [transition]);

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={setName}
          value={name}
          placeholder="Your Name"
          placeholderTextColor="gray"
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Bio</Text>
        <TextInput
          style={{ ...styles.inputField, height: 150 }}
          onChangeText={setBio}
          value={bio}
          placeholder="Tell us about you"
          placeholderTextColor="gray"
          multiline={true}
          numberOfLines={10}
        />
      </View>

      <View style={{ ...styles.inputView, gap: 50 }}>
        <Text style={styles.inputLabel}>Profile Picture</Text>
        <Pressable onPress={selectImage}>
          <Image
            source={
              picture
                ? { uri: picture }
                : require("../../../assets/images/profile.png")
            }
            style={styles.profileImage}
          />
        </Pressable>
      </View>

      <View style={{ flexDirection: "column", alignItems: "center", gap: 10 }}>
        <Text style={{ fontFamily: "Inter", color: "white" }}>I am a...</Text>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => handleTransition("Entrepreneur")}
            style={{
              ...styles.button,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              marginRight: -1,
              borderRightWidth: 3,
              borderRightColor: "gray",
            }}
          >
            <Text style={{ fontFamily: "Inter", color: "white" }}>
              Entrepreneur
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleTransition("Developer")}
            style={{
              ...styles.button,
              marginRight: -1,
            }}
          >
            <Text style={{ fontFamily: "Inter", color: "white" }}>
              Developer
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleTransition("Investor")}
            style={{
              ...styles.button,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              borderLeftWidth: 2,
              borderLeftColor: "gray",
              marginLeft: -1,
            }}
          >
            <Text style={{ fontFamily: "Inter", color: "white" }}>
              Investor
            </Text>
          </Pressable>
        </View>
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
    // height: 40,
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
    // borderRadius: 7,
    width: "auto",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    position: "absolute",
    top: Dimensions.get("window").height / 2,
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    // marginTop: 20,    
  },
});

export default General