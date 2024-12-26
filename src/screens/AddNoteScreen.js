import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNoteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const { city } = route.params || { city: 'Gezdiğin Şehir' };

  const loadNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem('notes');
      if (notes) {
        setSavedNotes(JSON.parse(notes));
      }
    } catch (error) {
      console.error("Notlar yüklenemedi", error);
      Alert.alert('Hata', 'Notlar yüklenirken bir sorun oluştu.');
    }
  };

  useEffect(() => {
    loadNotes(); // Ekran yüklendiğinde kaydedilen notları yükle
  }, []);

  const handleSaveNote = async () => {
    if (title && note) {
      const newNote = { title, note, city };
      const updatedNotes = [...savedNotes, newNote];

      try {
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        setSavedNotes(updatedNotes);
        setTitle('');
        setNote('');
        Alert.alert('Başarılı', 'Notunuz başarıyla kaydedildi.');
        navigation.goBack();
      } catch (error) {
        console.error("Not kaydedilemedi", error);
        Alert.alert('Hata', 'Not kaydedilirken bir sorun oluştu.');
      }
    } else {
      alert("Lütfen başlık ve notunuzu yazın!");
    }
  };

  const handleDeleteNote = async (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setSavedNotes(updatedNotes);
    } catch (error) {
      console.error("Not silinemedi", error);
      Alert.alert('Hata', 'Not silinirken bir sorun oluştu.');
    }
  };

  // Back button'ı ekle
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={25} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('/Users/iremyildiz/GeziYolu/src/assets/images/addnote.jpeg')} style={styles.backgroundImage} />

      <Text style={styles.title}>{city} için Not Bırak</Text>

      {/* Başlık Girişi */}
      <TextInput
        style={styles.input}
        placeholder="Başlık girin..."
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#aaa"
      />

      {/* Not Girişi */}
      <TextInput
        style={styles.input}
        placeholder="Notunuzu buraya yazın..."
        multiline
        value={note}
        onChangeText={setNote}
        placeholderTextColor="#aaa"
      />

      {/* Notu Kaydet Butonu */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Icon name="content-save" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>

      {/* Kaydedilen Notları Göster */}
      <ScrollView style={styles.savedNotesContainer}>
        {savedNotes.map((savedNote, index) => (
          <View key={index} style={styles.savedNote}>
            <Text style={styles.savedNoteTitle}>{savedNote.title}</Text>
            <Text style={styles.savedNoteText}>{savedNote.note}</Text>
            <Text style={styles.savedNoteCity}>{savedNote.city}</Text>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => handleDeleteNote(index)}
            >
              <Icon name="delete" size={20} color="white" />
              <Text style={styles.deleteButtonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: 'rgba(240, 245, 245, 0.8)', // Transparent background for the container
  },
  backgroundImage: {
    position: 'absolute', // Position the image in the background
    top: 0,
    left: 0,
    width: '150%',
    height: '170%', // Ensure the image covers the entire screen
    resizeMode: 'cover',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1.5,
    borderRadius: 15,
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#BF9288',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  savedNotesContainer: {
    marginTop: 30,
  },
  savedNote: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,
    borderColor: '#eee',
    borderWidth: 1,
  },
  savedNoteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  savedNoteText: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  savedNoteCity: {
    fontSize: 14,
    color: '#888',
    marginTop: 12,
  },
  deleteButton: {
    marginTop: 15,
    backgroundColor: '#BF9288',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  backButton: {
    marginLeft: 10,
  },
});

export default AddNoteScreen;
