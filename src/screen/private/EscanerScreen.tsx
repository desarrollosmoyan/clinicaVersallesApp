import React, {useEffect} from 'react';

import {Image, Text, View} from 'react-native';

import {StackActions} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

import Header from '../../components/Header';

import {RootStackParamsSecondary} from '../../navigator/RouteSecondary';

import {usePedidosServices} from '../../services/usePedidosServices';

import useToggle from '../../hooks/useToggle';
import ModalObs from '../../view/scaner/ModalObs';
import {useUsuarioServices} from '../../services/useUsuarioServices';
import {useAuthStore} from '../../store/auth';
import {Enum_Pedido_Stage} from '@/generated/graphql';
import Toast from 'react-native-toast-message';
import {useSocket} from '@/hooks/use-socket';

interface Props
  extends StackScreenProps<RootStackParamsSecondary, 'LecturaNFC'> {}

const EscanerScreen = ({navigation, route}: Props) => {
  const socket = useSocket(state => state.socket);
  const {onClose, onOpen, isOpen} = useToggle();

  // STORE
  const {userAuth, userInfo} = useAuthStore(state => ({
    userAuth: state.userAuth,
    userInfo: state.userInfo,
  }));

  // LLAMADA A GRAPHQL
  const {UpdateUsuario} = useUsuarioServices();
  const {UpdatePedido, Pedido} = usePedidosServices();
  const {dataPedido} = Pedido({pedidoId: route?.params?.id});

  const updatePedidoInicio = async () => {
    const resp = await UpdatePedido({
      updatePedidoId: route?.params?.id,
      data: {
        stage: Enum_Pedido_Stage.InitialPoint,
        fehcaInicio: new Date().toDateString(),
      },
    });
    if (resp.res) {
      navigation.dispatch(StackActions.replace('Pedidos'));
    } else {
      console.log('ocurrio un error');
    }
  };
  const updatePedidoFinal = async () => {
    const resp = await UpdatePedido({
      updatePedidoId: route?.params?.id,
      data: {
        finalizado: true,
        stage: Enum_Pedido_Stage.FinalPoint,
        fechaFin: new Date().toDateString(),
      },
    });
    if (resp.res) {
      onOpen();
    } else {
      console.log('ocurrio un error');
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'NFC escaneado correctamente',
      });

      if (dataPedido.attributes?.stage === Enum_Pedido_Stage.StandBy) {
        updatePedidoInicio();
      }

      if (dataPedido.attributes?.stage === Enum_Pedido_Stage.InitialPoint) {
        updatePedidoFinal();
      }

      if (dataPedido.attributes?.stage === Enum_Pedido_Stage.FinalPoint) {
        // TODO: logic for final point
      }
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dataPedido.attributes?.stage]);

  // FUNCION PARA ACTUALIZAR EL USUARIO
  const handleUpdateUser = async () => {
    await UpdateUsuario({
      updateUsersPermissionsUserId: userAuth?.id!,
      data: {
        ubicacionActual: dataPedido.attributes?.estacionFin,
      },
    });

    socket?.emit('order:finish-order', {
      pedidoId: dataPedido.id,
      cargoId: userInfo?.data?.attributes?.cargo?.data?.id,
    });
  };

  return (
    <View style={{flex: 1}}>
      {/* NAVBAR */}
      <Header title={'Escanear'} show />
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text
          style={{
            fontSize: 40,
            textAlign: 'center',
            marginTop: 10,
            color: 'black',
          }}>
          Acerca tu celular al dispositivo NFC para realizar la lectura adecuada
        </Text>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../images/nfc.png')}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              marginTop: 30,
            }}
          />
        </View>
      </View>
      {/* MODAL */}
      <ModalObs
        onPress={handleUpdateUser}
        isOpen={isOpen}
        onClose={onClose}
        id={route?.params?.id}
      />
    </View>
  );
};

export default EscanerScreen;
