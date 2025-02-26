import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CollectionCard from '../components/CollectionCard';
import { launchImageLibrary } from 'react-native-image-picker';

const windowWidth = Dimensions.get('window').width;

const Vitrin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [profileImage, setProfileImage] = useState(null);
  const [addedSections, setAddedSections] = useState([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  useEffect(() => {
    const loadSections = async () => {
      const storedSections = await AsyncStorage.getItem('addedSections');
      if (storedSections) {
        setAddedSections(JSON.parse(storedSections));
      }
    };
    loadSections();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.addedSections) {
        setAddedSections(route.params.addedSections);
      }
    }, [route.params?.addedSections])
  );

  const selectProfilePicture = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('İşlem iptal edildi.');
      } else if (response.errorMessage) {
        Alert.alert('Hata:', response.errorMessage);
      } else {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
  <TouchableOpacity onPress={selectProfilePicture}>
    <Image
      source={profileImage ? { uri: profileImage } : require('../../src/assets/hide.png')}
      style={styles.profileImage}
    />
  </TouchableOpacity>
  <Text style={styles.profileName}>Cemal</Text>
  <Text style={styles.profileDescription}>Kendinden biraz bahset</Text>
  <TouchableOpacity>
    <Text style={styles.addSocialLink}>Sosyal Medyanı Bağla</Text>
  </TouchableOpacity>

  
  <ScrollView horizontal style={styles.sectionScrollView} showsHorizontalScrollIndicator={false}>
    {addedSections.length > 0 ? (
      addedSections.map((section) => (
        <TouchableOpacity 
          key={section.id} 
          style={styles.sectionCard} 
          onPress={() => {
            navigation.navigate("CreatingCollection", {
              sectionId: section.id,
              sectionName: section.name,
            });
          }}
        >
          <Text style={styles.sectionCardText}>{section.name}</Text>
        </TouchableOpacity>
      ))
    ) : (
      <Text style={styles.noSectionsText}>Henüz eklenmiş bölüm yok</Text>
    )}
  </ScrollView>
</View>

      

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsBottomSheetVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Koleksiyon</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetVisible}
        onRequestClose={() => setIsBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetTitle}>BÖLÜM SEÇ:</Text>

            <ScrollView>
              {addedSections.length > 0 ? (
                addedSections.map((section) => (
                  <TouchableOpacity 
                    key={section.id} 
                    style={styles.sheetButton}
                    onPress={() => {
                      setIsBottomSheetVisible(false);
                      navigation.navigate("CreatingCollection", {
                        sectionId: section.id,
                        sectionName: section.name,
                      });
                    }}
                  >
                    <Text style={styles.sheetButtonText}>{section.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noSectionsText}>Henüz eklenmiş bölüm yok</Text>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.sheetButtonDark}
              onPress={() => {
                setIsBottomSheetVisible(false);
                navigation.navigate("AddSection");
              }}
            >
              <Text style={styles.sheetButtonTextDark}>+ BÖLÜM EKLE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsBottomSheetVisible(false)}
            >
              <Text style={styles.closeButtonText}>✖ KAPAT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop:windowWidth*0.22,
  },
  profileImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: windowWidth * 0.05,
    backgroundColor: '#e0e0e0',
  },
  profileName: {
    fontFamily:"DMSerifDisplay-Regular",
    fontSize:windowWidth*0.065,
    fontWeight: 'bold',
    marginTop: windowWidth*0.03,
  },
  profileDescription: {
    fontFamily:"DMSerifDisplay-Regular",
    fontSize:windowWidth*0.035,
    color: '#777',
    marginTop: 5,
  },
  addSocialLink: {
    fontFamily:"DMSans-Bold",
    fontSize:windowWidth*0.035,
    color: 'black',
    marginTop:windowWidth*0.005,
  },
  addButton: {
    position: 'absolute',
    bottom:windowWidth*0.06,
    right:windowWidth*0.03,
    backgroundColor: 'white',
    paddingVertical:windowWidth*0.03,
    paddingHorizontal: windowWidth*0.03,
    borderRadius: windowWidth*0.08,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: windowWidth*0.03,
    elevation:  windowWidth*0.03,
  },
  addButtonText: {
    fontFamily:"DMSans-Bold",
    color: 'black',
    fontSize: windowWidth * 0.04,
    fontWeight: '500',
  },

  bottomSheetContainer: {
    marginBottom:windowWidth*0.15,
    width:windowWidth*1,
    height:windowWidth*1,
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
   
},
  bottomSheet: {
    backgroundColor: 'transparent',
    padding: windowWidth*0.03,
    borderTopLeftRadius: windowWidth*0.03,
    borderTopRightRadius: windowWidth*0.03,
    alignItems: 'center',
    maxHeight: windowWidth * 1.2, 
  },
  bottomSheetTitle: {
    fontFamily:"DMSans-Bold",
    marginLeft:windowWidth*0.68,
    fontSize: windowWidth*0.04,
    fontWeight: 'bold',
    marginBottom: windowWidth*0.015,
    color:"white",
  },
  sheetButton: {
    marginLeft:windowWidth*0.43,
    width: windowWidth * 0.5,
    backgroundColor: 'white',
    paddingVertical:windowWidth*0.03,
    borderRadius: windowWidth*0.03,
    borderWidth:windowWidth*0.0005,
    borderColor: '#000',
    alignItems: 'center',
    marginBottom:windowWidth*0.015,
  },
  sheetButtonText: {
    fontSize:windowWidth*0.035,
    fontWeight: 'bold',
  },
  sheetButtonDark: {
    marginLeft:windowWidth*0.43,
    width: windowWidth * 0.5,
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius:windowWidth*0.03,
    alignItems: 'center',
    marginBottom: windowWidth*0.04,
  },
  sheetButtonTextDark: {
    fontSize: windowWidth*0.035,
    fontFamily:"DMSans-Bold",
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    marginLeft:windowWidth*0.63,
    width: windowWidth * 0.3,
    backgroundColor: 'white',
    paddingVertical: windowWidth*0.025,
    borderRadius: windowWidth*0.05,
    borderWidth:windowWidth*0.001,
    borderColor: '#000',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: windowWidth*0.035,
    fontWeight: 'bold',
  },
  noSectionsText: {
    fontSize: windowWidth*0.05,
    color: '#777',
    textAlign: 'center',
    marginVertical: windowWidth*0.01,
  },
  sectionScrollView: {
    marginTop: windowWidth*0.03,
    flexDirection: "row",
    paddingHorizontal:windowWidth*0.005,
    maxHeight: windowWidth*0.2,
  },
  sectionCard: {
    backgroundColor: "white",
    paddingHorizontal:windowWidth*0.07,
    paddingVertical: windowWidth*0.03,
    borderRadius:windowWidth*0.01, 
    marginHorizontal: windowWidth*0.01,
    minWidth: windowWidth*0.1,
    alignItems: "center",
    shadowColor: "#000",
   
    elevation: windowWidth*0.001,
    borderWidth:windowWidth*0.003, 
    borderColor: "#ddd", 
  },
  sectionCardText: {
    color: "black",
    fontSize:windowWidth*0.033,
    fontWeight: "bold",
  },
});

export default Vitrin;
