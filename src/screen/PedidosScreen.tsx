/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {useSessionStore} from '../store/session';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePedidosServices} from '../services/usePedidosServices';
import {Card, Button} from '@rneui/themed';
import {StackScreenProps} from '@react-navigation/stack';

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
    navigation.navigate('Detalle-pedido', {id});
  };

  return (
    <>
      <>
        <View>
          <Text style={{fontSize: 40, textAlign: 'center', marginTop: 10}}>
            Pedidos
          </Text>
          <View>
            {dataPedidos.map(pedido => (
              <Card key={pedido.id}>
                <Text>{pedido.attributes?.cliente}</Text>
                <Text>{pedido.attributes?.nombrePedido}</Text>
                <Text>{pedido.attributes?.descripcion}</Text>
                <Button
                  size="sm"
                  type="clear"
                  onPress={() => handleDetalle(pedido.id!)}>
                  Ver Detalle
                </Button>
              </Card>
            ))}
          </View>
        </View>
      </>
    </>
  );
};

export default PedidosScreen;
