/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';

const LoginScreen = () => {
  return (
    <>
      <View>
        <Text>LoginScreen</Text>
        <Button
          title="Funcione"
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{fontWeight: 'bold'}}
        />
      </View>
    </>
  );
};

export default LoginScreen;
