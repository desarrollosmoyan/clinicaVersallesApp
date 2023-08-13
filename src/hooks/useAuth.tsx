import {useEffect} from 'react';

// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAuthStore} from '../store/auth';
import {UsersPermissionsMe} from '../generated/graphql';

const useAuth = () => {
  // FUNCION PARA ACTUALIZAR EL ESTADO DE AUTENTICACION
  const updateDataAuth = useAuthStore(state => state.updateDataAuth);

  useEffect(() => {
    const autentication = async () => {
      const token = await AsyncStorage.getItem('token');
      const dataUser = await AsyncStorage.getItem('userData');
      if (token && dataUser) {
        updateDataAuth({
          isLoading: false,
          isSignout: true,
          infoUser: {
            token: token,
            user: JSON.parse(dataUser) as UsersPermissionsMe,
          },
        });
      } else {
        updateDataAuth({
          isLoading: false,
          isSignout: false,
          infoUser: {
            token: '',
            user: {id: '', username: ''},
          },
        });
      }
    };
    autentication();
  }, []);
};

export default useAuth;
