import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import HomeScreen from "../screens/HomeScreen";
import CityListScreen from "../screens/CityListScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import CitiesScreen from "../screens/CitiesScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setIsAuthenticated(true);  // Kullanıcı giriş yapmış
      } else {
        setIsAuthenticated(false); // Kullanıcı giriş yapmamış
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'HomeTab':
              iconName = 'home-outline';
              break;
            case 'SearchTab':
              iconName = 'search-outline';
              break;
              case 'CityTab':
              iconName = 'location-outline';
              break;
            case 'FavoriteTab':
              iconName = 'heart-outline';
              break;
            case 'CitiesTab':
              iconName = 'map-outline';
              break;
            case 'ProfileTab': // Profil ekranı için ikon
              iconName = 'person-outline';
              break;
            default:
              iconName = 'home-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => null, // Tab etiketini gizliyoruz
        tabBarActiveTintColor: '#008F8C',
        tabBarInactiveTintColor: '#4C5958',
        tabBarStyle: { paddingBottom: 5, height: 60, display: 'flex' }, // Tab bar'ı her zaman görünür yapıyoruz
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="CityTab" component={CityListScreen} options={{ headerShown: false }} />
      <Tab.Screen name="FavoriteTab" component={FavoriteScreen} options={{ headerShown: false }} />
      <Tab.Screen name="CitiesTab" component={CitiesScreen} options={{ headerShown: false }} />
      <Tab.Screen
        name="ProfileTab"
        component={isAuthenticated ? ProfileScreen : LoginScreen} // Giriş durumu kontrolü
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
