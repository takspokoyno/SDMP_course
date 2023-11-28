import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import axios from 'axios';


const FootballClubRoute = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();

	axios.get("http://192.168.31.171:3000/getAllClubs")
	      .then(response => {
	        setClubs(response.data);
	      })
	      .catch(error => {
	        console.error("Error fetching clubs:", error);
	      });
  }, []);

  const handleClubChange = (club) => {
    setSelectedClub(club);
    getClubCoordinates(club.city);
	console.log(club.city)
  };

  const getClubCoordinates = (city) => {
    const apiKey = '';
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`;

    axios.get(geocodeUrl)
      .then(response => {
        const { results } = response.data;
        if (results.length > 0) {
          const { geometry } = results[0];
          const { location } = geometry;
          setDestination(location);
        } else {
          console.error('No results found for the city:', city);
        }
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
      });
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          />
          {destination && (
            <>
              <Marker
                coordinate={{ latitude: destination.lat, longitude: destination.lng }}
              />
        <MapViewDirections
           origin={{ latitude: location.latitude, longitude: location.longitude }}
		   destination={{ latitude: destination.lat, longitude: destination.lng }}
             apikey=""
            strokeWidth={2}
           strokeColor="blue"
           />
            </>
          )}
        </MapView>
      )}

      <View style={styles.pickerContainer}>
        <Text>Select Football Club: </Text>
        <Picker
          selectedValue={selectedClub}
          onValueChange={(itemValue) => handleClubChange(itemValue)}
        >
          {clubs.map((club, index) => (
            <Picker.Item  label={club.name} value={club} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pickerContainer: {
    position: 'absolute',
    top: 16,
    left: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 8,
    elevation: 4,
  },
});

export default FootballClubRoute;

