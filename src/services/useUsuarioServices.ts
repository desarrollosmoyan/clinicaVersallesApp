import {useUsersPermissionsUserQuery} from '../generated/graphql';

export const useUsuarioServices = () => {
  // USUARIO
  const Usuario = ({
    usersPermissionsUserId,
  }: {
    usersPermissionsUserId: string | null;
  }) => {
    console.log('id', usersPermissionsUserId);
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

  return {
    Usuario,
  };
};
