import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';

const CityDetailScreen = ({ route }) => {
  const { cityId } = route.params; // Tıklanan şehri alıyoruz
  const [cityDetails, setCityDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://turkiyeapi.herokuapp.com/api/v1/provinces/${cityId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          setCityDetails(data.data);
        } else {
          setCityDetails(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        setCityDetails(null);
        setLoading(false);
      });
  }, [cityId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007369" />
      </View>
    );
  }

  if (!cityDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Şehir bilgileri yüklenemedi</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{cityDetails.name}</Text>
        <Text style={styles.region}>Bölge: {cityDetails.region.tr}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Popülasyon: {cityDetails.population}</Text>
        <Text style={styles.infoText}>Alan: {cityDetails.area} km²</Text>
        <Text style={styles.infoText}>Yükseklik: {cityDetails.altitude} m</Text>
        <Text style={styles.infoText}>Büyükşehir: {cityDetails.isMetropolitan ? 'Evet' : 'Hayır'}</Text>
      </View>

      <View style={styles.mapsContainer}>
        <Text style={styles.subtitle}>Harita:</Text>
        <TouchableOpacity onPress={() => Linking.openURL(cityDetails.maps.googleMaps)} style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Open in Google Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(cityDetails.maps.openStreetMap)} style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Open in OpenStreetMap</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.districtsContainer}>
        <Text style={styles.subtitle}>İlçeler:</Text>
        {cityDetails.districts.map((district, index) => (
          <View key={index} style={styles.districtCard}>
            <Text style={styles.districtName}>{district.name}</Text>
            <Text style={styles.districtInfo}>Population: {district.population}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  region: {
    fontSize: 20,
    color: '#555',
    fontStyle: 'italic',
  },
  infoContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  infoText: {
    fontSize: 18,
    color: '#444',
    marginBottom: 8,
  },
  mapsContainer: {
    marginBottom: 30,
  },
  mapButton: {
    backgroundColor: '#007369',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  districtsContainer: {
    marginBottom: 30,
  },
  districtCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  districtName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  districtInfo: {
    fontSize: 16,
    color: '#777',
  },
});

export default CityDetailScreen;
