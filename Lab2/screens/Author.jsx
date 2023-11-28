import React from 'react';
import { Text } from 'react-native';
import {View, Image } from 'react-native';

const AuthorScreen = () => {
  return (
    <View style={{display: 'flex', justifyContent: "center", alignItems:'center'}}>
        <Image source={require('../assets/myava.jpg')}
        style={{width: 200, height: 200}} />
        <Text>Владислав Бурлака</Text>
        <Text>Студент ТТП-41</Text>
    </View>
  );
};

export default AuthorScreen;
