import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { turkiyeGeziRehberi } from '../data/citiesData'; // JSON verisini import et

const CityListScreen = () => {
  const [expandedInfo, setExpandedInfo] = useState({});

  const toggleInfo = (key) => {
    setExpandedInfo((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderExpandableSection = (key, label, content, emoji) => (
    <View style={styles.expandableSection}>
      <TouchableOpacity onPress={() => toggleInfo(key)} style={styles.expandableButton}>
        <Text style={styles.expandableText}>
          {emoji} {label} {expandedInfo[key] ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      {expandedInfo[key] && (
        <View style={styles.expandableContent}>
          <Text style={styles.placeVisitorInfo}>{content}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Başlık Bölümü */}
      <View style={styles.titleContainer}>
        <Image 
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_MwkEePAJeAyVRwNApc2B35e-d7BLPk940g&s' }} 
          style={styles.titleBackgroundImage}
        />
        <Text style={styles.title}>
          🌍 Türkiye'nin Gezi Rehberi 🧳
        </Text>
        <View style={styles.titleUnderline}></View>
      </View>

      {/* Şehir Kartları */}
      <FlatList
        data={turkiyeGeziRehberi}
        keyExtractor={(item) => item.city}
        renderItem={({ item }) => (
          <View style={styles.cityCard}>
            <Text style={styles.cityName}>{item.city}</Text>
            <ScrollView style={styles.placesContainer}>
              {item.places.map((place, index) => (
                <View key={index} style={styles.placeCard}>
                  {place.image && <Image source={{ uri: place.image }} style={styles.placeImage} />}
                  <View style={styles.placeInfo}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.placeCategory}>{place.category}</Text>
                    <Text style={styles.placeDescription}>{place.description}</Text>

                    {/* Adres Bilgisi */}
                    {renderExpandableSection(
                      `address_${item.city}_${index}`,
                      'Adres',
                      place.address,
                      '📍'
                    )}

                    {/* Ziyaret Saatleri */}
                    {renderExpandableSection(
                      `hours_${item.city}_${index}`,
                      'Açılış Saatleri',
                      `Açılış Saatleri: ${place.visitor_info.open_hours}`,
                      '⏰'
                    )}

                    {/* Bilet Fiyatı */}
                    {renderExpandableSection(
                      `ticket_${item.city}_${index}`,
                      'Bilet Fiyatı',
                      `Bilet Fiyatı: ${place.visitor_info.ticket_price}`,
                      '🎟️'
                    )}

                    {/* En İyi Ziyaret Zamanı */}
                    {renderExpandableSection(
                      `best_time_${item.city}_${index}`,
                      'En İyi Zaman',
                      `En İyi Zaman: ${place.visitor_info.best_time_to_visit}`,
                      '🌤️'
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 20,
  },
  titleBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: 120,
    opacity: 0.2,
    borderRadius: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    paddingVertical: 20,
    letterSpacing: 1,
    zIndex: 2,
  },
  titleUnderline: {
    width: '50%',
    height: 4,
    backgroundColor: '#3498db',
    marginTop: 5,
    borderRadius: 2,
  },

  cityCard: {
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 10,
    elevation: 4,
  },
  cityName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 10,
  },

  placesContainer: {
    marginTop: 10,
  },
  placeCard: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    elevation: 3,
  },
  placeImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeInfo: {
    marginTop: 10,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  placeCategory: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  placeDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },

  expandableSection: {
    marginTop: 10,
  },
  expandableButton: {
    padding: 3,
    borderRadius: 5,
    alignItems: 'flex-start',
    marginTop: 3,
  },
  expandableText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  expandableContent: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  placeVisitorInfo: {
    fontSize: 14,
    color: '#2c3e50',
  },
});

export default CityListScreen;
