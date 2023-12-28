import React from 'react';
import {Text, View, Modal, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';

import COLORS from '@/constants/color';
import Button from './Button';
import {
  useGetAllUsersQuery,
  useGetUserByIdLazyQuery,
} from '@/generated/graphql';
import {useAuthStore} from '@/store/auth';
import {useAuthServices} from '@/services/useAuthServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useSocket} from '@/hooks/use-socket';

interface ModalCambioTurno {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCambioTurno = ({isOpen, onClose}: ModalCambioTurno) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {connetSocket, disconnetSocket} = useSocket();

  // STORE
  const loginAction = useAuthStore(state => state.loginAction);
  const setUserInfo = useAuthStore(state => state.setUserInfo);

  // LLAMADA DE GRAPHQL
  const {Login, loadingLogin} = useAuthServices();

  const [getUserById] = useGetUserByIdLazyQuery();

  const usersQuery = useGetAllUsersQuery({
    variables: {
      filters: {cargo: {id: {notNull: true}}},
      pagination: {
        start: 0,
        limit: 1000,
      },
    },
  });

  const users = usersQuery.data?.users?.data ?? [];

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

      disconnetSocket();
      const enlinea = userById.enlinea;

      if (enlinea) {
        connetSocket({
          userId: user.id,
          cargoId: userById.cargo?.data?.id!,
        });
      }

      setEmail('');
      setPassword('');

      setUserInfo(getUserByIdQuery.data?.usersPermissionsUser);
      loginAction({token: res.response?.jwt!, userAuth: res.response?.user!});

      onClose();
    } else {
      Toast.show({
        type: 'error',
        text1: res.message,
      });
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      onDismiss={onClose}
      transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            padding: 20,
            width: '90%',
            elevation: 10,
            borderRadius: 5,
            shadowOpacity: 0.25,
            backgroundColor: 'white',
            shadowOffset: {width: 0, height: 10},
          }}>
          <Text
            style={{
              fontSize: 24,
              marginBottom: 24,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            Cambio de turno
          </Text>

          <SelectDropdown
            defaultButtonText="Seleccione un usuario"
            renderDropdownIcon={() => (
              <Icon
                name="chevron-down-outline"
                size={25}
                color={COLORS.black}
              />
            )}
            buttonTextStyle={{
              fontSize: 16,
              color: COLORS.black,
            }}
            buttonStyle={{
              width: '100%',
              borderRadius: 10,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: COLORS.black,
              backgroundColor: 'white',
            }}
            data={users}
            onSelect={selectedItem => {
              setEmail(selectedItem?.attributes?.email);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem?.attributes?.email;
            }}
            rowTextForSelection={item => {
              return item?.attributes?.email;
            }}
          />

          <TextInput
            value={password}
            secureTextEntry
            placeholder="Ingresa tu contraseña"
            placeholderTextColor={COLORS.black}
            onChangeText={setPassword}
            style={{
              width: '100%',
              color: COLORS.black,
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
              overflow: 'hidden',
              marginBottom: 24,
            }}
          />

          <View
            style={{
              gap: 16,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Button
              title="Cancelar"
              style={{flex: 1, paddingHorizontal: 20}}
              onPress={onClose}
            />
            <Button
              filled
              title="Enviar"
              style={{flex: 1, paddingHorizontal: 20}}
              onPress={handleLogin}
              loading={loadingLogin}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCambioTurno;
