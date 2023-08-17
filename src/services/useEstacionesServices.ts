import {useEstacionesQuery} from '../generated/graphql';
export const useEstacionesServices = () => {
  // ESTACIONES
  const Estaciones = () => {
    const {
      data,
      loading: loadingEstaciones,
      error: errorEstaciones,
      refetch,
    } = useEstacionesQuery({
      fetchPolicy: 'network-only',
    });
    const dataEstaciones = data?.estaciones?.data ?? [];

    return {
      dataEstaciones,
      loadingEstaciones,
      errorEstaciones,
      refetch,
    };
  };

  return {
    Estaciones,
  };
};
