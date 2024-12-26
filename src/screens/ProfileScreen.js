import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        const storedProfileImage = await AsyncStorage.getItem('profileImage');
        if (storedProfileImage) {
          setProfileImage(storedProfileImage);
        }
      } catch (error) {
        console.log('User load error: ', error.message);
        Alert.alert('Hata', 'Kullanıcı verisi yüklenirken bir hata oluştu.');
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log('Logout Error: ', error.message);
      Alert.alert('Hata', 'Çıkış yaparken bir hata oluştu.');
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Hesap Silme",
      "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      [
        {
          text: "Evet",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user');
              await AsyncStorage.removeItem('profileImage');
              navigation.navigate('LoginScreen');
            } catch (error) {
              console.log('Delete Account Error: ', error.message);
              Alert.alert('Hata', 'Hesap silme işlemi sırasında bir hata oluştu.');
            }
          },
        },
        { text: "Hayır", style: "cancel" },
      ]
    );
  };

  const handlePickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5 },
      (response) => {
        if (response.didCancel) {
          console.log('Kullanıcı resmi seçmeyi iptal etti');
        } else if (response.errorCode) {
          console.log('Hata: ', response.errorMessage);
          Alert.alert('Hata', 'Resim seçme işlemi sırasında bir hata oluştu.');
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri;
          setProfileImage(selectedImage);
          try {
            AsyncStorage.setItem('profileImage', selectedImage);
          } catch (error) {
            console.log('Error saving profile image: ', error.message);
            Alert.alert('Hata', 'Profil resmi kaydedilirken bir hata oluştu.');
          }
        }
      }
    );
  };

  return (
    <ImageBackground
      source={require('/Users/iremyildiz/GeziYolu/src/assets/images/profilimage.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        {/* Profil Resmi */}
        <TouchableOpacity onPress={handlePickImage}>
          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Icon name="account-circle" size={100} color="#fff" />
            )}
          </View>
        </TouchableOpacity>

        {/* Kullanıcı Bilgisi */}
        {user && <Text style={styles.userName}>{user.name}</Text>}

        {/* Çıkış Yap Butonu */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>

        {/* Hesap Sil Butonu */}
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteAccount}>
          <Icon name="delete" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Hesabı Sil</Text>
        </TouchableOpacity>

        {/* Gezilen Şehirler Butonu */}
        <TouchableOpacity
          style={[styles.button, styles.cityButton]}
          onPress={() => navigation.navigate('AddNote')}
        >
          <Icon name="map" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Anı defterim</Text>
        </TouchableOpacity>

        {/* Gezilen Yerler Görsel Butonu */}
<TouchableOpacity
  style={[styles.button, styles.visitedPlacesButton]}
  onPress={() => navigation.navigate('VisitedPlacesScreen')}
>
  <Icon name="image-multiple" size={20} color="#fff" style={styles.buttonIcon} />
  <Text style={styles.buttonText}>Benim Gözümden</Text>
</TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Yarı saydamlığı arttırdık
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  profileImageContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    padding: 5,
    width: 140,
    height: 150,
  },
  profileImage: {
    width: 120,
    height: 130,
    borderRadius: 50,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Yazı rengini beyaz yaptık
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#333', // Düğme arka planını koyu yaptık
  },
  buttonText: {
    color: '#fff', // Yazı rengini beyaz yaptık
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#402523', // Silme butonunun rengi kırmızı
  },
  cityButton: {
    backgroundColor: '#A67360', // Gezilen yerler butonu için mavi renk
  },
  visitedPlacesButton:{
    backgroundColor:'#A68F97'
  }
});

export default ProfileScreen;
