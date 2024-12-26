import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Switch, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase Authentication importu
import { auth } from '../data/firebaseConfig'; // firebaseConfig.js dosyasından import et
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import et

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    // AsyncStorage'dan oturum bilgisini kontrol et
    const checkUserSession = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          navigation.navigate('Home'); // Kullanıcı zaten giriş yapmışsa Home ekranına yönlendir
        }
      } catch (error) {
        console.log("Error checking session: ", error.message);
      }
    };

    checkUserSession(); // Sayfa yüklendiğinde oturum kontrolü
  }, []);

  // Login işlevi
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'E-posta ve şifre alanları boş bırakılamaz!');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate('Home'); 
    } catch (error) {
      Alert.alert('Giriş Hatası', error.message);
      console.log("Login Error: ", error.message);
    }
  };

  // Kayıt işlemi
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'E-posta ve şifre alanları boş bırakılamaz!');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate('LoginScreen'); // Kayıt başarılıysa Home ekranına yönlendir
    } catch (error) {
      Alert.alert('Kayıt Hatası', error.message);
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

      {/* Login Box */}
      <View style={styles.loginBox}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajKZUpkARQplzHOYUdfCm_5NI7XYESSD9FQ&s' }} // Profil simgesi URL'si
          style={styles.profileIcon}
        />
        <Text style={styles.title}>Giriş Yap</Text>

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
          <Switch
            value={isPasswordVisible}
            onValueChange={setIsPasswordVisible}
            style={styles.passwordToggle}
          />
        </View>

       {/* Şifremi Unuttum - Yönlendirme */}
       <TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')}>
          <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
        </TouchableOpacity>

        {/* Giriş Butonu */}
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>Giriş Yap</Text>
        </TouchableOpacity>

        {/* Kayıt Ol Butonu */}
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => navigation.navigate('RegisterScreen')} // Burada 'RegisterScreen' sayfasına yönlendiriyoruz
        >
          <Text style={styles.signUpText}> Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0EAE6', // Açık yeşil arka plan
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  backgroundTop: {
    flex: 1,
    backgroundColor: '#127369', // Yeşil temalı üst arka plan
    height: '60%',
    borderBottomRightRadius: 80,
  },
  backgroundBottom: {
    flex: 1,
    backgroundColor: '#68A397', // Açık yeşil arka plan
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
    width: 220,
    height: 190,
    borderRadius: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#525B44', // Başlık için yeşil ton
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
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: '#127369', // "Şifremi Unuttum" bağlantısı için yeşil ton
    fontSize: 12,
    marginTop: -10,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#127369', // Giriş butonu için yeşil ton
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
    backgroundColor: '#68A397', // Kayıt ol butonu için daha açık yeşil ton
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

export default LoginScreen;
