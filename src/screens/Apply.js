import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;


const InputField = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
    />
  );
};


const Apply = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [socialLinks, setSocialLinks] = useState("");

  const handleApply = () => {
    if (!fullName || !email || !phone || !socialLinks) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    alert("Başvurunuz alındı! En kısa sürede sizinle iletişime geçeceğiz.");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← GERİ</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Başvur</Text>
      <Text style={styles.description}>
        Aşağıdaki formu doldurduktan sonra takımımız sizinle iletişime geçecektir.
      </Text>
      
      {/* ✅ Placeholder Kullanımı */}
      <InputField placeholder="İsim Soyisim" value={fullName} onChangeText={setFullName} />
      <InputField placeholder="E-mail" value={email} onChangeText={setEmail} />
      <InputField placeholder="Cep Telefonu" value={phone} onChangeText={setPhone} />
      <InputField placeholder="Sosyal Medya Linkleri" value={socialLinks} onChangeText={setSocialLinks} />

      <TouchableOpacity style={styles.submitButton} onPress={handleApply}>
        <Text style={styles.submitButtonText}>BAŞVUR</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Hesabın varsa{" "}
        <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
          buradan
        </Text>{" "}
        giriş yapabilirsin.
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: windowWidth * 0.05,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    fontFamily: "DMSerifDisplay-Regular",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontFamily: "DMSans-Regular",
    fontWeight:"800",
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  input: {
    fontFamily: "DMSans-Regular",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "black", 
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    fontFamily: "DMSans-Medium",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    fontFamily: "DMSans-Medium",
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginTop: 15,
  },
  loginLink: {
    fontWeight: "bold",
    color: "black",
  },
});

export default Apply;
