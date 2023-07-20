import React from 'react';

import {Text, View, ScrollView, Image, ActivityIndicator} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import {useSessionStore} from '../store/session';
import {useUsuarioServices} from '../services/useUsuarioServices';

import ListInfo from '../components/ListInfo';
import Button from '../components/Button';

import COLORS from '../constants/color';
import Header from '../components/Header';

const PerfilScreen = () => {
  const session = useSessionStore(state => state.session);

  const navigation = useNavigation();
  // LLAMADA GRAPHQL
  const {Usuario} = useUsuarioServices();
  const {dataUsuario, loadingUsuario} = Usuario({
    usersPermissionsUserId: session && (session.user.id! as string),
  });

  const handleLogot = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.dispatch(StackActions.replace('Wolcome'));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Lo sentimos no se cerro sesion',
      });
    }
  };

  return (
    <>
      <ScrollView>
        {/* NAVBAR */}
        <Header title="Perfil" show />
        <View style={{paddingHorizontal: 20}}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
              source={require('../../images/image-profile.png')}
              style={{
                height: 300,
                width: 300,
                objectFit: 'contain',
              }}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 30,
                fontWeight: '900',
                marginVertical: 10,
              }}>
              Informacion
            </Text>
          </View>

          {loadingUsuario ? (
            <ActivityIndicator
              color={COLORS.primary}
              size={50}
              style={{marginTop: 20}}
            />
          ) : (
            <View style={{gap: 10}}>
              <ListInfo
                title="Area"
                info={dataUsuario.attributes?.Area || 'No hay area'}
                icon="cube-outline"
              />
              <ListInfo
                title="Nombre"
                info={dataUsuario.attributes?.nombreCompleto || 'No hay nombre'}
                icon="person-circle-outline"
              />
              <ListInfo
                title="Correo"
                info={dataUsuario.attributes?.email || 'No hay correo'}
                icon="mail-outline"
              />
              <ListInfo
                title="Username"
                info={dataUsuario.attributes?.username || 'No hay username'}
                icon="people-outline"
              />
              <ListInfo
                title="Cargo"
                info={dataUsuario.attributes?.cargo || 'No hay cargo'}
                icon="briefcase-outline"
              />
            </View>
          )}

          <Button
            title="Cerrar sesion"
            filled
            style={{
              marginTop: 20,
              marginBottom: 20,
            }}
            onPress={handleLogot}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default PerfilScreen;
