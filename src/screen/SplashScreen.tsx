import React from 'react';

import {View, Image} from 'react-native';

const SplashScreen = () => {
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
