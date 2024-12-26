import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VisitedPlacesScreen = () => {
  const [city, setCity] = useState('');
  const [cityImages, setCityImages] = useState({});

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('cityImages');
        if (storedData) {
          setCityImages(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Veriler yüklenirken hata oluştu:', error);
      }
    };

    loadStoredData();
  }, []);

  const saveToStorage = async (data) => {
    try {
      await AsyncStorage.setItem('cityImages', JSON.stringify(data));
    } catch (error) {
      console.error('Veriler kaydedilirken hata oluştu:', error);
    }
  };

  const handlePickImage = () => {
    if (!city.trim()) {
      Alert.alert('Hata', 'Lütfen önce bir şehir adı girin!');
      return;
    }

    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5, selectionLimit: 0 },
      (response) => {
        if (response.didCancel) {
          console.log('Kullanıcı resmi seçmeyi iptal etti');
        } else if (response.errorCode) {
          console.log('Hata: ', response.errorMessage);
          Alert.alert('Hata', 'Resim seçme işlemi sırasında bir hata oluştu.');
        } else if (response.assets) {
          setCityImages((prev) => {
            const updatedImages = {
              ...prev,
              [city]: [...(prev[city] || []), ...response.assets.map((asset) => asset.uri)],
            };
            saveToStorage(updatedImages); 
            return updatedImages;
          });
          setCity(''); 
        }
      }
    );
  };

  const handleDeleteImage = (cityName, imageUri) => {
    setCityImages((prev) => {
      const updatedCityImages = { ...prev };

      // Sadece seçilen şehrin resmini sil
      updatedCityImages[cityName] = updatedCityImages[cityName].filter((uri) => uri !== imageUri);

      // Eğer o şehirde başka resim yoksa, şehir verisini kaldır
      if (updatedCityImages[cityName].length === 0) {
        delete updatedCityImages[cityName];
      }

      saveToStorage(updatedCityImages); // AsyncStorage'a kaydet
      return updatedCityImages;
    });
  };

  const handleClearData = async () => {
    try {
      await AsyncStorage.removeItem('cityImages');
      setCityImages({});
      Alert.alert('Başarılı', 'Tüm veriler silindi.');
    } catch (error) {
      console.error('Veriler silinirken hata oluştu:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gezdiğiniz Yerler</Text>
      <Image source={require('/Users/iremyildiz/GeziYolu/src/assets/images/arkaplann.jpg')} style={styles.backgroundImage} />

      <TextInput
        style={styles.input}
        placeholder="Şehir adı girin..."
        placeholderTextColor="#888"
        value={city}
        onChangeText={setCity}
      />

      {/* Resim Seç Butonu */}
      <TouchableOpacity style={styles.button} onPress={handlePickImage}>
        <Icon name="image-plus" size={24} color="#fff" />
        <Text style={styles.buttonText}>Resim Ekle</Text>
      </TouchableOpacity>

      {/* Verileri Temizle Butonu */}
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClearData}>
        <Icon name="trash-can-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Hepsini Temizle</Text>
      </TouchableOpacity>

      {/* Şehir ve Resimlerin Listesi */}
      <FlatList
        data={Object.keys(cityImages)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.citySection}>
            <Text style={styles.cityTitle}>{item}</Text>
            <FlatList
              data={cityImages[item]}
              keyExtractor={(imageUri, index) => index.toString()}
              horizontal
              renderItem={({ item: imageUri }) => (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: imageUri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteImage(item, imageUri)} // Sadece o şehre ait görseli sil
                  >
                    <Icon name="trash-can" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz resim eklenmedi.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A68F97',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#A68F97',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  clearButton: {
    backgroundColor: '#BF9288',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  citySection: {
    marginTop: 20,
  },
  cityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  imageContainer: {
    marginRight: 8,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#888',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '130%',
    height: '150%',
    resizeMode: 'cover',
  },
});

export default VisitedPlacesScreen;
