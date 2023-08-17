import React, {useMemo, useEffect} from 'react';

import {Text, View, ScrollView, Image, ActivityIndicator} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';

import {useUsuarioServices} from '../../services/useUsuarioServices';

import ListInfo from '../../components/ListInfo';
import Button from '../../components/Button';

import Header from '../../components/Header';

import COLORS from '../../constants/color';

import {useAuthStore} from '../../store/auth';
import {useEstacionesServices} from '../../services/useEstacionesServices';
import SelectDropdown from 'react-native-select-dropdown';

interface Props extends StackScreenProps<any, any> {}

const PerfilScreen = ({navigation}: Props) => {
  const isFocused = useIsFocused();

  // STORE
  const updateDataAuth = useAuthStore(state => state.updateDataAuth);
  const dataAuth = useAuthStore(state => state.dataAuth);

  // LLAMADA GRAPHQL
  const {Usuario, UpdateUsuario} = useUsuarioServices();
  const {dataUsuario, loadingUsuario, refetch} = Usuario({
    usersPermissionsUserId: dataAuth.infoUser.user.id,
  });
  const {Estaciones} = useEstacionesServices();
  const {dataEstaciones, loadingEstaciones} = Estaciones();

  useEffect(() => {
    if (isFocused) {
      refetch();
      console.log('refetch');
    }
  }, [isFocused]);

  const handleLogot = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userData');
      updateDataAuth({
        isLoading: false,
        isSignout: false,
        infoUser: {
          token: '',
          user: {id: '', username: ''},
        },
      });

      navigation.navigate('Wolcome');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Lo sentimos no se cerro sesion',
      });
    }
  };

  const index = useMemo(
    () =>
      dataEstaciones.findIndex(
        item =>
          item.attributes?.nombre === dataUsuario.attributes?.ubicacionActual,
      ),
    [loadingUsuario, loadingEstaciones],
  );

  return (
    <>
      <ScrollView>
        {/* NAVBAR */}
        <Header title="Perfil" show />
        <View style={{paddingHorizontal: 20}}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
              source={require('../../../images/image-profile.png')}
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
                info={
                  dataUsuario.attributes?.cargo?.data?.attributes?.nombre ||
                  'No hay cargo'
                }
                icon="briefcase-outline"
              />

              {/* ESTACIONES */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {/* GROUP TEXT ICON */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  {/* <Icon name={icon} size={18} color={COLORS.greySecondary} /> */}

                  <Text
                    style={{
                      fontSize: 18,
                      color: COLORS.greySecondary,
                    }}>
                    Estaciones
                  </Text>
                </View>
                {/* SELECT */}
                <SelectDropdown
                  defaultButtonText="Selecciona una estacion"
                  defaultValueByIndex={index}
                  data={dataEstaciones}
                  onSelect={async selectedItem => {
                    const res = await UpdateUsuario({
                      updateUsersPermissionsUserId: dataAuth.infoUser.user.id,
                      data: {
                        ubicacionActual: selectedItem.attributes.nombre,
                      },
                    });
                    if (res.res) {
                      Toast.show({
                        type: 'success',
                        text1: 'Se agrego la estacion',
                      });
                    } else {
                      Toast.show({
                        type: 'error',
                        text1: 'No se pudo agregar la estacion',
                      });
                    }
                  }}
                  buttonTextAfterSelection={selectedItem => {
                    return selectedItem.attributes.nombre;
                  }}
                  rowTextForSelection={item => {
                    return item.attributes.nombre;
                  }}
                />
              </View>
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
