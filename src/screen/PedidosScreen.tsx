/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {useSessionStore} from '../store/session';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePedidosServices} from '../services/usePedidosServices';
import {StackScreenProps} from '@react-navigation/stack';
import COLORS from '../constants/color';
import Card from '../components/Card';

interface Props extends StackScreenProps<any, any> {}

const PedidosScreen = ({navigation}: Props) => {
  // STORE
  const session = useSessionStore(state => state.session);

  // LLAMADA A GRAPHQL
  const {Pedidos} = usePedidosServices();
  const {dataPedidos} = Pedidos({
    filters: {
      user: {
        email: {
          eq: session.user.email,
        },
      },
    },
  });

  // FUNCION PARA IR A LA PAGINA DE DETALLE
  const handleDetalle = (id: string) => {
    navigation.navigate('Detallepedido', {id});
  };
  return (
    <>
      <ScrollView style={{marginVertical: 20}}>
        <View
          style={{
            paddingHorizontal: 22,

            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 35,
              fontWeight: '700',
              color: COLORS.black,
              textAlign: 'center',
              fontFamily: 'Roboto-Bold',
            }}>
            Tareas
          </Text>
        </View>
        <View>
          <View style={{paddingHorizontal: 20, gap: 20, marginTop: 20}}>
            {dataPedidos.map((pedido, index) => (
              <Card
                key={pedido.id}
                data={pedido?.attributes!}
                color={index + 1}
                onDetalle={() => handleDetalle(pedido.id!)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PedidosScreen;
