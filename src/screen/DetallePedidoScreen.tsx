/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';

const DetallePedidoScreen = () => {
  return (
    <>
      <>
        <>
          <View>
            <Text style={{fontSize: 40, textAlign: 'center', marginTop: 10}}>
              Detalle pedido
            </Text>
            <View>
              {/* {dataPedidos.map(pedido => (
                <Card key={pedido.id}>
                  <Text>{pedido.attributes?.cliente}</Text>
                  <Text>{pedido.attributes?.nombrePedido}</Text>
                  <Text>{pedido.attributes?.descripcion}</Text>
                  <Button size="sm" type="clear">
                    Ver Detalle
                  </Button>
                </Card>
              ))} */}
            </View>
          </View>
        </>
      </>
    </>
  );
};

export default DetallePedidoScreen;
