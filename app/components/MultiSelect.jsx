import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
const MultiSelect = ({ title, options, selectedItems, setSelectedItems, selectedOther, setSelectedOther }) => {    
    const [showOtherInput, setShowOtherInput] = useState(false);
  const toggleItem = (item) => {
    if (item === "Other") {
      setShowOtherInput(!showOtherInput);
    }
    setSelectedItems((prevItems) =>
      prevItems.includes(item)
        ? prevItems.filter((i) => i !== item)
        : [...prevItems, item]
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.item,
              selectedItems.includes(item) && styles.selectedItem,
            ]}
            onPress={() => toggleItem(item)}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {showOtherInput && (
        <TextInput
          style={styles.inputField}
          placeholder="Please specify"
          value={selectedOther}
          onChangeText={setSelectedOther}
          placeholderTextColor="gray"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 16,
    fontFamily: "Inter",
    color: "white",
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 10,
    gap: 10,
  },
  item: {
    width: "30%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#2c2c2c",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#4a4a4a",
  },
  itemText: {
    color: "white",
    fontSize: 16,
  },
  inputField: {    
    backgroundColor: "#1C1C1C",
    borderRadius: 7,
    padding: 10,
    color: "white",
    height: 40,
  },
});

export default MultiSelect