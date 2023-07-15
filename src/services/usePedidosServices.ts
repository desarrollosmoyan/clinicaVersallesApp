import {
  PedidoEntity,
  PedidoFiltersInput,
  usePedidoQuery,
  usePedidosQuery,
} from '../generated/graphql';

export const usePedidosServices = () => {
  // PEDIDOS
  const Pedidos = ({filters}: {filters: PedidoFiltersInput}) => {
    const {
      data,
      loading: loadingPedidos,
      error: errorPedidos,
      refetch,
    } = usePedidosQuery({
      fetchPolicy: 'network-only',
      variables: {filters},
    });
    const dataPedidos = data?.pedidos?.data ?? [];

    return {
      dataPedidos,
      loadingPedidos,
      errorPedidos,
      refetch,
    };
  };

  // PEDIDO
  const Pedido = ({pedidoId}: {pedidoId: string}) => {
    const {
      data,
      loading: loadingPedido,
      error: errorPedido,
      refetch,
    } = usePedidoQuery({
      fetchPolicy: 'network-only',
      variables: {pedidoId},
    });
    const dataPedido: PedidoEntity = data?.pedido?.data ?? {};

    return {
      dataPedido,
      loadingPedido,
      errorPedido,
      refetch,
    };
  };

  return {
    Pedidos,
    Pedido,
  };
};
