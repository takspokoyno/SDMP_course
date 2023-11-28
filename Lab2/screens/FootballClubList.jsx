import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const FootballClubListScreen = () => {
  const [footballClubData, setFootballClubData] = useState([]);
  const [totalRatingKyiv, setTotalRatingKyiv] = useState(0);

  const fetchFootballClubData = useCallback(() => {
    fetch('http://192.168.31.171:3000/getAllClubs')
      .then((response) => response.json())
      .then((data) => setFootballClubData(data))
      .catch((error) => console.error('Error fetching football club data:', error));
  }, []);

  const handleDeleteFootballClub = async (id) => {
    try {
      const response = await fetch(`http://192.168.31.171:3000/deleteClub/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Football club deleted successfully');
        fetchFootballClubData();
      } else {
        console.error('Error deleting football club');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    const kyivClubs = footballClubData.filter((club) => club.city.toLowerCase() === 'kyiv' || club.city.toLowerCase() === 'київ');
    console.log(kyivClubs)
    const sumRating = kyivClubs.reduce((sum, club) => sum + club.rating, 0);
    setTotalRatingKyiv(sumRating);
  }, [footballClubData]);

  useFocusEffect(
    React.useCallback(() => {
      fetchFootballClubData();
    }, [fetchFootballClubData])
  );

  const confirmDelete = (id, name) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete the club ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleDeleteFootballClub(id) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Football Clubs</Text>
      <FlatList
        data={footballClubData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>Rating: {item.rating}</Text>
            <Button
              title="Delete"
              onPress={() => confirmDelete(item._id, item.name)}
              color="red"
            />
          </View>
        )}
      />
      <Text style={styles.header}>Kyiv Clubs</Text>
      <Text style={styles.totalRatingText}>
        Total Rating of Kyiv Clubs: {totalRatingKyiv ? totalRatingKyiv.toFixed(2) : "0"}
      </Text>
      <FlatList
        data={footballClubData.filter((club) => club.city === 'Kyiv')}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>Rating: {item.rating}</Text>
            <Button
              title="Delete"
              onPress={() => confirmDelete(item._id, item.name)}
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginLeft:"35%",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalRatingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default FootballClubListScreen;
