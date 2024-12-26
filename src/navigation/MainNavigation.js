import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabNavigator from "./TabNavigator"; // TabNavigator import edildi
import CityDetailScreen from "../screens/CityDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import FavoritesScreen from "../screens/FavoriteScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";  // ProfileScreen'i ekleyin
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import TipDetails from "../screens/TipDetails";
import AddNoteScreen from "../screens/AddNoteScreen";
import VisitedPlacesScreen from "../screens/VisitedPlacesScreen";
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="TipDetails" 
          component={TipDetails} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CityDetail" 
          component={CityDetailScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="RegisterScreen" 
         component={RegisterScreen}        
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="Favorites" 
          component={FavoritesScreen} 
          options={{ title: 'Favorilerim' }} 
        />
        <Stack.Screen 
          name="ForgotScreen" 
          component={ForgotPasswordScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="ProfileScreen" 
          component={ProfileScreen} // Profil ekranını ekleyin
          options={{ headerShown:false }} 
        />
        <Stack.Screen 
          name="AddNote" 
          component={AddNoteScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
  name="VisitedPlacesScreen"
  component={VisitedPlacesScreen}
  options={{ headerShown:false }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
