
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Calculator from './screens/Calc';
import AuthorScreen from './screens/Author';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="Author" component={AuthorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
