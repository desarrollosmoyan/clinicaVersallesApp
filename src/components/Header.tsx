import React, {useEffect} from 'react';

import {Switch, Text, TouchableOpacity, View} from 'react-native';

import Toast from 'react-native-toast-message';

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color';
import {useAuthStore} from '../store/auth';
import {useUsuarioServices} from '../services/useUsuarioServices';
import {useOnlineStore} from '../store/online';

interface Props {
  title: string;
  show?: boolean;
  color?: boolean;
  showSwitch?: boolean;
}

const Header = ({
  title,
  show = false,
  color = false,
  showSwitch = false,
}: Props) => {
  const navigate = useNavigation();

  const isOnline = useOnlineStore(state => state.isOnline);
  const updateIsOnline = useOnlineStore(state => state.updateIsOnline);

  // STORE
  const dataAuth = useAuthStore(state => state.dataAuth);
  // LLAMADA DE GRAPHQL
  const {Usuario, UpdateUsuario} = useUsuarioServices();
  const {dataUsuario, loadingUsuario} = Usuario({
    usersPermissionsUserId: dataAuth.infoUser.user.id,
  });

  useEffect(() => {
    updateIsOnline(dataUsuario.attributes?.enlinea ? true : false);
  }, [loadingUsuario]);

  const toggleSwitch = async () => {
    const res = await UpdateUsuario({
      data: {enlinea: !isOnline},
      updateUsersPermissionsUserId: dataAuth.infoUser.user.id,
    });
    if (res.res) {
      updateIsOnline(res.data?.data?.attributes?.enlinea!);
    }
    if (!res.res) {
      Toast.show({
        type: 'error',
        text1: 'No se pudo cambiar el estado',
      });
    }
  };
  return (
    <>
      <View
        style={{
          position: 'relative',
          marginBottom: 10,
        }}>
        {show && (
          <TouchableOpacity
            style={{position: 'absolute', left: 10, top: 15, zIndex: 999}}
            onPress={() => navigate.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={30}
              color={color ? COLORS.white : COLORS.primary}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            fontWeight: '700',
            marginTop: 10,
            color: color ? COLORS.white : COLORS.primary,
          }}>
          {title}
        </Text>
        {/* Switch */}

        {showSwitch && (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 10,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{fontWeight: '500', color: COLORS.primary}}>
              {isOnline ? 'Activo' : 'Inactivo'}
            </Text>
            <Switch
              trackColor={{false: '#cccccc', true: '#0A188D80'}}
              thumbColor={isOnline ? COLORS.primary : '#dddddd'}
              onValueChange={toggleSwitch}
              value={isOnline}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default Header;
