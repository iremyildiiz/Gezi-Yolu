import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const TipDetails = ({ route, navigation }) => {
  const { tip } = route.params;
  const { id, title, description, image } = tip;

  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currency, setCurrency] = useState('EUR');
  const [loading, setLoading] = useState(false);
  const [reservationInfo, setReservationInfo] = useState(null);

  useEffect(() => {
    if (id === "1") {
      setLoading(true);
      axios
        .get('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => {
          setExchangeRate(response.data.rates);
          setLoading(false);
        })
        .catch(error => {
          console.error("Döviz kuru alınırken hata oluştu:", error);
          setLoading(false);
        });
    } else if (id === "2") {
      // Test verisi, API'den veri gelmezse kullanılabilir.
      const testReservationInfo = {
        sites: [
          { name: "Site 1", description: "Erken rezervasyon ile indirim fırsatı." },
          { name: "Site 2", description: "Popüler erken rezervasyon sitesi." },
          { name: "Site 3", description: "Özel kampanyalı rezervasyon fırsatları." },
        ],
      };

      setReservationInfo(testReservationInfo);
    }
  }, [id]);

  const handleConvertCurrency = () => {
    if (amount && exchangeRate && currency) {
      const result = (amount * exchangeRate[currency]).toFixed(2);
      setConvertedAmount(result);
    }
  };

  const renderAdditionalContent = () => {
    switch (id) {
      case "1":
        return (
          <View style={styles.additionalInfoContainer}>
            <Text style={styles.additionalInfoTitle}>Döviz Hesaplama:</Text>
            <TextInput
              style={styles.input}
              placeholder="Miktar Girin"
              keyboardType="numeric"
              value={amount}
              onChangeText={text => setAmount(text)}
            />
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Text style={styles.additionalInfoText}>Hedef Para Birimi: {currency}</Text>
                <Text style={styles.additionalInfoText}>
                  Hesaplanan Tutar: {convertedAmount ? `${convertedAmount} ${currency}` : 'Hesaplama Yapılmadı'}
                </Text>
                <View style={styles.currencyButtons}>
                  {["EUR", "GBP", "TRY"].map(cur => (
                    <TouchableOpacity key={cur} onPress={() => setCurrency(cur)}>
                      <Text style={styles.currencyButtonText}>{cur}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity onPress={handleConvertCurrency} style={styles.button}>
                  <Text style={styles.buttonText}>Hesapla</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        );
        case "2":
  return (
    <View style={styles.additionalInfoContainer}>
      <Text style={styles.additionalInfoTitle}>Erken Rezervasyon Siteleri:</Text>
      <Text style={styles.additionalInfoText}>1. Booking.com: https://www.booking.com</Text>
      <Text style={styles.additionalInfoText}>2. Expedia: https://www.expedia.com</Text>
      <Text style={styles.additionalInfoText}>3. Airbnb: https://www.airbnb.com</Text>
      <Text style={styles.additionalInfoText}>4. Trivago: https://www.trivago.com</Text>
      <Text style={styles.additionalInfoText}>5. Hotels.com: https://www.hotels.com</Text>
      
      <Text style={styles.additionalInfoTitle}>Erken Rezervasyon İpuçları:</Text>
      <Text style={styles.additionalInfoText}>
        - Erken rezervasyon yaparak %50'ye varan indirimlerden yararlanabilirsiniz.
      </Text>
    </View>
  );

        
      case "3":
        return (
          <View style={styles.additionalInfoContainer}>
            <Text style={styles.additionalInfoTitle}>Yerel Yemek Önerileri:</Text>
            <View style={styles.foodItem}>
              <Image source={{ uri: 'https://th.bing.com/th/id/OIP.KU6kS1TO8J4-CclT3jL8YgHaE6?w=232&h=180&c=7&r=0&o=5&dpr=2&pid=1.7' }} style={styles.foodImage} />
              <Text style={styles.additionalInfoText}>
                1. Kısır - Türk mutfağının en bilinen ve sevilen mezelerinden biridir.
              </Text>
            </View>
            <View style={styles.foodItem}>
              <Image source={{ uri: 'https://th.bing.com/th/id/OIP.tFnnZ-2fO8CezVOkJejFtQHaDf?w=309&h=164&c=7&r=0&o=5&dpr=2&pid=1.7' }} style={styles.foodImage} />
              <Text style={styles.additionalInfoText}>
                2. Döner - Etin ince ince kesilip pişirildiği, geleneksel bir Türk yemeğidir.
              </Text>
            </View>
            <View style={styles.foodItem}>
              <Image source={{ uri: 'https://th.bing.com/th/id/OIP.0TtVd1pK4S8_89gDQ-B2SAHaEh?w=311&h=190&c=7&r=0&o=5&dpr=2&pid=1.7' }} style={styles.foodImage} />
              <Text style={styles.additionalInfoText}>
                3. Mantı - Türk usulü minik hamur parçalarının içine et konarak yapılan lezzetli bir yemektir.
              </Text>
            </View>
            <View style={styles.foodItem}>
              <Image source={{ uri: 'https://th.bing.com/th/id/OIP.PpjDEuz4zhH-3qgG3eZmsAHaE8?w=283&h=189&c=7&r=0&o=5&dpr=2&pid=1.7' }} style={styles.foodImage} />
              <Text style={styles.additionalInfoText}>
                4. İskender - Dönerin yoğurt, domates sosu ve tereyağı ile servis edildiği bir yemek türüdür.
              </Text>
            </View>
            <View style={styles.foodItem}>
              <Image source={{ uri: 'https://th.bing.com/th/id/OIP.eD5uvR0iu-Y6ZjTJLmTrJgHaFj?w=235&h=180&c=7&r=0&o=5&dpr=2&pid=1.7' }} style={styles.foodImage} />
              <Text style={styles.additionalInfoText}>
                5. Börek - İçinde peynir, kıyma veya patates bulunan çıtır hamurlardan oluşan geleneksel bir yemektir.
              </Text>
            </View>
          </View>
        );
        
        case "4":
  return (
    <View style={styles.additionalInfoContainer}>
      <Text style={styles.additionalInfoTitle}>Seyahat Sigortası:</Text>
      <Text style={styles.additionalInfoText}>
        Seyahat sigortası, seyahatiniz sırasında olası sağlık sorunları, kaza durumları, kaybolan bagajlar veya uçuş iptalleri gibi olumsuz durumlarla karşılaştığınızda sizi güvence altına alır.
      </Text>
      
      <Text style={styles.additionalInfoTitle}>Seyahat Sigortası Faydaları:</Text>
      <Text style={styles.additionalInfoText}>
        - Acil sağlık hizmetlerine erişim sağlar.
      </Text>
      <Text style={styles.additionalInfoText}>
        - Kaybolan bagajınızın tazminatını alabilirsiniz.
      </Text>
      <Text style={styles.additionalInfoText}>
        - Uçuş iptali veya gecikmesi durumunda yardımcı olur.
      </Text>
      <Text style={styles.additionalInfoText}>
        - Seyahat sırasında meydana gelen kazalar için finansal güvence sunar.
      </Text>

      <Text style={styles.additionalInfoTitle}>Önerilen Sigorta Şirketleri:</Text>
      <Text style={styles.additionalInfoText}>1. Allianz Travel: https://www.allianz-travel.com</Text>
      <Text style={styles.additionalInfoText}>2. AIG Travel: https://www.aig.com</Text>
      <Text style={styles.additionalInfoText}>3. AXA Travel Insurance: https://www.axa.com</Text>
      <Text style={styles.additionalInfoText}>4. Zurich Travel Insurance: https://www.zurich.com</Text>

      <Text style={styles.additionalInfoTitle}>Seyahat Sigortası İpuçları:</Text>
      <Text style={styles.additionalInfoText}>
        - Seyahate çıkmadan önce, ihtiyaçlarınıza uygun sigorta planını araştırın.
      </Text>
      <Text style={styles.additionalInfoText}>
        - Seyahat tarihlerinizi ve destinasyonunuzu doğru belirttiğinizden emin olun.
      </Text>
    </View>
  );

      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
      {renderAdditionalContent()}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Geri Dön</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  additionalInfoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  additionalInfoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  currencyButtons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  currencyButtonText: {
    marginRight: 10,
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TipDetails;
