import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const AuthInput = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={isPasswordVisible}
      />
      
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Image
            source={isPasswordVisible 
              ? require('../../src/assets/hide.png') 
              : require('../../src/assets/view.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  icon: {
    padding: 10,
  },
  iconImage: {
    width: 20, 
    height: 20,
    resizeMode: 'contain',
  },
});

export default AuthInput;
