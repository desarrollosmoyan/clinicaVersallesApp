import React, {useMemo} from 'react';
import {View, ScrollView, Text, ActivityIndicator} from 'react-native';

import {usePedidosServices} from '../../services/usePedidosServices';

import {StackScreenProps} from '@react-navigation/stack';

import Card from '../../components/Card';
import Header from '../../components/Header';

import COLORS from '../../constants/color';

import {useAuthStore} from '../../store/auth';
import {PedidoEntity} from '../../generated/graphql';

interface Props extends StackScreenProps<any, any> {}

const PedidosScreen = ({navigation}: Props) => {
  // STORE
  const dataAuth = useAuthStore(state => state.dataAuth);

  // LLAMADA A GRAPHQL
  const {Pedidos} = usePedidosServices();
  const {dataPedidos, loadingPedidos} = Pedidos({
    filters: {
      cargo: {
        nombre: {
          eq: 'camillero',
        },
      },
    },
  });

  // FUNCION PARA IR A LA PAGINA DE DETALLE
  const handleDetalle = (id: string) => {
    navigation.navigate('Detallepedido', {id});
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
      console.log('id pedido', pedido.attributes?.user?.data?.id);
      if (pedido.attributes?.user?.data?.id === dataAuth?.infoUser.user.id) {
        console.log('entre');
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

  console.log('tareasAsignadas', tareasAsignadas);
  return (
    <>
      <ScrollView>
        <Header title="Tareas" showSwitch />

        {/* TAREAS ASIGNADAS */}
        <View>
          {loadingPedidos ? (
            <ActivityIndicator
              color={COLORS.primary}
              size={80}
              style={{marginTop: 20}}
            />
          ) : (
            <View style={{paddingHorizontal: 20, gap: 20, marginBottom: 20}}>
              {/* TAREAS ASIGNADAS */}
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
                  <View>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: 15,
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
                  </View>
                </>
              )}
              {/* ====== */}
              {/* TODAS LAS TAREAS */}
              {dataPedidos.length === 0 ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 30,
                    fontWeight: '500',
                    color: COLORS.black,
                  }}>
                  No Hay tareas
                </Text>
              ) : (
                <>
                  <View>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: 15,
                        color: COLORS.black,
                      }}>
                      Todas las tareas
                    </Text>
                    <View style={{gap: 10}}>
                      {dataPedidos.map((pedido, index) => (
                        <Card
                          key={pedido.id}
                          data={pedido?.attributes!}
                          id={pedido?.id!}
                          color={index + 1}
                          onDetalle={() => handleDetalle(pedido.id!)}
                        />
                      ))}
                    </View>
                  </View>
                </>
              )}
              {/* ====== */}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default PedidosScreen;
