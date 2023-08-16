import React from 'react';
import {View, ScrollView, Text, ActivityIndicator} from 'react-native';

import {usePedidosServices} from '../../services/usePedidosServices';

import {StackScreenProps} from '@react-navigation/stack';

import Card from '../../components/Card';
import Header from '../../components/Header';

import COLORS from '../../constants/color';

import {useAuthStore} from '../../store/auth';

interface Props extends StackScreenProps<any, any> {}

const PedidosScreen = ({navigation}: Props) => {
  // STORE
  const dataAuth = useAuthStore(state => state.dataAuth);

  // LLAMADA A GRAPHQL
  const {Pedidos} = usePedidosServices();
  const {dataPedidos, loadingPedidos} = Pedidos({
    filters: {
      user: {
        email: {
          eq: dataAuth.infoUser.user.email || '',
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
        <Header title="Tareas" showSwitch />
        <View>
          {loadingPedidos ? (
            <ActivityIndicator
              color={COLORS.primary}
              size={80}
              style={{marginTop: 20}}
            />
          ) : (
            <View style={{paddingHorizontal: 20, gap: 20, marginBottom: 20}}>
              {/* <Card
                data={{nombrePedido: 'hollaa', descripcion: 'hola'}}
                id="1"
                color={1}
                onDetalle={() => handleDetalle('1')}
              /> */}
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
                  {dataPedidos.map((pedido, index) => (
                    <Card
                      key={pedido.id}
                      data={pedido?.attributes!}
                      id={pedido?.id!}
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
