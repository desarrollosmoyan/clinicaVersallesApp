import React, {useMemo, useEffect} from 'react';

import {Text, View, ScrollView, Image, ActivityIndicator} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';

import {useUsuarioServices} from '../../services/useUsuarioServices';

import Icon from 'react-native-vector-icons/Ionicons';

import ListInfo from '../../components/ListInfo';
import Button from '../../components/Button';

import Header from '../../components/Header';

import COLORS from '../../constants/color';

import {useAuthStore} from '../../store/auth';
import {useEstacionesServices} from '../../services/useEstacionesServices';
import SelectDropdown from 'react-native-select-dropdown';
import ModalCambioTurno from '@/components/ModalCambioTurno';
import useToggle from '@/hooks/useToggle';

const PerfilScreen = () => {
  const toggle = useToggle();
  const isFocused = useIsFocused();

  // STORE
  const user = useAuthStore(state => state.userAuth);
  const logoutAction = useAuthStore(state => state.logoutAction);

  // LLAMADA GRAPHQL
  const {Usuario, UpdateUsuario} = useUsuarioServices();
  const {dataUsuario, loadingUsuario, refetch, networkStatus} = Usuario({
    usersPermissionsUserId: user?.id!,
  });

  const {Estaciones} = useEstacionesServices();
  const {dataEstaciones, loadingEstaciones} = Estaciones();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, networkStatus === (networkStatus as any).refetch]);

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
              source={require('../../../images/doctor_2.png')}
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
                  <Icon
                    name="clipboard-outline"
                    size={18}
                    color={COLORS.greySecondary}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      color: COLORS.greySecondary,
                    }}>
                    Estación
                  </Text>
                </View>
                {/* SELECT */}
                <SelectDropdown
                  defaultButtonText="Selecciona una estacion"
                  renderDropdownIcon={() => (
                    <Icon
                      name="chevron-down-outline"
                      size={25}
                      color={COLORS.white}
                    />
                  )}
                  defaultValueByIndex={index}
                  buttonTextStyle={{
                    fontSize: 18,
                    color: COLORS.white,
                    fontWeight: '700',
                  }}
                  buttonStyle={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 10,
                    width: 180,
                  }}
                  data={dataEstaciones}
                  onSelect={async selectedItem => {
                    const res = await UpdateUsuario({
                      updateUsersPermissionsUserId: user?.id!,
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
            filled
            title="Cambio de turno"
            style={{
              marginTop: 20,
              marginBottom: 20,
            }}
            onPress={() => {
              toggle.onOpen();
            }}
          />
        </View>
      </ScrollView>

      <ModalCambioTurno isOpen={toggle.isOpen} onClose={toggle.onClose} />
    </>
  );
};

export default PerfilScreen;
