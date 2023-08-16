import {
  PaginationArg,
  PedidoFiltersInput,
  PedidoInput,
  usePedidoQuery,
  usePedidosQuery,
  useUpdatePedidoMutation,
} from '../generated/graphql';

export const usePedidosServices = () => {
  // PEDIDOS
  const Pedidos = ({
    filters,
    pagination,
  }: {
    filters: PedidoFiltersInput;
    pagination: PaginationArg;
  }) => {
    const {
      data,
      loading: loadingPedidos,
      error: errorPedidos,
      refetch,
    } = usePedidosQuery({
      fetchPolicy: 'network-only',
      variables: {filters, pagination},
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
    const dataPedido = data?.pedido?.data ?? {};

    return {
      dataPedido,
      loadingPedido,
      errorPedido,
      refetch,
    };
  };
  const [updatePedidoMutation] = useUpdatePedidoMutation();

  // UPDATE PEDIDO

  return {
    Pedidos,
    Pedido,
    UpdatePedido: async ({
      updatePedidoId,
      data,
    }: {
      updatePedidoId: string;
      data: PedidoInput;
    }) => {
      try {
        const res = await updatePedidoMutation({
          variables: {updatePedidoId, data},
        });

        const dataLogin = res?.data?.updatePedido;
        return {res: true, response: dataLogin};
      } catch (error: any) {
        return {
          res: false,
          message: 'hubo un error ',
        };
      }
    },
  };
};
