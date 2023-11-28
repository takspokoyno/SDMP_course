import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import { Text } from 'react-native';
import {View, Image } from 'react-native';

const AuthorScreen = () => {

  const navigation = useNavigation();
  const goToCalk = () => {
    navigation.navigate("Calculator"); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{paddingBottom: 50}}>
        <Button  title='Calc' onPress={goToCalk}/>
      </View>
      <View>
        <Image source={require('../assets/ava.jpg')}
        style={{width: 200, height: 200}} />
        <Text>Senior Aboba Developer</Text>
      </View>
    </View>
  );
};

export default AuthorScreen;
