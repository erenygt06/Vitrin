import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const SectionCreate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sectionName, sectionId } = route.params || {};

  const [sectionTitle, setSectionTitle] = useState(sectionName || '');

  useEffect(() => {
    setSectionTitle(sectionName || '');
  }, [sectionName]);

  const handleSave = async () => {
    if (sectionTitle.trim() === '') {
      alert('Lütfen bir başlık girin.');
      return;
    }

    try {
      const storedSections = await AsyncStorage.getItem('addedSections');
      let sections = storedSections ? JSON.parse(storedSections) : [];

      sections = sections.map(section =>
        section.id === sectionId ? { ...section, name: sectionTitle } : section
      );

      await AsyncStorage.setItem('addedSections', JSON.stringify(sections));

      navigation.navigate('AddSection', {
        updatedSection: { id: sectionId, name: sectionTitle },
      });
    } catch (error) {
      console.error('Bölüm güncellenirken hata oluştu:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bölüm Başlığı Düzenle:</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.doneText}>TAMAM</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="BÖLÜM BAŞLIĞI"
            value={sectionTitle}
            onChangeText={setSectionTitle}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>TAMAM</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    margin: windowWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: windowWidth*0.045,
    fontWeight: 'bold',
  },
  doneText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    marginHorizontal: windowWidth * 0.05,
    backgroundColor: '#F5F4F4',
    paddingVertical:windowWidth*0.04,
    paddingHorizontal:windowWidth*0.04,
    borderRadius:windowWidth*0.02,
  },
  input: {
    fontSize: windowWidth*0.04,
    color: '#333',
  },
  saveButton: {
    margin: windowWidth * 0.05,
    backgroundColor: 'black',
    padding: windowWidth*0.04,
    alignItems: 'center',
    borderRadius: windowWidth*0.01,
    marginTop: windowWidth*0.1,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SectionCreate;
