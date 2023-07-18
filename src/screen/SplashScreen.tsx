import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Image} from 'react-native';

interface Props extends StackScreenProps<any, any> {}
const SplashScreen = ({navigation}: Props) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Wolcome');
    }, 3000);
  }, [navigation]);
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../images/logo.png')}
          style={{
            height: 300,
            width: 300,
            objectFit: 'contain',
          }}
        />
      </View>
    </>
  );
};

export default SplashScreen;
