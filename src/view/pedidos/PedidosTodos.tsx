import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import COLORS from '../../constants/color';

import {PedidoEntity} from '../../generated/graphql';

import Card from '../../components/Card';

import {usePedidosServices} from '../../services/usePedidosServices';

import {useAuthStore} from '../../store/auth';

interface Props {
  dataPedidos: PedidoEntity[];
  tareasAsignadas: PedidoEntity[];
}

const PedidosTodos = ({dataPedidos, tareasAsignadas}: Props) => {
  // STORE
  const dataAuth = useAuthStore(state => state.dataAuth);
  const navigation = useNavigation<any>();

  const handleDetalle = (id: string) => {
    navigation.navigate('Detallepedido', {id});
  };

  // PROVICIONAL
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });

  // LLAMADA A GRAPHQL
  const {UpdatePedido} = usePedidosServices();

  // FUNCION PARA IR A LA PAGINA DE DETALLE Y MANDAR LA NOTIFICACION QUE SE ASIGNA LA TAREA
  const handleDetalleNotification = async (id: string) => {
    const res = await UpdatePedido({
      updatePedidoId: id,
      data: {
        user: dataAuth?.infoUser.user.id,
      },
    });
    if (res.res) {
      navigation.navigate('Detallepedido', {id});
      setPaginationModel({
        page: 1,
        pageSize: paginationModel.pageSize === 10 ? 11 : 10,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error al asignar la tarea',
      });
    }
  };
  return (
    <>
      <ScrollView>
        <View style={{paddingHorizontal: 20, gap: 20, marginBottom: 20}}>
          {dataPedidos.length === 0 ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: '500',
                color: COLORS.black,
              }}>
              No hay tareas
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
                Todas las tareas
              </Text>
              <View style={{gap: 10}}>
                {dataPedidos.map((pedido, index) => {
                  const existe = tareasAsignadas.some(
                    item => item.id === pedido.id,
                  );
                  if (pedido.attributes?.user?.data !== null) return;
                  return (
                    <Card
                      key={pedido.id}
                      data={pedido?.attributes!}
                      id={pedido?.id!}
                      color={index + 1}
                      isAcept={!existe}
                      onDetalle={() => {
                        if (existe) {
                          return handleDetalle(pedido.id!);
                        } else {
                          return handleDetalleNotification(pedido.id!);
                        }
                      }}
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

export default PedidosTodos;
