/* eslint-disable curly */
import React from 'react';

import {StyleSheet, ActivityIndicator, Text, View, Image} from 'react-native';

import moment from 'moment';

import {StackScreenProps} from '@react-navigation/stack';

import LinearGradient from 'react-native-linear-gradient';

import {usePedidosServices} from '../services/usePedidosServices';

import Button from '../components/Button';
import Header from '../components/Header';

import COLORS from '../constants/color';

import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParamsSecondary} from '../navigator/RouteSecondary';
import {useScannerStore} from '../store/scaner';

interface Props
  extends StackScreenProps<RootStackParamsSecondary, 'Detallepedido'> {}

const DetallePedidoScreen = ({route, navigation}: Props) => {
  const {id} = route.params;
  const data = useScannerStore(state => state.data);
  const idVeces = data.length !== 0 && data.find((item: any) => item.id === id);
  console.log(idVeces);
  console.log('validacion', idVeces.id === id && idVeces.veces === 2);
  console.log('validacion id', idVeces.id === id);

  const {Pedido} = usePedidosServices();
  const {dataPedido, loadingPedido} = Pedido({pedidoId: id});

  const handleClick = () => {
    if (idVeces.id === id && idVeces.veces === 2) return;
    navigation.navigate('LecturaNFC', {id: dataPedido.id!});
  };
  return (
    <LinearGradient colors={['#06105D', '#0E23CF']} style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 1}}>
          {/* NAVBAR */}
          <Header title="Detalle" show color />

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 5,
              gap: 5,
            }}>
            <Button
              title={
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: COLORS.primary,
                      textAlign: 'center',
                    }}>
                    Estacion Inicio
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: COLORS.primary,
                      textAlign: 'center',
                    }}>
                    {dataPedido.attributes?.estacionInicio}
                  </Text>
                </View>
              }
              style={{
                marginTop: 18,
                width: '50%',
                marginBottom: 4,
                paddingHorizontal: 2,
              }}
            />
            <Button
              title={
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: COLORS.primary,
                      textAlign: 'center',
                    }}>
                    Estacion Final
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: COLORS.primary,
                      textAlign: 'center',
                    }}>
                    {dataPedido.attributes?.fechaFin || 'No hay estacion'}
                  </Text>
                </View>
              }
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

          {/* CONTENIDO */}
          {loadingPedido ? (
            <ActivityIndicator
              color={COLORS.white}
              size={80}
              style={{marginTop: 20}}
            />
          ) : (
            <View>
              <View style={{paddingHorizontal: 15, marginTop: 15}}>
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: '500',
                    color: COLORS.white,
                  }}>
                  {dataPedido.attributes?.cliente!}
                </Text>
                <Text
                  style={{
                    fontSize: 50,
                    fontWeight: '800',
                    color: COLORS.white,
                  }}>
                  {dataPedido.attributes?.nombrePedido!}
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '400',
                    color: COLORS.white,
                  }}>
                  {dataPedido.attributes?.descripcion!}
                </Text>
              </View>

              {/* CARDS FECHAS */}

              <View style={{marginTop: 20, paddingHorizontal: 20}}>
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: '700',
                    color: COLORS.white,
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  Informacion
                </Text>
                <View style={styles.containerFechas}>
                  {/* CARD HORA */}
                  <View style={styles.containerCard}>
                    <Text style={styles.cardTitle}>Hora</Text>
                    <Text style={styles.cardSubTitle}>
                      {dataPedido.attributes?.hora
                        ? moment(dataPedido.attributes?.hora).format('HH:mm')
                        : 'No hay hora'}
                    </Text>
                  </View>
                  {/* CARD1 */}
                  <View style={styles.containerCard}>
                    <Text style={styles.cardTitle}> Fecha</Text>
                    <Text style={styles.cardSubTitle}>
                      {dataPedido.attributes?.createdAt
                        ? moment(dataPedido.attributes?.createdAt).format(
                            'YYYY-MM-DD',
                          )
                        : 'No hay fecha'}
                    </Text>
                  </View>
                  {/* CARD2 */}
                  <View style={styles.containerCard}>
                    <Text style={styles.cardTitle}>Inicio</Text>
                    <Text style={styles.cardSubTitle}>
                      {dataPedido.attributes?.fehcaInicio
                        ? moment(dataPedido.attributes?.fehcaInicio).format(
                            'YYYY-MM-DD',
                          )
                        : 'No hay fecha'}
                    </Text>
                  </View>
                  {/* CARD3 */}
                  <View style={styles.containerCard}>
                    <Text style={styles.cardTitle}>Final</Text>
                    <Text style={styles.cardSubTitle}>
                      {dataPedido.attributes?.fechaFin
                        ? moment(dataPedido.attributes?.fechaFin).format(
                            'YYYY-MM-DD',
                          )
                        : 'No hay fecha'}
                    </Text>
                  </View>
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
                  opacity={idVeces.id === id && idVeces.veces === 2}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default DetallePedidoScreen;

const styles = StyleSheet.create({
  containerFechas: {
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  containerCard: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.black,
  },
  cardSubTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.black,
  },
});
