/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Text} from 'react-native';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/RouteScreen';

import moment from 'moment';

import {usePedidosServices} from '../services/usePedidosServices';
import Button from '../components/Button';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../constants/color';
import {cutString} from '../utils/cutString';
import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'Detallepedido'> {}

const DetallePedidoScreen = ({route, navigation}: Props) => {
  const {id} = route.params;

  const {Pedido} = usePedidosServices();
  const {dataPedido} = Pedido({pedidoId: id});

  const handleClick = () => {
    navigation.navigate('LecturaNFC');
  };
  return (
    <ScrollView>
      <LinearGradient
        style={{
          flex: 1,
          // marginBottom: 20,
        }}
        colors={['#06105D', '#0E23CF']}>
        <View>
          {/* NAVBAR */}
          <Header title={dataPedido.attributes?.nombrePedido!} show color />

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 5,
              gap: 5,
            }}>
            <Button
              title="Estacion de inicio"
              style={{
                marginTop: 18,
                width: '50%',
                marginBottom: 4,
                paddingHorizontal: 2,
              }}
            />
            <Button
              title="Estacion de final"
              style={{
                marginTop: 18,
                width: '50%',
                marginBottom: 4,
                paddingHorizontal: 2,
              }}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
              source={require('../../images/image-detalle.png')}
              style={{
                height: 300,
                width: 300,
                objectFit: 'contain',
              }}
            />
          </View>
          <View>
            <View style={{paddingHorizontal: 15, marginTop: 15}}>
              <Text
                style={{fontSize: 35, fontWeight: '500', color: COLORS.white}}>
                {dataPedido.attributes?.cliente!}
              </Text>
              <Text
                style={{fontSize: 50, fontWeight: '800', color: COLORS.white}}>
                {cutString(10, dataPedido.attributes?.nombrePedido!)}
              </Text>
              <Text
                style={{fontSize: 25, fontWeight: '400', color: COLORS.white}}>
                {dataPedido.attributes?.descripcion!}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 2,
                borderRadius: 10,
                paddingVertical: 10,
                // paddingHorizontal: 10,
                marginHorizontal: 20,
                marginVertical: 20,
                borderColor: COLORS.white,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  ...styles.containerText,
                  borderRightWidth: 2,
                  borderColor: COLORS.white,
                  paddingHorizontal: 8,
                }}>
                <Text style={styles.textPrimary}>Fecha</Text>
                <Text style={styles.textSecond}>
                  {dataPedido.attributes?.fecha
                    ? moment(dataPedido.attributes?.fecha).format('YYYY-MM-DD')
                    : 'Sin fecha'}
                </Text>
              </View>
              <View
                style={{
                  ...styles.containerText,
                  borderRightWidth: 2,
                  borderColor: COLORS.white,
                  paddingHorizontal: 8,
                }}>
                <Text style={styles.textPrimary}>Fecha Inicio</Text>
                <Text style={styles.textSecond}>
                  {dataPedido.attributes?.fehcaInicio
                    ? moment(dataPedido.attributes?.fehcaInicio).format(
                        'YYYY-MM-DD',
                      )
                    : 'Sin fecha'}
                </Text>
              </View>
              <View
                style={{
                  ...styles.containerText,

                  paddingHorizontal: 8,
                }}>
                <Text style={styles.textPrimary}>Fecha Final</Text>
                <Text style={styles.textSecond}>
                  {dataPedido.attributes?.fechaFin
                    ? moment(dataPedido.attributes?.fechaFin).format(
                        'YYYY-MM-DD',
                      )
                    : 'Sin fecha'}
                </Text>
              </View>
            </View>

            <View style={{marginHorizontal: 20}}>
              <Button
                title="Escanear NFC"
                style={{
                  marginTop: 18,
                  marginBottom: 20,
                }}
                onPress={handleClick}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default DetallePedidoScreen;

const styles = StyleSheet.create({
  containerText: {
    alignItems: 'center',
  },
  textPrimary: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
  },
  textSecond: {
    fontSize: 20,
    color: COLORS.white,
  },
});
