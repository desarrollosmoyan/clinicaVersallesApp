import React, {useMemo} from 'react';

import {View, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Text} from '@rneui/themed';

import {Enum_Pedido_Stage, PedidoEntity} from '../../generated/graphql';

import COLORS from '../../constants/color';

import Card from '../../components/Card';
import {useSocket} from '@/hooks/use-socket';

interface Props {
  data: PedidoEntity[];
}

const PedidosAsignados = ({data}: Props) => {
  // STORE PARA SABER SI ESTA EN LINEA
  const navigation = useNavigation<any>();
  const isOnline = useSocket(state => state.isOnline);

  const handleDetalle = (id: string) => {
    navigation.navigate('Detallepedido', {id});
  };

  const pedidosAsignados = useMemo(() => {
    return data.filter(
      pedido => pedido.attributes?.stage !== Enum_Pedido_Stage.FinalPoint,
    );
  }, [data]);

  return (
    <>
      <ScrollView style={{flex: 1}}>
        {isOnline ? (
          <View
            style={{flex: 1, paddingHorizontal: 20, gap: 20, marginBottom: 20}}>
            {pedidosAsignados.length === 0 ? (
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '500',
                  textAlign: 'center',
                  color: COLORS.black,
                }}>
                No tienes tareas
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
                  Tareas Pendientes
                </Text>
                <View style={{gap: 10}}>
                  {pedidosAsignados.map((pedido, index) => (
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

export default PedidosAsignados;
