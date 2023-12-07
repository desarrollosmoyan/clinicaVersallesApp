import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {Tab, TabView} from '@rneui/themed';
import GestureRecognizer from 'react-native-swipe-gestures';

import Header from '@/components/Header';
import PedidosAsignados from '@/view/pedidos/pedidos-asignados';
import PedidosCompletados from '@/view/pedidos/pedidos-completados';

import COLORS from '@/constants/color';
import {useAuthStore} from '@/store/auth';
import {usePedidosQuery, useUpdatePedidoMutation} from '@/generated/graphql';
import {useSocket} from '@/hooks/use-socket';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamsSecondary} from '@/navigator/RouteSecondary';

type Props = StackScreenProps<RootStackParamsSecondary, 'Pedidos'>;

const PedidosScreen = (props: Props) => {
  const [indexTab, setIndexTab] = useState(0);

  const socket = useSocket(state => state.socket);
  const {userInfo, userAuth} = useAuthStore(state => ({
    userAuth: state.userAuth,
    userInfo: state.userInfo,
  }));

  // LLAMADA A GRAPHQL
  const [updatePedido] = useUpdatePedidoMutation();
  const {data, loading, refetch} = usePedidosQuery({
    variables: {
      pagination: {page: 1, pageSize: 10},
      filters: {
        user: {id: {eq: userAuth?.id!}},
        cargo: {id: {eq: userInfo?.data?.attributes?.cargo?.data?.id}},
      },
    },
  });

  useEffect(() => {
    const handleNewOrder = async (args: {
      cargoId: string;
      pedidoId: string;
    }) => {
      try {
        const res = await updatePedido({
          variables: {
            data: {user: userAuth?.id},
            updatePedidoId: args.pedidoId,
          },
        });

        if (res.data?.updatePedido?.data?.id) {
          refetch();
          props.navigation.navigate('Detallepedido', {
            id: res.data?.updatePedido?.data?.id,
          });

          console.log('[SUCCESS_UPDATE_PEDIDO]');
          return;
        }

        console.log('[ERROR_UPDATE_PEDIDO]');
      } catch (error) {
        console.log('[ERROR_UPDATE_PEDIDO]', error);
      }
    };

    socket?.on('order:new-order', handleNewOrder);

    return () => {
      socket?.off('order:new-order', handleNewOrder);
    };
  }, [socket]);

  return (
    <>
      <Header title="Tareas" showSwitch />
      <GestureRecognizer style={{flex: 1}}>
        <Tab
          value={indexTab}
          onChange={setIndexTab}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
          variant="primary">
          <Tab.Item title="Pendientes" titleStyle={{fontSize: 18}} />
          <Tab.Item title="Completadas" titleStyle={{fontSize: 18}} />
        </Tab>

        {!loading ? (
          <>
            <TabView
              value={indexTab}
              onChange={setIndexTab}
              animationType="spring">
              <TabView.Item style={{width: '100%', flex: 1}}>
                {/* Pendientes */}
                <PedidosAsignados data={data?.pedidos?.data ?? []} />
              </TabView.Item>

              <TabView.Item style={{width: '100%', flex: 1}}>
                {/* Completadas */}
                <PedidosCompletados data={data?.pedidos?.data ?? []} />
              </TabView.Item>
            </TabView>
          </>
        ) : (
          <ActivityIndicator
            color={COLORS.primary}
            size={80}
            style={{marginTop: 20}}
          />
        )}
      </GestureRecognizer>
    </>
  );
};

export default PedidosScreen;
