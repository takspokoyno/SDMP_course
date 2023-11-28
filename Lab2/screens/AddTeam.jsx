import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddFootballClubScreen = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [foundationYear, setFoundationYear] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async () => {

    if (/^\d+$/.test(city) ) {
      Alert.alert('Validation Error', 'Please fill real city');
      return;
    }

    if (!name || !city || !foundationYear || !rating) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    if (foundationYear > 2023 || foundationYear < 1920) {
      Alert.alert('Validation Error', 'Please fill real foundation date');
      return;
    }


    try {
      const response = await fetch('http://192.168.31.171:3000/addClub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          city,
          foundationYear: parseInt(foundationYear),
          rating: parseInt(rating),
        }),
      });
      setName('');
      setCity('');
      setFoundationYear('');
      setRating('');
      if (response.ok) {
        console.log('Football club added successfully');
      } else {
        console.error('Error adding football club');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Club Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <Text style={styles.label}>Foundation Year:</Text>
      <TextInput
        style={styles.input}
        value={foundationYear}
        onChangeText={(text) => setFoundationYear(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Rating:</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={(text) => setRating(text)}
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default AddFootballClubScreen;
