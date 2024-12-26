import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth'; // Firebase Authentication importu
import { auth } from '../data/firebaseConfig'; // firebaseConfig.js dosyasından import et

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  // Şifre sıfırlama işlemi
  const handleResetPassword = async () => {
    if (email === '') {
      Alert.alert('Hata', 'Lütfen e-posta adresinizi girin.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Başarılı', 'E-posta adresinize şifre sıfırlama talimatları gönderildi.');
      navigation.navigate('LoginScreen'); // Geriye login ekranına yönlendiriyoruz
    } catch (error) {
      console.log('Error resetting password: ', error.message);
      Alert.alert('Hata', 'Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Arka Plan Deseni */}
      <View style={styles.backgroundPattern}>
        <View style={styles.backgroundTop}></View>
        <View style={styles.backgroundBottom}></View>
      </View>

      {/* Forgot Password Box */}
      <View style={styles.box}>
        <Text style={styles.title}>Şifremi Unuttum</Text>

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

        {/* Şifreyi Sıfırlama Butonu */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetText}>Şifreyi Sıfırla</Text>
        </TouchableOpacity>

        {/* Geri Butonu */}
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()} // Önceki sayfaya dönmek için
        >
          <Text style={styles.goBackText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3F1DF', // Arka plan için verilen renk
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  backgroundTop: {
    flex: 1,
    backgroundColor: '#5A6C57', // Üst arka plan için verilen renk
    height: '60%',
    borderBottomRightRadius: 80,
  },
  backgroundBottom: {
    flex: 1,
    backgroundColor: '#739072', // Alt arka plan için verilen renk
    height: '60%',
    borderTopLeftRadius: 80,
  },
  box: {
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A4D39', // Başlık için koyu renk
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
  resetButton: {
    backgroundColor: '#66785F', // Şifre sıfırlama butonu için verilen renk
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  resetText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBackButton: {
    backgroundColor: '#85A98F', // Geri dön butonu için verilen renk
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  goBackText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
