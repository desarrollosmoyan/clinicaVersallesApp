import AsyncStorage from '@react-native-async-storage/async-storage';
import {UsersPermissionsLoginPayload} from '../generated/graphql';

export const getToken = async () => {
  let info: null | UsersPermissionsLoginPayload = null;
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // console.log(value);
      info = JSON.parse(value);
    } else {
      info = null;
    }
  } catch (e) {
    info = null;
  }

  return info;
};
