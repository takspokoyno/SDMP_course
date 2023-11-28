import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import AuthorScreen from './screens/Author';
import ClubMap from './screens/Map';
import AddFootballClubScreen from './screens/AddTeam.jsx';
import FootballClubListScreen from './screens/FootballClubList.jsx';
import ContactsScreen from './screens/Contacts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const FootballClubsInfo = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ClubList" component={FootballClubListScreen} />
  </Stack.Navigator>
);
const MapRoute = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MapRoute" component={ClubMap} />
  </Stack.Navigator>
);
const FootballClubAdd = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AddClub" component={AddFootballClubScreen} />
  </Stack.Navigator>
);
const Author = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Author" component={AuthorScreen} />
  </Stack.Navigator>
);
const Contacts = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Contacts" component={ContactsScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'teams') {
              iconName = 'ios-football'; 
            } else if (route.name === 'add') {
              iconName = 'ios-add';
            } else if (route.name === 'author') {
              iconName = 'ios-person';
            } else if (route.name === 'contacts') {
              iconName = 'ios-phone-portrait';
            } else if (route.name === 'map') {
              iconName = 'ios-map';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="teams" component={FootballClubsInfo} />
        <Tab.Screen name="add" component={FootballClubAdd} />
        <Tab.Screen name="contacts" component={Contacts} />
        <Tab.Screen name="author" component={Author} />
        <Tab.Screen name="map" component={MapRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
