/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/native';
import {Button, Card} from '@rneui/themed';
import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {usePedidosServices} from '../services/usePedidosServices';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

const DetallePedidoScreen = ({navigation}: Props) => {
  const route = useRoute();
  const {id} = route.params as any;

  const {Pedido} = usePedidosServices();
  const {dataPedido} = Pedido({pedidoId: id! as string});

  const handleClick = () => {
    navigation.navigate('Lectura-NFC');
  };
  return (
    <>
      <View>
        <Text style={{fontSize: 40, textAlign: 'center', marginTop: 10}}>
          Detalle pedido
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 5,
          }}>
          <Button
            title="Estacion de inicio"
            buttonStyle={{
              backgroundColor: '#7367F0',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginVertical: 10,
            }}
            titleStyle={{fontWeight: 'bold'}}
          />
          <Button
            title="Estacion de final"
            buttonStyle={{
              backgroundColor: '#7367F0',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginVertical: 10,
            }}
            titleStyle={{fontWeight: 'bold'}}
          />
        </View>
        <View>
          <Card>
            <View style={styles.containerText}>
              <Text style={styles.textPrimary}>Pedido :</Text>
              <Text style={styles.textSecond}>
                {dataPedido.attributes?.nombrePedido}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textPrimary}>Cliente :</Text>
              <Text style={styles.textSecond}>
                {dataPedido.attributes?.cliente}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textPrimary}>Descripción :</Text>
              <Text style={styles.textSecond}>
                {dataPedido.attributes?.descripcion}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textPrimary}>Estación inicio :</Text>
              <Text style={styles.textSecond}>
                {dataPedido.attributes?.estacionInicio}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textPrimary}>Estación Final :</Text>
              <Text style={styles.textSecond}>
                {dataPedido.attributes?.estacionFin}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textPrimary}>Fecha :</Text>
              <Text style={styles.textSecond}>
                {dataPedido.attributes?.fecha
                  ? moment(dataPedido.attributes?.fecha).format('YYYY-MM-DD')
                  : 'Sin fecha'}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textPrimary}>Fecha Inicio :</Text>
              <Text style={styles.textSecond}>
                {dataPedido.attributes?.fehcaInicio
                  ? moment(dataPedido.attributes?.fehcaInicio).format(
                      'YYYY-MM-DD',
                    )
                  : 'Sin fecha'}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textPrimary}>Fecha Final :</Text>
              <Text style={styles.textSecond}>
                {dataPedido.attributes?.fechaFin
                  ? moment(dataPedido.attributes?.fechaFin).format('YYYY-MM-DD')
                  : 'Sin fecha'}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textPrimary}>Hora :</Text>
              <Text style={styles.textSecond}>
                {dataPedido.attributes?.hora
                  ? dataPedido.attributes?.hora.substring(0, 5)
                  : 'Sin hora'}
              </Text>
            </View>
          </Card>

          <Button
            title="Escanear NFC"
            buttonStyle={{
              backgroundColor: '#7367F0',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
            }}
            containerStyle={{
              width: '80%',
              marginVertical: 20,
              alignSelf: 'center',
            }}
            titleStyle={{fontWeight: 'bold', fontSize: 25}}
            onPress={handleClick}
          />
        </View>
      </View>
    </>
  );
};

export default DetallePedidoScreen;

const styles = StyleSheet.create({
  containerText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  textPrimary: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  textSecond: {
    fontSize: 20,
    marginLeft: 5,
  },
});
