import React, {useMemo} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Card from '@/components/Card';
import COLORS from '@/constants/color';

import type {PedidoEntity} from '@/generated/graphql';

interface Props {
  data: PedidoEntity[];
}

const PedidosCompletados = ({data}: Props) => {
  const navigation = useNavigation<any>();

  const handleDetalle = (id: string) => {
    navigation.navigate('Detallepedido', {id});
  };

  const pedidosCompletados = useMemo(() => {
    return data.filter(pedido => pedido.attributes?.finalizado === true);
  }, [data]);

  return (
    <>
      <ScrollView>
        <View style={{paddingHorizontal: 20, gap: 20, marginBottom: 20}}>
          {data.length === 0 ? (
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
                Tareas completadas
              </Text>
              <View style={{gap: 10}}>
                {pedidosCompletados.map((pedido, index) => {
                  return (
                    <Card
                      key={pedido.id}
                      id={pedido?.id!}
                      color={index + 1}
                      data={pedido?.attributes!}
                      onDetalle={() => handleDetalle(pedido.id!)}
                    />
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default PedidosCompletados;
