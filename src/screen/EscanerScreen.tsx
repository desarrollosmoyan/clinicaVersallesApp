import React, {useEffect} from 'react';

import {Image, Text, View} from 'react-native';

import {StackActions} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

import Toast from 'react-native-toast-message';

import Header from '../components/Header';

// import NfcManager, {NfcTech} from 'react-native-nfc-manager';

// NfcManager.start();

interface Props extends StackScreenProps<any, any> {}

const EscanerScreen = ({navigation}: Props) => {
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
    }, 3000);
    const timeBack = setTimeout(() => {
      navigation.dispatch(StackActions.replace('Pedidos'));
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeBack);
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
            source={require('../../images/nfc.png')}
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
