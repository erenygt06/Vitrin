import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

const windowWidth = Dimensions.get("window").width;

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
      {/* Geri Butonu */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← GERİ</Text>
      </TouchableOpacity>

      {/* Başlık ve Açıklama */}
      <Text style={styles.title}>Başvur</Text>
      <Text style={styles.description}>
        Aşağıdaki formu doldurduktan sonra takımımız sizinle iletişime geçecektir.
      </Text>

      {/* Form Alanları */}
      <InputField label="İsim Soyisim" value={fullName} onChangeText={setFullName} />
      <InputField label="E-mail" value={email} onChangeText={setEmail} />
      <InputField label="Cep Telefonu" value={phone} onChangeText={setPhone} />
      <InputField label="Sosyal Medya Linkleri" value={socialLinks} onChangeText={setSocialLinks} />

      {/* Başvur Butonu */}
      <SubmitButton title="BAŞVUR" onPress={handleApply} />

      {/* Giriş Yap Linki */}
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  footerText: {
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
