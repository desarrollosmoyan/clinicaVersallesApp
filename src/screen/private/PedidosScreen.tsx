import React, {useMemo, useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';

import {Tab, TabView} from '@rneui/themed';

import GestureRecognizer from 'react-native-swipe-gestures';

import {usePedidosServices} from '../../services/usePedidosServices';

import Header from '../../components/Header';

import COLORS from '../../constants/color';
import {useIsFocused} from '@react-navigation/native';

import {useAuthStore} from '../../store/auth';
import {PedidoEntity} from '../../generated/graphql';
import PedidosUser from '../../view/pedidos/PedidosUser';
import PedidosTodos from '../../view/pedidos/PedidosTodos';

const PedidosScreen = () => {
  const isFocused = useIsFocused();
  // STORE
  const dataAuth = useAuthStore(state => state.dataAuth);
  const [indexTab, setIndexTab] = useState(0);

  // PROVICIONAL
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });

  // LLAMADA A GRAPHQL
  const {Pedidos} = usePedidosServices();
  const {dataPedidos, loadingPedidos, refetch, networkStatus} = Pedidos({
    filters: {
      cargo: {
        nombre: {
          eq: 'camillero',
        },
      },
    },
    pagination: {
      pageSize: paginationModel.pageSize,
      page: paginationModel.page,
    },
  });

  // PROVISIONAL
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, networkStatus === (networkStatus as any).refetch]);

  // USEMEMO PARA OBTENER LAS TAREAS QUE SOLO PERTENCEN AL USUARIO
  const tareasAsignadas: PedidoEntity[] = useMemo(() => {
    const pedidos: PedidoEntity[] = [];
    if (dataPedidos.length === 0) {
      return [];
    }
    dataPedidos.map(pedido => {
      if (pedido.attributes?.user?.data === null) {
        return;
      }
      if (pedido.attributes?.user?.data?.id === dataAuth?.infoUser.user.id) {
        pedidos.push({id: pedido.id, attributes: pedido.attributes});
      }
    });

    return pedidos;
  }, [loadingPedidos]);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async () => {
  //     Alert.alert('Nueva tarea');
  //     refetch();
  //   });

  //   return unsubscribe;
  // }, []);

  const handleSwipe = () => {
    setPaginationModel({
      page: 1,
      pageSize: paginationModel.pageSize === 10 ? 11 : 10,
    });
  };

  return (
    <>
      <Header title="Tareas" showSwitch />
      <GestureRecognizer
        // config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
        onSwipeDown={handleSwipe}
        style={{flex: 1}}>
        <Tab
          // scrollable
          value={indexTab}
          onChange={e => {
            setPaginationModel({
              page: 1,
              pageSize: paginationModel.pageSize === 10 ? 11 : 10,
            });
            setIndexTab(e);
          }}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
          variant="primary">
          <Tab.Item title="Tareas Asignadas" titleStyle={{fontSize: 18}} />
          <Tab.Item title="Todas las tareas" titleStyle={{fontSize: 18}} />
        </Tab>

        {!loadingPedidos ? (
          <>
            <TabView
              value={indexTab}
              onChange={setIndexTab}
              animationType="spring">
              <TabView.Item style={{width: '100%', flex: 1}}>
                <PedidosUser tareasAsignadas={tareasAsignadas} />
              </TabView.Item>
              <TabView.Item style={{width: '100%', flex: 1}}>
                <PedidosTodos
                  tareasAsignadas={tareasAsignadas}
                  dataPedidos={dataPedidos}
                />
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
