import React from 'react';
import {View, ScrollView} from 'react-native';
import {useSessionStore} from '../store/session';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePedidosServices} from '../services/usePedidosServices';
import {StackScreenProps} from '@react-navigation/stack';
import Card from '../components/Card';
import Header from '../components/Header';

interface Props extends StackScreenProps<any, any> {}

const PedidosScreen = ({navigation}: Props) => {
  // STORE
  const session = useSessionStore(state => state.session);

  console.log(session.user.email);

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
      <ScrollView>
        <Header title="Tareas" />
        <View>
          <View style={{paddingHorizontal: 20, gap: 20, marginBottom: 20}}>
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
