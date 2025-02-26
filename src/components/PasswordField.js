import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const PasswordField = ({ onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSave = () => {
    if (oldPassword && newPassword) {
      onSave(oldPassword, newPassword);
      setIsEditing(false);
      setOldPassword("");
      setNewPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Şifre</Text>

      {!isEditing ? (
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value="********" editable={false} />
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Değiştir</Text>
          </TouchableOpacity>
        </View>
      ) : (
        
        <View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Eski Şifreniz"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelButtonText}>Vazgeç</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Yeni Şifreniz"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              style={[
                styles.saveButton,
                oldPassword && newPassword ? styles.activeSaveButton : styles.disabledSaveButton,
              ]}
              onPress={handleSave}
              disabled={!oldPassword || !newPassword}
            >
              <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: windowWidth*0.05,
  },
  label: {
    fontFamily: "DMSans-Regular",
    fontSize: windowWidth*0.04,
    marginBottom: windowWidth*0.04,
    fontWeight:"bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    width: windowWidth * 0.55,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  cancelButton: {
    width: windowWidth * 0.3, 
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "DMSans-Regular",
    fontSize: windowWidth*0.04,
    fontWeight: "bold",
  },
  saveButton: {
    width: windowWidth * 0.3, 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  activeSaveButton: {
    backgroundColor: "black",
  },
  disabledSaveButton: {
    backgroundColor: "gray",
  },
  saveButtonText: {
    fontFamily: "DMSans-Regular",
    fontSize: windowWidth*0.04,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    width: windowWidth * 0.25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: windowWidth*0.04,
    fontWeight: "bold",
  },
});

export default PasswordField;
