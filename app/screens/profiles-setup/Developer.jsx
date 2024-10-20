import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MultiSelect from '../../components/MultiSelect';
import { database } from '../../firebase/firebase';
const Developer = ({route}) => {
  const nav = useNavigation();
  const { uid, email, password, name, bio, picture, roles } = route.params;
  const [idea, setIdea] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [suggestToOthers, setSuggestToOthers] = useState(false);
  const [selectedDoI, setSelectedDoI] = useState([]);
  const [selectedMoS, setSelectedMoS] = useState([]);
  const [selectedCL, setSelectedCL] = useState([]);
  const [selectedMI, setSelectedMI] = useState([]);
  const [selectedMIOther, setSelectedMIOther] = useState("");
  const [transition, setTransition] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [experienceFields, setExperienceFields] = useState([]);
  const [userData, setUserData] = useState(null);

const DoIOptions = [
  "Medicine", "Social Media", "Agriculture","Technology", "Finance", "Engineering", "Education", "Law"
]
const MoSOptions = [
  "iOS App", "Cloud Based", "Android App", "AI", "Web App", "IoT", "Wearable Tech", "Robotics"
]
const CLOptions = [
  "Uncommitted",
  "Minimal (1-2)",
  "Slight (2-5)",
  "Moderate (6-10)",
  "Serious (11-20)",
  "High (20-40)",
  "Full Time (40+)",
];
const MIOptions = [
  "Equity Based", "Contract", "Freelance", "Revenue Sharing", "Other"
]

 // Fetch user data when the component mounts
 const fetchUserData = async () => {
  try {
    const userRef = database().ref(`/users/${uid}`);
    const snapshot = await userRef.once('value');
    if (snapshot.exists()) {
      setUserData(snapshot.val()); // Set fetched data
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
};

useEffect(() => {
  fetchUserData(); // Fetch user data when the component mounts
}, [uid]);


handleComplete = async () => {

  const updatedRoles = [...roles, "developer"];
  console.log("Updated Roles:", updatedRoles);

  console.log("herererererer")
  console.log(`Email: ${email}, Password: ${password}, Name: ${name}, Bio: ${bio}, Picture: ${picture}, Role: ${updatedRoles}, Experience: ${experienceFields}, Target Audience: ${targetAudience}, Suggest To Others: ${suggestToOthers}, DoI: ${selectedDoI}, MoS: ${selectedMoS}, CL: ${selectedCL}, MI: ${selectedMI}, MIOther: ${selectedMIOther}`);
  let otherExists = selectedMI.includes("Other");
  if (otherExists) {
    selectedMI.push(selectedMIOther);
  };



  try {
    const userRef = database().ref(`/users/${uid}`);

    if (updatedRoles.length > 1) {

      const updatedProfile = {
        ...userData, // Include all existing user data
        roleProfile: {
          ...userData.roleProfile, // Merge the existing roleProfile to avoid overwriting other roles
          [updatedRoles[updatedRoles.length - 1].toLowerCase()]: {
            experienceFields,
            targetAudience,
            suggestToOthers,
            DoI: selectedDoI,
            MoS: selectedMoS,
            CL: selectedCL,
            MI: selectedMI,
          },
        },
      };
      // Update existing user in the database
      await userRef.update(updatedProfile);
      console.log("User updated successfully!");
      nav.navigate("MainTabs", {screen: "Profile", 
      params: {
          uid, 
          email, 
          password, 
          name, 
          bio, 
          picture, 
          updatedRoles
        }
      });
      
    } else {
      // Create a new user if roles array is empty
      const newUser = {
        email: email,
        name: name,
        password: password,
        bio: bio,
        picture: picture,
        roleProfile: {
          [updatedRoles[updatedRoles.length - 1].toLowerCase()]: {
            experience: experienceFields,
            targetAudience: targetAudience,
            suggestToOthers: suggestToOthers,
            DoI: selectedDoI,
            MoS: selectedMoS,
            CL: selectedCL,
            MI: selectedMI,
          },
        },                                          
      };

      // Create a new user in the database
      await userRef.set(newUser);
      console.log("New user created successfully!");
      nav.navigate("MainTabs", {uid, email, password, name, bio, picture, updatedRoles});
    }

  } catch (error) {
    console.error("Error writing document: ", error);
    if (otherExists) {
      selectedMI.pop();
    }
  }
}


useEffect(() => {
  if (transition) {    
    if (experienceFields.length === 0 && targetAudience.trim() === "" && selectedDoI.length === 0 && selectedMoS.length === 0 && selectedCL.length === 0 && selectedMI.length === 0) {
      setErrorMessage("Please fill out each question.");
    } else if (experienceFields.length === 0) {
      setErrorMessage("Please add experience.");
    } else if (targetAudience.trim() === "") {
      setErrorMessage("Please enter your target audience.");
    } else if (selectedDoI.length === 0 || selectedMoS.length === 0 || selectedCL.length === 0 || selectedMI.length === 0) {
      setErrorMessage("Please select at least one option for each question.");
    } else {
      handleComplete();
      setTransition(false);
      return
    }
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
    setTransition(false);
  }    
}, [transition])






const addExperienceField = () => {
  setExperienceFields([...experienceFields, '']);
};

const updateExperienceField = (text, index) => {
  const updatedFields = experienceFields.map((field, i) =>
    i === index ? text : field
  );
  setExperienceFields(updatedFields);
};

const removeExperienceField = (index) => {
  setExperienceFields((prevFields) => prevFields.filter((_, i) => i !== index));
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {experienceFields.map((field, index) => (
          <View key={index} style={styles.inputView}>
            <TextInput
              style={styles.inputField}
              onChangeText={(text) => updateExperienceField(text, index)}
              value={field}
              placeholder={`Experience ${index + 1}`}
              placeholderTextColor="gray"
              multiline={true}
              numberOfLines={5}
            />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeExperienceField(index)}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={addExperienceField}>
          <Text style={styles.buttonText}>Add Experience</Text>
        </TouchableOpacity>
      </View>
      <MultiSelect
        title={"Domain of Interest"}
        options={DoIOptions}
        selectedItems={selectedDoI}
        setSelectedItems={setSelectedDoI}
      />
      <MultiSelect
        title={"Medium of Solution"}
        options={MoSOptions}
        selectedItems={selectedMoS}
        setSelectedItems={setSelectedMoS}
      />

      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Target Audience</Text>
        <TextInput
          style={{ ...styles.inputField, height: 50 }}
          onChangeText={setTargetAudience}
          value={targetAudience}
          placeholder="Who is your target audience?"
          placeholderTextColor="gray"
          multiline={true}
          numberOfLines={10}
        />
      </View>

      <MultiSelect
        title={"Commitment Level to Project (Hours Per Week)"}
        options={CLOptions}
        selectedItems={selectedCL}
        setSelectedItems={setSelectedCL}
      />
      <MultiSelect
        title={"Monetization Interest"}
        options={MIOptions}
        selectedItems={selectedMI}
        setSelectedItems={setSelectedMI}
        selectedOther={selectedMIOther}
        setSelectedOther={setSelectedMIOther}
      />

      <View>
        <Pressable
          style={
            !suggestToOthers
              ? styles.suggestButton
              : { ...styles.suggestButton, backgroundColor: "#4a4a4a" }
          }
          onPress={() => setSuggestToOthers(!suggestToOthers)}
        >
          <Text style={{ color: "white" }}>Suggest To Others</Text>
        </Pressable>
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
          <Text style={{ color: "black" }}>Back</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => setTransition(true)}>
          <Text style={{ color: "white" }}>Complete</Text>
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  suggestButton: {
    width: "50%",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#2c2c2c",
    borderRadius: 8,
    alignItems: "center",
  },
  button: {
    backgroundColor: '#2c2c2c', // Dark background color for button
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
  },




});
export default Developer