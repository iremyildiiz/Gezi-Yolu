import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video'; // Video kütüphanesi import edildi

const CitiesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // Favorileri yükleme
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
        }
      } catch (err) {
        console.error('Favoriler yüklenirken hata oluştu:', err);
      }
    };
    loadFavorites();
  }, []);

  // Şehir verisini API'den çekme
  useEffect(() => {
    fetch('https://turkiyeapi.herokuapp.com/api/v1/provinces')
      .then((response) => response.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) {
          setCities(data.data);
        } else {
          setError('Veri formatı hatalı veya boş');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Hata: ' + err.message);
        setLoading(false);
      });
  }, []);

  // Favorilere ekleme/kaldırma
  const toggleFavorite = async (city) => {
    const updatedFavorites = favorites.some((fav) => fav.id === city.id)
      ? favorites.filter((fav) => fav.id !== city.id)
      : [...favorites, city];

    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (err) {
      console.error('Favoriler kaydedilirken hata oluştu:', err);
    }
  };

  // Yükleniyor ekranı
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Hata ekranı
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Hata: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Arka planda video */}
      <Video
        source={require('../assets/videos/cities.mp4')} // Videonun yolu
        style={StyleSheet.absoluteFill} // Videoyu tam ekran yapar
        resizeMode="cover" // Videoyu ekrana sığacak şekilde keser/döşer
        repeat // Döngüye alır
        muted // Videonun sesini kapatır
        rate={1.0} // Normal hızda oynatır
      />

      {/* İçerik için üst katman */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Türkiyedeki Şehirler</Text>
        <FlatList
          data={cities} // Şehir verisi
          keyExtractor={(item) => (item.id ? item.id.toString() : item.name)}
          renderItem={({ item }) => (
            <View style={styles.cityItem}>
              <TouchableOpacity
                style={styles.cityInfo}
                onPress={() =>
                  navigation.navigate('CityDetail', { cityId: item.id })
                }
              >
                <Text style={styles.cityName}>{item.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Icon
                  name={
                    favorites.some((fav) => fav.id === item.id)
                      ? 'star'
                      : 'star-outline'
                  }
                  size={24}
                  color={
                    favorites.some((fav) => fav.id === item.id)
                      ? '#FFD700'
                      : '#fff'
                  }
                />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          initialNumToRender={81} // Performans için başlangıçta kaç eleman yüklenecek
          maxToRenderPerBatch={81} // Performans için maksimum render miktarı
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Siyah arka plan (videoyla uyumlu olsun diye)
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Hafif karartma efekti
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cityName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default CitiesScreen;
