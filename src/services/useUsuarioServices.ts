import {
  UsersPermissionsUserEntityResponse,
  UsersPermissionsUserInput,
  useUpdateUsersPermissionsUserMutation,
  useUsersPermissionsUserQuery,
} from '../generated/graphql';

export const useUsuarioServices = () => {
  // USUARIO
  const Usuario = ({
    usersPermissionsUserId,
  }: {
    usersPermissionsUserId: string | null;
  }) => {
    const {
      data,
      loading: loadingUsuario,
      error: errorUsuario,
      refetch,
    } = useUsersPermissionsUserQuery({
      fetchPolicy: 'network-only',
      variables: {usersPermissionsUserId},
    });
    const dataUsuario = data?.usersPermissionsUser?.data ?? {};
    return {
      dataUsuario,
      loadingUsuario,
      errorUsuario,
      refetch,
    };
  };

  // UPDATE USUARIOS
  const [updateUsersPermissionsUserMutation] =
    useUpdateUsersPermissionsUserMutation();

  return {
    Usuario,
    UpdateUsuario: async ({
      updateUsersPermissionsUserId,
      data,
    }: {
      updateUsersPermissionsUserId: string;
      data: UsersPermissionsUserInput;
    }) => {
      try {
        const res = await updateUsersPermissionsUserMutation({
          variables: {
            updateUsersPermissionsUserId: updateUsersPermissionsUserId,
            data,
          },
        });

        return {
          res: true,
          data: res.data
            ?.updateUsersPermissionsUser as UsersPermissionsUserEntityResponse,
        };
      } catch (error) {
        return {res: false, response: 'Hubo un error'};
      }
    },
  };
};
