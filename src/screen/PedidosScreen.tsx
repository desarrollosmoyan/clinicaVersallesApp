/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
// import {useSessionStore} from '../store/session';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePedidosServices} from '../services/usePedidosServices';
import {Card, Button} from '@rneui/themed';

const PedidosScreen = () => {
  // STORE
  // const session = useSessionStore(state => state.session);
  // const newToken = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('token');
  //     if (value !== null) {
  //       console.log(value, 'value');
  //       // value previously stored
  //     }
  //   } catch (e) {
  //     console.log('No se encontro el token');
  //   }
  // };
  // Llama de graphql
  const {Pedidos} = usePedidosServices();
  const {dataPedidos, errorPedidos} = Pedidos();
  console.log(dataPedidos, 'data');
  console.log(errorPedidos);

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
                <Button size="sm" type="clear">
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
