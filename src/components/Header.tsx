import React, {useEffect} from 'react';

import {Switch, Text, TouchableOpacity, View} from 'react-native';

import Toast from 'react-native-toast-message';

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color';
import {useAuthStore} from '../store/auth';
import {useSocket} from '@/hooks/use-socket';
import {
  useGetUserByIdQuery,
  useUpdateUsersPermissionsUserMutation,
} from '@/generated/graphql';

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
  const {isOnline, connetSocket, disconnetSocket} = useSocket();

  const auth = useAuthStore();
  // LLAMADA DE GRAPHQL
  const {data, loading} = useGetUserByIdQuery({
    variables: {
      id: auth.userAuth?.id!,
    },
  });

  const [updateIsOnline] = useUpdateUsersPermissionsUserMutation();

  useEffect(() => {
    const enlinea = data?.usersPermissionsUser?.data?.attributes?.enlinea;

    if (typeof enlinea !== 'boolean') {
      disconnetSocket();
    }

    console.log({userInfo: auth.userInfo});

    if (typeof enlinea === 'boolean') {
      if (enlinea) {
        connetSocket({
          userId: auth.userAuth?.id!,
          cargoId: auth.userInfo?.data?.attributes?.cargo?.data?.id!,
        });
      } else {
        disconnetSocket();
      }
    }
  }, [auth, data?.usersPermissionsUser?.data?.attributes?.enlinea]);

  const toggleSwitch = async () => {
    try {
      const res = await updateIsOnline({
        variables: {
          data: {enlinea: !isOnline},
          updateUsersPermissionsUserId: auth.userAuth?.id!,
        },
      });

      const enlinea =
        res.data?.updateUsersPermissionsUser.data?.attributes?.enlinea;

      if (typeof enlinea !== 'boolean') {
        console.log('[ERROR_UPDATE_USER]');
        disconnetSocket();

        Toast.show({
          type: 'error',
          text1: 'No se pudo cambiar el estado',
        });
        return;
      }

      if (enlinea) {
        connetSocket({
          userId: auth.userAuth?.id!,
          cargoId: auth.userInfo?.data?.attributes?.cargo?.data?.id!,
        });
      } else {
        disconnetSocket();
      }
    } catch (error) {
      console.log('[ERROR_UPDATE_USER]');
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
              disabled={loading}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default Header;
