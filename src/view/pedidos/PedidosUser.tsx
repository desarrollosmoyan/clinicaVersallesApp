import React from 'react';

import {View, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Text} from '@rneui/themed';

import {useOnlineStore} from '../../store/online';

import {PedidoEntity} from '../../generated/graphql';

import COLORS from '../../constants/color';

import Card from '../../components/Card';

interface Props {
  tareasAsignadas: PedidoEntity[];
}

const PedidosUser = ({tareasAsignadas}: Props) => {
  // STORE PARA SABER SI ESTA EN LINEA
  const isOnline = useOnlineStore(state => state.isOnline);
  const navigation = useNavigation<any>();

  const handleDetalle = (id: string) => {
    navigation.navigate('Detallepedido', {id});
  };
  return (
    <>
      <ScrollView>
        {isOnline ? (
          <View style={{paddingHorizontal: 20, gap: 20, marginBottom: 20}}>
            {tareasAsignadas.length === 0 ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  fontWeight: '500',
                  color: COLORS.black,
                }}>
                No tienes tareas asignadas
              </Text>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 0,
                    marginTop: 20,
                    color: COLORS.black,
                  }}>
                  Tareas Asignadas
                </Text>
                <View style={{gap: 10}}>
                  {tareasAsignadas.map((pedido, index) => (
                    <Card
                      key={pedido.id}
                      data={pedido?.attributes!}
                      id={pedido?.id!}
                      color={index + 1}
                      onDetalle={() => handleDetalle(pedido.id!)}
                    />
                  ))}
                </View>
              </>
            )}
          </View>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              fontWeight: '500',
              color: COLORS.black,
            }}>
            Debes estar en linea para mirar las tareas asignadas
          </Text>
        )}
      </ScrollView>
    </>
  );
};

export default PedidosUser;
