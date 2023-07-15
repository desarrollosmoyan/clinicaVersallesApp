import {usePedidosQuery} from '../generated/graphql';

export const usePedidosServices = () => {
  // PEDIDOS
  const Pedidos = () => {
    const {
      data,
      loading: loadingPedidos,
      error: errorPedidos,
      refetch,
    } = usePedidosQuery({
      fetchPolicy: 'network-only',
    });
    const dataPedidos = data?.pedidos?.data ?? [];

    return {
      dataPedidos,
      loadingPedidos,
      errorPedidos,
      refetch,
    };
  };

  return {
    Pedidos,
  };
};
