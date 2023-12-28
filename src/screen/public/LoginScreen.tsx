import React, {useState} from 'react';

import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Ionicons';

import Toast from 'react-native-toast-message';

import {useAuthServices} from '../../services/useAuthServices';

import COLORS from '../../constants/color';
import Button from '../../components/Button';
import {useAuthStore} from '../../store/auth';
import {useGetUserByIdLazyQuery} from '@/generated/graphql';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);

  const [getUserById] = useGetUserByIdLazyQuery();

  // STORE
  const loginAction = useAuthStore(state => state.loginAction);
  const setUserInfo = useAuthStore(state => state.setUserInfo);

  // LLAMADA DE GRAPHQL
  const {Login, loadingLogin} = useAuthServices();

  const handleLogin = async () => {
    const res = await Login({identifier: email, password});
    if (res.res) {
      const user = res.response?.user;
      if (!user) {
        Toast.show({
          type: 'error',
          text1: 'Error desconocido',
        });
        return;
      }

      await AsyncStorage.setItem('token', res.response?.jwt!);

      const getUserByIdQuery = await getUserById({
        variables: {id: user.id},
      });

      const userById =
        getUserByIdQuery.data?.usersPermissionsUser?.data?.attributes;

      if (!userById) {
        await AsyncStorage.removeItem('token');
        return;
      }

      setUserInfo(getUserByIdQuery.data?.usersPermissionsUser);
      loginAction({token: res.response?.jwt!, userAuth: res.response?.user!});
    } else {
      Toast.show({
        type: 'error',
        text1: res.message,
      });
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
                fontSize: 20,
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
                overflow: 'hidden',
              }}>
              <TextInput
                placeholder="Ingresa tu usuario"
                placeholderTextColor={COLORS.black}
                // keyboardType="email-address"
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
                // alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                overflow: 'hidden',
              }}>
              <TextInput
                placeholder="Ingresa tu contraseña"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPassword}
                onChangeText={text => setPassword(text)}
                style={{
                  width: '87%',
                  color: COLORS.black,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundColor: COLORS.white,
                  justifyContent: 'center',
                  paddingRight: 10,
                }}
                onPress={() => setIsPassword(!isPassword)}>
                <Icon
                  name={`${!isPassword ? 'eye-outline' : 'eye-off-outline'}`}
                  size={25}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Button
            onPress={handleLogin}
            loading={loadingLogin}
            title="Iniciar sesión"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
