import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase Authentication importu
import { auth } from '../data/firebaseConfig'; // firebaseConfig.js dosyasından import et
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import et

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Kayıt işlemi
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Şifreler uyuşmuyor!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Kayıt başarılıysa AsyncStorage'a kullanıcı bilgilerini kaydedelim
      const user = auth.currentUser;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate('Home'); // Kayıt başarılıysa Home ekranına yönlendir
    } catch (error) {
      console.log("Sign Up Error: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Arka Plan Deseni */}
      <View style={styles.backgroundPattern}>
        <View style={styles.backgroundTop}></View>
        <View style={styles.backgroundBottom}></View>
      </View>

      {/* Register Box */}
      <View style={styles.loginBox}>
        <Image
          source={{ uri: 'https://example.com/register-icon.png' }} // Profil simgesi URL'si
          style={styles.profileIcon}
        />
        <Text style={styles.title}>Kayıt Ol</Text>

        {/* E-posta Alanı */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Şifre Alanı */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            placeholderTextColor="#666"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text>{isPasswordVisible ? 'Gizle' : 'Göster'}</Text>
          </TouchableOpacity>
        </View>

        {/* Şifreyi Doğrula */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Şifreyi Tekrar Gir"
            placeholderTextColor="#666"
            secureTextEntry={!isPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Kayıt Ol Butonu */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
          <Text style={styles.signInText}>Kayıt Ol</Text>
        </TouchableOpacity>

        {/* Giriş Yap Butonu */}
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => navigation.navigate('LoginScreen')} // Burada 'LoginScreen' sayfasına yönlendiriyoruz
        >
          <Text style={styles.signUpText}>Zaten Hesabım Var</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2C9AD', // Açık yeşil arka plan
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  backgroundTop: {
    flex: 1,
    backgroundColor: '#66785F', // Yeşil temalı üst arka plan
    height: '60%',
    borderBottomRightRadius: 80,
  },
  backgroundBottom: {
    flex: 1,
    backgroundColor: '#91AC8F', // Açık yeşil arka plan
    height: '60%',
    borderTopLeftRadius: 80,
  },
  loginBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B5945', // Başlık için yeşil ton
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  passwordToggle: {
    marginLeft: 10,
    padding: 5,
  },
  signInButton: {
    backgroundColor: '#708871', // Kayıt butonu için yeşil ton
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  signInText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#BEC6A0', // Giriş yap butonu için daha açık yeşil ton
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  signUpText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
