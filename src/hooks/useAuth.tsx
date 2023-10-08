import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAuthStore} from '@/store/auth';
import {useGetUserByIdLazyQuery, useMeLazyQuery} from '@/generated/graphql';

const useAuth = () => {
  const [me] = useMeLazyQuery();
  const [getUserById] = useGetUserByIdLazyQuery();

  useEffect(() => {
    const autentication = async () => {
      const token = await AsyncStorage.getItem('token');
      const {loginAction, logoutAction, setUserInfo} = useAuthStore.getState();

      if (token) {
        try {
          const meQuery = await me();
          const user = meQuery.data?.me;

          if (!user) {
            logoutAction();
            await AsyncStorage.removeItem('token');
            return;
          }

          const getUserByIdQuery = await getUserById({
            variables: {id: user.id},
          });

          const userById =
            getUserByIdQuery.data?.usersPermissionsUser?.data?.attributes;

          if (!userById) {
            logoutAction();
            await AsyncStorage.removeItem('token');
            return;
          }

          setUserInfo(getUserByIdQuery.data?.usersPermissionsUser);
          loginAction({token, userAuth: user});
        } catch (error) {
          console.log('[ERROR_ME_QUERY]', error);
          logoutAction();
          await AsyncStorage.removeItem('token');
        }
      }

      if (!token) {
        logoutAction();
        await AsyncStorage.removeItem('token');
      }
    };
    autentication();
  }, []);
};

export default useAuth;
