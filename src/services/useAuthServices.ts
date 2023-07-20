import {
  UsersPermissionsLoginInput,
  UsersPermissionsLoginPayload,
  useLoginMutation,
} from '../generated/graphql';

export const useAuthServices = () => {
  const [loginMutation, {loading: loadingLogin, error: errorLogin}] =
    useLoginMutation();

  return {
    loadingLogin,
    errorLogin,
    Login: async (input: UsersPermissionsLoginInput) => {
      try {
        const res = await loginMutation({
          variables: {input},
        });

        const dataLogin: UsersPermissionsLoginPayload | undefined =
          res?.data?.login;
        return {res: true, response: dataLogin};
      } catch (error: any) {
        let messageError;
        if (errorLogin?.message === 'Invalid identifier or password') {
          messageError = 'Credenciales incorrectas';
        } else {
          messageError = 'Error al iniciar sesión';
        }
        return {
          res: false,
          message: messageError,
        };
      }
    },
  };
};
