import React, {useEffect} from 'react';

import {View, Image} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';

import {useSessionStore} from '../store/session';
import {getToken} from '../utils/getToken';

interface Props extends StackScreenProps<any, any> {}
const SplashScreen = ({navigation}: Props) => {
  // const session = useSessionStore(state => state.session);
  const sessionUpdate = useSessionStore(state => state.sessionUpdate);

  useEffect(() => {
    const session = async () => {
      const value = await getToken();
      setTimeout(() => {
        if (value) {
          console.log('hay token');
          // navigation.navigate('InicioBottom');
          navigation.dispatch(StackActions.replace('InicioBottom'));
          sessionUpdate(value!);
        } else {
          console.log('no hay token');
          // navigation.navigate('Wolcome');
          navigation.dispatch(StackActions.replace('Wolcome'));
        }
      }, 3000);
    };

    session();
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
