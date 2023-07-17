/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Text} from 'react-native';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/RouteScreen';

import {Card} from '@rneui/themed';

import moment from 'moment';

import {usePedidosServices} from '../services/usePedidosServices';
import Button from '../components/Button';
import Header from '../components/Header';

interface Props extends StackScreenProps<RootStackParams, 'Detallepedido'> {}

const DetallePedidoScreen = ({route, navigation}: Props) => {
  const {id} = route.params;

  const {Pedido} = usePedidosServices();
  const {dataPedido} = Pedido({pedidoId: id});

  const handleClick = () => {
    navigation.navigate('LecturaNFC');
  };
  return (
    <>
      <View>
        {/* NAVBAR */}
        <Header title={dataPedido.attributes?.nombrePedido!} show />
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 5,
            gap: 5,
          }}>
          <Button
            title="Estacion de inicio"
            filled
            style={{
              marginTop: 18,
              width: '50%',
              marginBottom: 4,
              paddingHorizontal: 2,
            }}
          />
          <Button
            title="Estacion de final"
            filled
            style={{
              marginTop: 18,
              width: '50%',
              marginBottom: 4,
              paddingHorizontal: 2,
            }}
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

          <View style={{marginHorizontal: 20}}>
            <Button
              title="Escanear NFC"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              onPress={handleClick}
            />
          </View>
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
    color: 'black',
  },
  textSecond: {
    fontSize: 20,
    marginLeft: 5,
    color: 'black',
  },
});
