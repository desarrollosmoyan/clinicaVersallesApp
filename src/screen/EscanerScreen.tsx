/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {Button} from '@rneui/base';

NfcManager.start();
const EscanerScreen = () => {
  const [Nfc, setNfc] = useState('Escaneado....');

  async function readNdef() {
    try {
      console.log('registro');

      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      try {
        const tag = await NfcManager.getTag();
        console.warn('Tag found', tag);
        setNfc('Proceso terminado');
      } catch (error) {
        console.log('hubo un error ');
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }
  useEffect(() => {
    readNdef();
  }, []);

  return (
    <>
      <View>
        <Text
          style={{
            fontSize: 40,
            textAlign: 'center',
            marginTop: 10,
            color: 'black',
          }}>
          Acerca tu celular al dispositivo NFC para realizar la lectura adecuada
        </Text>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Button
            title={Nfc}
            buttonStyle={{
              backgroundColor: '#7367F0',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginVertical: 10,
            }}
            titleStyle={{fontWeight: 'bold'}}
          />
        </View>
      </View>
    </>
  );
};

export default EscanerScreen;
