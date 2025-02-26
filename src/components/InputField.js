import React from "react";
import { View, Text, TextInput, StyleSheet,Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const InputField = ({ label, value, onChangeText, secureTextEntry = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontFamily: "DMSans-Regular",
    fontSize:windowWidth*0.04,
    fontWeight: "bold",
    marginBottom: windowWidth*0.02,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

export default InputField;
