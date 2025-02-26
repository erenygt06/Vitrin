import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  SafeAreaView,
  FlatList,
  Modal
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";

const windowWidth = Dimensions.get('window').width;

const CreatingCollection = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { sectionId, sectionName } = route.params;

  const [galleryImages, setGalleryImages] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [urlInputVisible, setUrlInputVisible] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedData = await AsyncStorage.getItem(`section_${sectionId}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setCollectionTitle(parsedData.collectionTitle || "");
        setDescription(parsedData.description || "");
        setGalleryImages(parsedData.galleryImages || []);
        setProducts(parsedData.products || []);
      }
    };
    loadStoredData();
  }, [sectionId]);

  const saveData = async (key, value) => {
    const storedData = await AsyncStorage.getItem(`section_${sectionId}`);
    let updatedData = storedData ? JSON.parse(storedData) : {};
    updatedData[key] = value;
    await AsyncStorage.setItem(`section_${sectionId}`, JSON.stringify(updatedData));
  };

  const selectImage = async () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response) => {
      if (response.didCancel) {
        Alert.alert("İşlem iptal edildi.");
      } else if (response.errorMessage) {
        Alert.alert("Hata:", response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        const updatedImages = [...galleryImages, uri];
        setGalleryImages(updatedImages);
        saveData("galleryImages", updatedImages);
      }
    });
  };

  const addProductFromUrl = () => {
    if (productUrl.trim().length === 0) {
      Alert.alert("Hata", "Lütfen geçerli bir URL girin!");
      return;
    }
    const updatedProducts = [...products, productUrl];
    setProducts(updatedProducts);
    saveData("products", updatedProducts);
    setProductUrl("");
    setUrlInputVisible(false);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs", { screen: "Vitrin" })}>
          <Text style={styles.backText}>← VİTRİNE GERİ DÖN</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.titleInput}
        placeholder="Koleksiyon Başlığı"
        value={collectionTitle}
        onChangeText={(text) => {
          setCollectionTitle(text);
          saveData("collectionTitle", text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Açıklama yaz"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          saveData("description", text);
        }}
      />
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={selectImage}>
          <Text style={styles.actionText}>GÖRSEL EKLE</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.actionText}>SOSYAL MEDYA GÖNDERİSİ BAĞLA</Text>
      </View>

      {/* 📌 Resim galerisi */}
      <FlatList
        data={galleryImages}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.galleryImage} />
        )}
        style={styles.imageContainer}
      />

      {/* 📌 Ürün ekleme butonu */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ ÜRÜN EKLE</Text>
      </TouchableOpacity>

      {/* 📌 Ürün ekleme Modal'ı */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setUrlInputVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalSmallBox}>
            {!urlInputVisible ? (
              <>
                <TouchableOpacity style={styles.modalButton} onPress={() => setUrlInputVisible(true)}>
                  <Text style={styles.modalButtonText}>URL ile </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>KAPAT</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Ürün URL"
                  value={productUrl}
                  onChangeText={setProductUrl}
                />
                <TouchableOpacity style={styles.modalAddButton} onPress={addProductFromUrl}>
                  <Text style={styles.modalAddButtonText}>✔</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setUrlInputVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>✖</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    marginRight: windowWidth * 0.01,
  },
  imageContainer: {
    marginTop: 10,
  },
  galleryImage: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    margin: windowWidth * 0.02,
    borderRadius: 5,
  },
  titleInput: {
    fontSize: windowWidth * 0.09,
    fontWeight: "600",
    color: "#999",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingBottom: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    margin: windowWidth * 0.04,
  },
  header: {
    width: "100%",
    marginBottom: 20,
  },
  backText: {
    fontSize: 14,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#999",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "white",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  separator: {
    marginRight: windowWidth * 0.01,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    right: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  modalContainer: {
    position: "absolute",
    width: windowWidth * 1,
    height: windowWidth * 2.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(141, 141, 141, 0.8)", // %80 şeffaf gri arka plan
    borderRadius: 10,
    padding: 10,
  },
  modalSmallBox: {
    marginTop:windowWidth*1.6,
    marginLeft:windowWidth*0.6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
  },
  modalButton: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 5,
  },
  modalButtonText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalCloseButton: {
    marginLeft:windowWidth*0.05,
    width: windowWidth * 0.25,
    height: windowWidth * 0.1,
    marginTop:windowWidth*0.02,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  modalCloseButtonText: {
    fontWeight:"bold",
    color: "black",
    fontSize: 12,
  },
  modalInput: {
    borderBottomWidth: 1,
    width: "80%",
    textAlign: "center",
  },
  modalAddButton: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 5,
  },
  modalAddButtonText: {
    color: "white",
    fontSize: 12,
  },
});

export default CreatingCollection;
