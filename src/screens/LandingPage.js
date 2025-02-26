import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { image } from "../assets/index"; 
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LandingPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 📌 Üst Resim */}
      <Image source={image.girisimage} style={styles.mainImage} />

      {/* 📌 Açıklama Alanı */}
      <Text style={styles.title}>Saniyeler içinde link oluştur</Text>
      <Text style={styles.description}>
        Hedef kitlenizle paylaştığınız ürünlerden en yüksek komisyonu kazanmak
        hiç bu kadar kolay olmamıştı.
      </Text>

      {/* 📌 Sayfa Gösterge Noktaları */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* 📌 Butonlar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")} // 📌 Login Sayfasına Yönlendir
        >
          <Text style={styles.loginButtonText}>GİRİŞ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => navigation.navigate("Apply")} // 📌 Register Sayfasına Yönlendir
        >
          <Text style={styles.applyButtonText}>BAŞVUR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  mainImage: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  loginButton: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  applyButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LandingPage;
