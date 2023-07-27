import React from 'react';
import {View, ScrollView, Text, ActivityIndicator} from 'react-native';

import {usePedidosServices} from '../services/usePedidosServices';

import {StackScreenProps} from '@react-navigation/stack';

// import messaging from '@react-native-firebase/messaging';

import Card from '../components/Card';
import Header from '../components/Header';

import COLORS from '../constants/color';

import {useSessionStore} from '../store/session';

interface Props extends StackScreenProps<any, any> {}

const PedidosScreen = ({navigation}: Props) => {
  // STORE
  const session = useSessionStore(state => state.session);

  // LLAMADA A GRAPHQL
  const {Pedidos} = usePedidosServices();
  const {dataPedidos, loadingPedidos} = Pedidos({
    filters: {
      user: {
        email: {
          eq: session?.user?.email || '',
        },
      },
      and: [
        {
          estado: {
            eq: true,
          },
        },
      ],
    },
  });
  // FUNCION PARA IR A LA PAGINA DE DETALLE
  const handleDetalle = (id: string) => {
    navigation.navigate('Detallepedido', {id});
  };

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async () => {
  //     Alert.alert('Nueva tarea');
  //     refetch();
  //   });

  //   return unsubscribe;
  // }, []);
  return (
    <>
      <ScrollView>
        <Header title="Tareas" />
        <View>
          {loadingPedidos ? (
            <ActivityIndicator
              color={COLORS.primary}
              size={80}
              style={{marginTop: 20}}
            />
          ) : (
            <View style={{paddingHorizontal: 20, gap: 20, marginBottom: 20}}>
              {dataPedidos.length === 0 ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 30,
                    fontWeight: '500',
                  }}>
                  No hay tareas
                </Text>
              ) : (
                <>
                  {dataPedidos.map((pedido, index) => (
                    <Card
                      key={pedido.id}
                      data={pedido?.attributes!}
                      color={index + 1}
                      onDetalle={() => handleDetalle(pedido.id!)}
                    />
                  ))}
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default PedidosScreen;
