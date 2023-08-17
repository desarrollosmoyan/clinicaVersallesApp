import React, {useMemo, useState} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';

import {Tab, Text, TabView} from '@rneui/themed';

import {StackScreenProps} from '@react-navigation/stack';

import GestureRecognizer from 'react-native-swipe-gestures';

import {usePedidosServices} from '../../services/usePedidosServices';

import Toast from 'react-native-toast-message';

import Card from '../../components/Card';
import Header from '../../components/Header';

import COLORS from '../../constants/color';

import {useAuthStore} from '../../store/auth';
import {useOnlineStore} from '../../store/online';
import {PedidoEntity} from '../../generated/graphql';

interface Props extends StackScreenProps<any, any> {}

const PedidosScreen = ({navigation}: Props) => {
  // STORE
  const dataAuth = useAuthStore(state => state.dataAuth);
  const [indexTab, setIndexTab] = useState(0);
  // STORE PARA SABER SI ESTA EN LINEA
  const isOnline = useOnlineStore(state => state.isOnline);

  // PROVICIONAL
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });

  // LLAMADA A GRAPHQL
  const {Pedidos, UpdatePedido} = usePedidosServices();
  const {dataPedidos, loadingPedidos} = Pedidos({
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

  // FUNCION PARA IR A LA PAGINA DE DETALLE
  const handleDetalle = (id: string) => {
    navigation.navigate('Detallepedido', {id});
  };
  // FUNCION PARA IR A LA PAGINA DE DETALLE Y MANDAR LA NOTIFICACION QUE SE ASIGNA LA TAREA
  const handleDetalleNotification = async (id: string) => {
    const res = await UpdatePedido({
      updatePedidoId: id,
      data: {
        user: dataAuth?.infoUser.user.id,
      },
    });
    if (res.res) {
      navigation.navigate('Detallepedido', {id});
      setPaginationModel({
        page: 1,
        pageSize: paginationModel.pageSize === 10 ? 11 : 10,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error al asignar la tarea',
      });
    }
  };

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
  console.log(
    'data',
    dataPedidos.map(pedido => pedido.attributes?.user?.data),
  );
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

        <TabView value={indexTab} onChange={setIndexTab} animationType="spring">
          <TabView.Item style={{width: '100%', flex: 1}}>
            {loadingPedidos ? (
              <ActivityIndicator
                color={COLORS.primary}
                size={80}
                style={{marginTop: 20}}
              />
            ) : (
              <ScrollView>
                {isOnline ? (
                  <View
                    style={{paddingHorizontal: 20, gap: 20, marginBottom: 20}}>
                    {tareasAsignadas.length === 0 ? (
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 30,
                          fontWeight: '500',
                          color: COLORS.black,
                        }}>
                        No tienes tareas asignadas
                      </Text>
                    ) : (
                      <>
                        <Text
                          style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: 0,
                            marginTop: 20,
                            color: COLORS.black,
                          }}>
                          Tareas Asignadas
                        </Text>
                        <View style={{gap: 10}}>
                          {tareasAsignadas.map((pedido, index) => (
                            <Card
                              key={pedido.id}
                              data={pedido?.attributes!}
                              id={pedido?.id!}
                              color={index + 1}
                              onDetalle={() => handleDetalle(pedido.id!)}
                            />
                          ))}
                        </View>
                      </>
                    )}
                  </View>
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 30,
                      fontWeight: '500',
                      color: COLORS.black,
                    }}>
                    Debes estar en linea para mirar las tareas asignadas
                  </Text>
                )}
              </ScrollView>
            )}
          </TabView.Item>
          <TabView.Item style={{width: '100%', flex: 1}}>
            {loadingPedidos ? (
              <ActivityIndicator
                color={COLORS.primary}
                size={80}
                style={{marginTop: 20}}
              />
            ) : (
              <ScrollView>
                <View
                  style={{paddingHorizontal: 20, gap: 20, marginBottom: 20}}>
                  {dataPedidos.length === 0 ? (
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 30,
                        fontWeight: '500',
                        color: COLORS.black,
                      }}>
                      No hay tareas
                    </Text>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginBottom: 0,
                          marginTop: 20,
                          color: COLORS.black,
                        }}>
                        Todas las tareas
                      </Text>
                      <View style={{gap: 10}}>
                        {dataPedidos.map((pedido, index) => {
                          const existe = tareasAsignadas.some(
                            item => item.id === pedido.id,
                          );
                          if (pedido.attributes?.user?.data !== null) return;
                          return (
                            <Card
                              key={pedido.id}
                              data={pedido?.attributes!}
                              id={pedido?.id!}
                              color={index + 1}
                              isAcept={!existe}
                              onDetalle={() => {
                                if (existe) {
                                  return handleDetalle(pedido.id!);
                                } else {
                                  return handleDetalleNotification(pedido.id!);
                                }
                              }}
                            />
                          );
                        })}
                      </View>
                    </>
                  )}
                </View>
              </ScrollView>
            )}
          </TabView.Item>
        </TabView>
      </GestureRecognizer>
    </>
  );
};

export default PedidosScreen;
