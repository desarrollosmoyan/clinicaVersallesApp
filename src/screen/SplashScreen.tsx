import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Image} from 'react-native';
import {useSessionStore} from '../store/session';

interface Props extends StackScreenProps<any, any> {}
const SplashScreen = ({navigation}: Props) => {
  const session = useSessionStore(state => state.session);
  console.log(session, 'session');
  useEffect(() => {
    setTimeout(() => {
      if (session) {
        navigation.navigate('InicioBottom');
      } else {
        navigation.navigate('Wolcome');
      }
    }, 3000);
  }, []);
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
