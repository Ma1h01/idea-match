import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MultiSelect from '../../components/MultiSelect';
import { database } from '../../firebase/firebase';
const Entrepreneur = ({route}) => {
  const nav = useNavigation();
  const { uid, email, password, name, bio, picture, role } = route.params;
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

handleComplete = async () => {
  console.log(`Email: ${email}, Password: ${password}, Name: ${name}, Bio: ${bio}, Picture: ${picture}, Role: ${role}, Idea: ${idea}, Target Audience: ${targetAudience}, Suggest To Others: ${suggestToOthers}, DoI: ${selectedDoI}, MoS: ${selectedMoS}, CL: ${selectedCL}, MI: ${selectedMI}, MIOther: ${selectedMIOther}`);
  let otherExists = selectedMI.includes("Other");
  if (otherExists) {
    selectedMI.push(selectedMIOther);
  };
  try {
    const newUser = {
      email: email,
      name: name,
      password: password,
      bio: bio,
      picture: picture,      
      roleProfile: {
        [role.toLowerCase()]: {
          idea: idea,
          targetAudience: targetAudience,
          suggestToOthers: suggestToOthers,
          DoI: selectedDoI,
          MoS: selectedMoS,
          CL: selectedCL,
          MI: selectedMI,
        },
      },                                          
    };
    const ref = await database().ref(`/users/${uid}`).set(newUser); 
    nav.navigate("Home", { uid });
  } catch (error) {
    console.error("Error writing document: ", error);
    if (otherExists) {
      selectedMI.pop();
    }
  }
}

useEffect(() => {
  if (transition) {    
    if (idea.trim() === "" && targetAudience.trim() === "" && selectedDoI.length === 0 && selectedMoS.length === 0 && selectedCL.length === 0 && selectedMI.length === 0) {
      setErrorMessage("Please fill out each question.");
    } else if (idea.trim() === "") {
      setErrorMessage("Please enter your idea.");
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Idea</Text>
        <TextInput
          style={{ ...styles.inputField, height: 100 }}
          onChangeText={setIdea}
          value={idea}
          placeholder="Tell us about your brilliant idea..."
          placeholderTextColor="gray"
          multiline={true}
          numberOfLines={10}
        />
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
});
export default Entrepreneur