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
      <Image source={image.girisimage} style={styles.mainImage} />
      <Text style={styles.title}>Saniyeler içinde link oluştur</Text>
      <Text style={styles.description}>
        Hedef kitlenizle paylaştığınız ürünlerden en yüksek komisyonu kazanmak
        hiç bu kadar kolay olmamıştı.
      </Text>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")} 
        >
          <Text style={styles.loginButtonText}>GİRİŞ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => navigation.navigate("Apply")}
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
    paddingHorizontal: windowWidth*0.05,
  },
  mainImage: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    resizeMode: "contain",
    marginBottom: windowWidth*0.2,
  },
  title: {
    fontFamily:"DMSerifDisplay-Regular",
    fontSize: windowWidth*0.07,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: windowWidth*0.04,
  },
  description: {
    fontFamily:"DMSans-Regular",
    fontSize:windowWidth*0.042,
    textAlign: "center",
    color: "#555",
    marginBottom: windowWidth*0.04,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    marginTop:windowWidth*0.2,
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
    fontFamily:"DMSans-Regular",
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
    fontFamily:"DMSans-Regular",
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LandingPage;
