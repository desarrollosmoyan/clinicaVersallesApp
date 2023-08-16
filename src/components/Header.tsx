import React, {useState, useEffect} from 'react';

import {Switch, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color';
import {useAuthStore} from '../store/auth';
import {useUsuarioServices} from '../services/useUsuarioServices';

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
  const [isEnabled, setIsEnabled] = useState(false);

  // STORE
  const dataAuth = useAuthStore(state => state.dataAuth);
  // LLAMADA DE GRAPHQL
  const {Usuario, UpdateUsuario} = useUsuarioServices();
  const {dataUsuario, loadingUsuario} = Usuario({
    usersPermissionsUserId: dataAuth.infoUser.user.id,
  });

  useEffect(() => {
    setIsEnabled(dataUsuario.attributes?.enlinea ? true : false);
  }, [loadingUsuario]);

  const toggleSwitch = async () => {
    const res = await UpdateUsuario({
      data: {enlinea: !isEnabled},
      updateUsersPermissionsUserId: dataAuth.infoUser.user.id,
    });
    if (res.res) {
      setIsEnabled(res.data?.data?.attributes?.enlinea!);
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
              {isEnabled ? 'Activo' : 'Inactivo'}
            </Text>
            <Switch
              trackColor={{false: '#cccccc', true: '#0A188D80'}}
              thumbColor={isEnabled ? COLORS.primary : '#dddddd'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default Header;
