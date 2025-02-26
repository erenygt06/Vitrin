import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 📌 AsyncStorage import edildi
import { icons } from '../assets/index';

const windowWidth = Dimensions.get('window').width;

const AddSection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [addedSections, setAddedSections] = useState([]);

  useEffect(() => {
    const loadSections = async () => {
      const storedSections = await AsyncStorage.getItem('addedSections');
      if (storedSections) {
        setAddedSections(JSON.parse(storedSections));
      }
    };
    loadSections();
  }, []);

  useEffect(() => {
    const saveSections = async () => {
      await AsyncStorage.setItem('addedSections', JSON.stringify(addedSections));
    };
    if (addedSections.length > 0) {
      saveSections();
    }
  }, [addedSections]);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.addedSections) {
        setAddedSections(route.params.addedSections);
      }

      if (route.params?.updatedSection) {
        setAddedSections(prevSections => {
          const updatedSections = prevSections.map(section =>
            section.id === route.params.updatedSection.id
              ? { ...section, name: route.params.updatedSection.name }
              : section
          );
          AsyncStorage.setItem('addedSections', JSON.stringify(updatedSections)); // Güncellenen listeyi kaydet
          return updatedSections;
        });
      }
    }, [route.params?.addedSections, route.params?.updatedSection])
  );

  const handleAddSection = () => {
    const newSection = { id: Date.now(), name: "Bölüm" };
    setAddedSections(prev => {
      const updatedSections = [...prev, newSection];
      AsyncStorage.setItem('addedSections', JSON.stringify(updatedSections)); // Yeni bölümü kaydet
      return updatedSections;
    });
  };

  const navigateToSectionCreate = (section) => {
    navigation.navigate("SectionCreate", {
      sectionId: section.id,
      sectionName: section.name,
      addedSections,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.headerTitle}>Senin Vitrin Bölümlerin</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Vitrin")}>
          <Image source={icons.cancel} style={styles.cancelIcon} />
        </TouchableOpacity>

      </View>
      <Text style={styles.headerminiTitle}>Vitrin bölümünü düzenle</Text>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs", { screen: "VitrinTab", params: { addedSections } })}>

        </TouchableOpacity>
      </View>

      <View style={styles.sectionList}>
        {addedSections.length > 0 ? (
          addedSections.map((section) => (
            <TouchableOpacity key={section.id} style={styles.sectionItem} onPress={() => navigateToSectionCreate(section)}>
              <View style={styles.iconRow}>
                <Image source={icons.plus} style={styles.iconImage} />
              </View>
              <Text style={styles.sectionText}>{section.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noSectionText}>Henüz eklenmiş bölüm yok</Text>
        )}
      </View>

      <Text style={styles.addSectionTitle}>Yeni Bölüm Ekle</Text>
      <TouchableOpacity style={styles.addSectionButton} onPress={handleAddSection}>
        <Text style={styles.addSectionText}>Bölüm</Text>
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerminiTitle: {
    fontFamily:"DMSans-Regular",
    marginTop: windowWidth * 0.05,
    marginBottom: windowWidth * 0.05,
  },
  container: {
    marginTop: windowWidth * 0.1,
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: windowWidth * 0.05,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily:"DMSerifDisplay-Regular",
    fontSize: windowWidth * 0.06,
    fontWeight: "400",
    color: "#222",
  },
  cancelIcon: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },
  sectionList: {
    marginBottom: windowWidth * 0.05,
  },
  sectionItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: windowWidth * 0.035,
    borderRadius: windowWidth * 0.02,
    marginVertical: windowWidth * 0.02,
  },
  sectionText: {
    fontSize: windowWidth * 0.04,
    fontWeight: "bold",
  },
  iconRow: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  iconImage: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    marginRight: windowWidth * 0.03,
  },
  addSectionTitle: {
    fontFamily:"DMSerifDisplay-Regular",
    fontSize: windowWidth * 0.05,
    marginTop: windowWidth * 0.05,
    textAlign: "center",
  },
  addSectionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: windowWidth * 0.035,
    borderRadius: windowWidth * 0.03,
    borderWidth: windowWidth * 0.002,
    borderColor: "#DDD",
    marginVertical: windowWidth * 0.03,
  },
  addSectionText: {
    fontFamily:"DMSans-Regular",
    fontSize: windowWidth * 0.04,
  },
  plusSign: {
    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
    color: "#333",
  },
  noSectionText: {
    textAlign: "center",
    color: "#777",
    fontSize: windowWidth * 0.1,
  },
});

export default AddSection;