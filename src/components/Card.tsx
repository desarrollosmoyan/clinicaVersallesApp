/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Pedido} from '../generated/graphql';
import COLORS from '../constants/color';
import {Text} from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Button from './Button';

interface Props {
  data: Pedido;
  color: number;
  onDetalle: () => void;
}

const Card = ({data, color, onDetalle}: Props) => {
  console.log(color);
  return (
    <>
      <LinearGradient
        style={styles.container}
        colors={[COLORS.secondary, COLORS.primary]}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{data.nombrePedido}</Text>
          <Text style={styles.titleFecha}>
            {moment(data.createdAt).format('YYYY-MM-DD')}
          </Text>
        </View>
        <Text style={styles.subtitle}>{data.cliente}</Text>
        <Text style={styles.subtitle}>{data.descripcion}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.seccionTitle}>Estacion Inicio</Text>
            <Text style={styles.seccionSubTitle}>{data.estacionInicio}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.seccionTitle}>Estacion Final</Text>
            <Text style={styles.seccionSubTitle}>{data.estacionFin}</Text>
          </View>
        </View>
        <Button
          title="DETALLE"
          style={{
            marginTop: 18,
            marginBottom: 4,
            backgroundColor: COLORS.white,
            borderRadius: 50,
          }}
          onPress={onDetalle}
        />
      </LinearGradient>
    </>
  );
};

export default Card;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 7,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: 'Roboto-Black',
  },
  titleFecha: {
    fontSize: 18,
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.white,
  },

  seccionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  seccionSubTitle: {
    fontSize: 20,
    color: COLORS.white,
  },
});
