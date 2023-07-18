import React from 'react';

import {Text} from 'react-native';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

import moment from 'moment';

import {StackScreenProps} from '@react-navigation/stack';

import {Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {usePedidosServices} from '../services/usePedidosServices';

import Button from '../components/Button';
import Header from '../components/Header';

import COLORS from '../constants/color';

import {ScrollView} from 'react-native-gesture-handler';
import { RootStackParamsSecondary } from '../navigator/RouteSecondary';

interface Props
  extends StackScreenProps<RootStackParamsSecondary, 'Detallepedido'> {}

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
                {dataPedido.attributes?.nombrePedido!}
              </Text>
              <Text
                style={{fontSize: 25, fontWeight: '400', color: COLORS.white}}>
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
                Fechas
              </Text>
              <View style={styles.containerFechas}>
                {/* CARD1 */}
                <View style={styles.containerCard}>
                  <Text style={styles.cardTitle}>Fecha</Text>
                  <Text style={styles.cardSubTitle}>
                    {dataPedido.attributes?.fecha
                      ? moment(dataPedido.attributes?.fecha).format(
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
