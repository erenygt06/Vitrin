import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import SaveButton from "../components/SaveButton";

const windowWidth = Dimensions.get("window").width;

const Profil = () => {
  const [email, setEmail] = useState("talaycemal95@gmail.com");
  const [firstName, setFirstName] = useState("Cemal");
  const [lastName, setLastName] = useState("Talay");
  const [password, setPassword] = useState("********");

  const handleSave = () => {
    console.log("Bilgiler kaydedildi");
  };

  return (
    <View style={styles.container}>
      {/* Profil Başlığı */}
      <Text style={styles.title}>Profil</Text>

      {/* Form Alanları */}
      <View style={styles.formContainer}>
        <InputField label="E-mail" value={email} onChangeText={setEmail} />
        <InputField label="İsim" value={firstName} onChangeText={setFirstName} />
        <InputField label="Soyisim" value={lastName} onChangeText={setLastName} />
        <PasswordField
          value={password}
          onChangeText={setPassword}
          onChangePress={() => console.log("Şifre değiştirildi")}
        />
      </View>

      {/* Kaydet Butonu */}
      <SaveButton onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  formContainer: {
    marginBottom: 30,
  },
});

export default Profil;
