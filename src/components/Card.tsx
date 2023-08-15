import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

import {Pedido} from '../generated/graphql';

import Icon from 'react-native-vector-icons/Ionicons';

import COLORS from '../constants/color';

import useToggle from '../hooks/useToggle';

import ModalObs from '../view/pedidos/ModalObs';

interface Props {
  data: Pedido;
  id: string;
  color: number;
  onDetalle: () => void;
}

const Card = ({data, color, onDetalle, id}: Props) => {
  const {onClose, onOpen, isOpen} = useToggle();
  console.log('id', id);
  return (
    <>
      {/* CARD FIRST */}
      <View style={{...styles.container, backgroundColor: COLORS.primary}}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{data.nombrePedido!}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: '#ffffff50',
              width: 40,
              height: 40,
              borderRadius: 50,
              alignSelf: 'flex-end',
              marginBottom: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onOpen}>
            <Icon
              name="alert-outline"
              size={30}
              color={color ? COLORS.white : COLORS.primary}
              style={{textAlign: 'center'}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>{data.cliente}</Text>
        <Text style={styles.subtitle}>{data.descripcion}</Text>

        {/* CARDS OF ESTACIONES */}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
          {/* CARD1 */}
          <View
            style={{
              ...styles.container,
              width: '47%',
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <View style={{...styles.containerTitle, alignSelf: 'center'}}>
              <Text style={{color: COLORS.primary, fontSize: 18}}>Inicio</Text>
            </View>
            <Text
              style={{
                ...styles.title,
                textAlign: 'center',
                fontSize: 20,
                color: COLORS.primary,
              }}>
              {data.estacionInicio}
            </Text>
          </View>
          {/* CARD2 */}
          <View
            style={{
              ...styles.container,
              width: '47%',
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <View style={{...styles.containerTitle, alignSelf: 'center'}}>
              <Text style={{color: COLORS.primary, fontSize: 18}}>Fin</Text>
            </View>
            <Text
              style={{
                ...styles.title,
                textAlign: 'center',
                fontSize: 20,
                color: COLORS.primary,
              }}>
              {data.estacionFin}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: '#ffffff50',
            width: 40,
            height: 40,
            borderRadius: 50,
            alignSelf: 'flex-end',
            marginBottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onDetalle}>
          <Icon
            name="chevron-forward-outline"
            size={30}
            color={color ? COLORS.white : COLORS.primary}
            style={{textAlign: 'center'}}
          />
        </TouchableOpacity>
      </View>
      {/* MODAL */}
      <ModalObs isOpen={isOpen} onClose={onClose} id={id} />
    </>
  );
};

export default Card;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
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
    fontSize: 12,
    color: COLORS.primary,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 50,
    fontWeight: 'bold',
    marginBottom: 10,
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
    fontSize: 25,
    color: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  containerButtom: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    justifyContent: 'center',
  },
});
