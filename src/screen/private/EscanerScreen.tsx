import React, {useEffect} from 'react';

import {Image, Text, View} from 'react-native';

import {StackActions} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

import Toast from 'react-native-toast-message';

import Header from '../../components/Header';

import {RootStackParamsSecondary} from '../../navigator/RouteSecondary';

import {usePedidosServices} from '../../services/usePedidosServices';

import {useScannerStore} from '../../store/scaner';

// import NfcManager, {NfcTech} from 'react-native-nfc-manager';

// NfcManager.start();

interface Props
  extends StackScreenProps<RootStackParamsSecondary, 'LecturaNFC'> {}

const EscanerScreen = ({navigation, route}: Props) => {
  const scannerData = useScannerStore(state => state.scannerData);
  const data = useScannerStore(state => state.data);
  console.log(route?.params?.id);

  const {UpdatePedido} = usePedidosServices();

  const veces = data.some((item: any) => item.id === route?.params?.id);
  const updatePedidoInicio = async () => {
    const resp = await UpdatePedido({
      updatePedidoId: route?.params?.id,
      data: {
        fehcaInicio: new Date(),
      },
    });
    if (resp.res) {
      navigation.dispatch(StackActions.replace('Pedidos'));
      if (data.some((item: any) => item.id === route?.params?.id)) {
        const index = data.findIndex(
          (item: any) => item.id === route?.params?.id,
        );
        data[index].veces = data[index].veces + 1;
      } else {
        scannerData([...data, {id: route?.params?.id, veces: 1}]);
      }
    } else {
      console.log('ocurrio un error');
    }
  };
  const updatePedidoFinal = async () => {
    const resp = await UpdatePedido({
      updatePedidoId: route?.params?.id,
      data: {
        fechaFin: new Date(),
      },
    });
    if (resp.res) {
      navigation.dispatch(StackActions.replace('Pedidos'));
      if (data.some((item: any) => item.id === route?.params?.id)) {
        const index = data.findIndex(
          (item: any) => item.id === route?.params?.id,
        );
        data[index].veces = data[index].veces + 1;
      } else {
        scannerData([...data, {id: route?.params?.id, veces: 1}]);
      }
    } else {
      console.log('ocurrio un error');
    }
  };
  // async function readNdef() {
  //   try {
  //     console.log('registro');

  //     // register for the NFC tag with NDEF in it
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     // the resolved tag object will contain `ndefMessage` property
  //     try {
  //       const tag = await NfcManager.getTag();
  //       console.warn('Tag found', tag);
  //       setNfc('Proceso terminado');
  //     } catch (error) {
  //       console.log('hubo un error ');
  //     }
  //   } catch (ex) {
  //     console.warn('Oops!', ex);
  //   } finally {
  //     // stop the nfc scanning
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'NFC escaneado correctamente',
      });
      if (veces) {
        updatePedidoFinal();
        return;
      } else {
        updatePedidoInicio();
      }
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

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
    </View>
  );
};

export default EscanerScreen;
