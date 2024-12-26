import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import popularCities from '../assets/popülerşehirler.json';
import historicalCities from '../assets/tarihişehirler.json';
import travelTips from '../assets/travelTips.json';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/başlık.jpeg')}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <Text style={styles.appTitle}>Gezi Yolu</Text>
      </ImageBackground>

      <Text style={styles.title}>Popüler Türk Şehirleri</Text>
      <FlatList
        data={popularCities}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cityCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.cityImage} />
            <Text style={styles.cityName}>{item.name}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Tarihi Şehirler</Text>
      <FlatList
        data={historicalCities}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cityCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.cityImage} />
            <Text style={styles.cityName}>{item.name}</Text>
          </View>
        )}
      />

      <Text style={styles.tipTitle}>Seyahat İpuçları</Text>
      <ScrollView style={styles.tipsContainer}>
        {travelTips.map((tip) => (
          <View key={tip.id} style={styles.tipCard}>
            <Image source={{ uri: tip.image }} style={styles.tipImage} />
            <Text style={styles.tipTitleText}>{tip.title}</Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => navigation.navigate('TipDetails', { tip })}
            >
              <Text style={styles.moreText}>Daha Fazla Oku</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    opacity: 0.8,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  cityCard: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  cityImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  cityName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20,
  },
  tipsContainer: {
    marginHorizontal: 10,
  },
  tipCard: {
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
  },
  tipImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  tipTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  moreButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
  },
  moreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
