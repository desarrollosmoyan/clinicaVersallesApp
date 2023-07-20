import React, {useState} from 'react';

import {View, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';

import {StackScreenProps} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';

// import {Button} from 'react-native-paper';

import {useAuthServices} from '../services/useAuthServices';

import {useSessionStore} from '../store/session';
import COLORS from '../constants/color';
import Button from '../components/Button';

interface Props extends StackScreenProps<any, any> {}

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isPasswordShown, setIsPasswordShown] = useState(false);

  // STORE
  const sessionUpdate = useSessionStore(state => state.sessionUpdate);

  // LLAMADA DE GRAPHQL
  const {Login} = useAuthServices();

  const handleLogin = async () => {
    const res = await Login({identifier: email, password});
    if (res.res) {
      await AsyncStorage.setItem('token', JSON.stringify(res?.response!)).then(
        () => console.log('todo salio bien'),
      );
      sessionUpdate(res?.response!);
      navigation.dispatch(StackActions.replace('InicioBottom'));
    } else {
      console.log('error', res.message);
      Toast.show({
        type: 'error',
        text1: 'Error al iniciar sesión',
      });
      // navigation.navigate('Lectura-NFC');
    }
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 22,
            justifyContent: 'center',
          }}>
          <View style={{marginVertical: 22}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginVertical: 12,
                color: COLORS.black,
              }}>
              Hola bienvendido de nuevo ! 👋
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}>
              ¡Hola de nuevo, se te ha echado de menos!
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                marginVertical: 8,
              }}>
              Correo
            </Text>

            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
              }}>
              <TextInput
                placeholder="Ingresa tu correo"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                style={{
                  width: '100%',
                  color: COLORS.black,
                }}
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                marginVertical: 8,
              }}>
              Contraseña
            </Text>

            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
              }}>
              <TextInput
                placeholder="Ingresa tu contraseña"
                placeholderTextColor={COLORS.black}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                style={{
                  width: '100%',
                  color: COLORS.black,
                }}
              />
            </View>
          </View>

          <Button
            title="Iniciar sesión"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={handleLogin}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
