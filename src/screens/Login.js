import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions,TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native"; // 📌 Navigation'ı içe aktar
import AuthInput from '../../src/components/AuthInput';
import SubmitButton from '../../src/components/SubmitButton';

const windowWidth = Dimensions.get('window').width;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // 📌 Navigation hook'unu tanımla

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Hata', 'Lütfen kullanıcı adı ve şifrenizi girin.');
      return;
    }
    
    Alert.alert('Başarılı', `Hoş geldin, ${username}!`);
    navigation.navigate("Tabs", { screen: "Vitrin" });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← GERİ</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Giriş Yap</Text>

      <AuthInput
        value={username}
        onChangeText={setUsername}
        placeholder="Kullanıcı Adı"
      />

      <AuthInput
        value={password}
        onChangeText={setPassword}
        placeholder="Şifre"
        secureTextEntry
      />

      <SubmitButton title="Giriş Yap" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:windowWidth*0.1,
    flex: 1,
    justifyContent: 'center',
    padding:windowWidth*0.05,
    backgroundColor: 'white',
  },
  title: {
    marginBottom:windowWidth*0.1,
    fontSize: windowWidth * 0.095,
    textAlign: 'left', 
    alignSelf: 'flex-start', 
  },
  backButton: {
    marginBottom: 10,
  },
});

export default Login;
