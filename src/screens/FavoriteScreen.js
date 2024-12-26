import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ route, navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Favorileri AsyncStorage'dan yükle
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Favoriler yüklenemedi:', error);
      }
    };

    loadFavorites();
  }, []);

  const filteredFavorites = favorites.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeFavorite = async (city) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== city.id);
    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Favori güncellenemedi:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Arka planda video */}
      <Video
        source={require('../assets/videos/favorites.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat
        muted
        rate={1.0}
      />

      {/* İçerik için üst katman */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Favori Şehirler</Text>

        {/* Arama Çubuğu */}
        <TextInput
          style={styles.searchBar}
          placeholder="Şehir Ara..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />

        {filteredFavorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz favori şehir eklenmedi.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredFavorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cityItem}>
                <Text style={styles.cityName}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeFavorite(item)}>
                  <Icon name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cityName: {
    fontSize: 18,
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#007369',
    padding: 10,
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default FavoritesScreen;
