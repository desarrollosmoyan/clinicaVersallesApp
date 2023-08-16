/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';

import {View, Text, StyleSheet, Modal, TextInput} from 'react-native';

import Toast from 'react-native-toast-message';

import {useNavigation} from '@react-navigation/native';

import Button from '../../components/Button';
import COLORS from '../../constants/color';
import ListObs from '../../components/ListObs';
import {useObservacionesServices} from '../../services/useObservacionesServices';
import {useAuthStore} from '../../store/auth';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  id: string;
}

const ModalObs = ({onClose, isOpen, id}: Props) => {
  const [obs, setObs] = useState('');
  const [groupObs, setGroupObs] = useState<{id: string; obs: string}[]>([]);
  const [isAction, setIsAction] = useState('');
  const [isSend, setisSend] = useState(false);

  const navigation = useNavigation();

  // LLAMADA DE GRAPHQL
  const {CreateObservacion} = useObservacionesServices();

  const dataAuth = useAuthStore(state => state.dataAuth);

  // FUNCION PARA ELIMINAR UN ELEMENTO DE LA LISTA
  const handleDeleteObs = (id: string) => {
    const newGroupObs = groupObs.filter(item => item.id !== id);
    setGroupObs(newGroupObs);
  };

  // FUNCION PARA EDITAR UN ELEMENTO DE LA LISTA

  const handleEditObs = (id: string) => {
    const newGroupObs = groupObs.map(item => {
      if (item.id === id) {
        item.obs = obs;
      }
      return item;
    });
    setGroupObs(newGroupObs);
    setObs('');
  };

  // FUNCION PARA ENVIAR LAS OBSERVACIONES
  const handleSendObs = async () => {
    if (groupObs.length === 0) {
      Toast.show({
        type: 'success',
        text1: 'Debes agregar una observacion',
      });
      return;
    }

    setisSend(true);

    groupObs.map(async ({obs}, _index) => {
      const res = await CreateObservacion({
        observacion: obs,
        pedido: id.toString(),
        users_permissions_user: dataAuth.infoUser.user.id,
      });

      if (!res.res) {
        setisSend(false);
        Toast.show({
          type: 'error',
          text1: 'Hubo un error ',
        });
        return;
      }

      if (_index === groupObs.length - 1) {
        console.log('entre y funciono');

        setisSend(false);
        Toast.show({
          type: 'success',
          text1: 'Se agrego correctamente',
        });
        setObs('');
        setGroupObs([]);
        onClose();
        navigation.navigate('Pedidos' as never);
      }
    });
  };

  return (
    <Modal animationType="fade" visible={isOpen} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            padding: 20,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            elevation: 10,
            borderRadius: 5,
          }}>
          <Text
            style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>
            Observaciones
          </Text>
          <View
            style={{
              width: '100%',
              height: 100,
              borderColor: COLORS.black,
              marginVertical: 15,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              overflow: 'hidden',
            }}>
            <TextInput
              placeholderTextColor={COLORS.black}
              value={obs}
              placeholder="Escriba aqui"
              multiline={true}
              numberOfLines={4}
              onChangeText={text => setObs(text)}
              style={{
                width: '100%',
                color: COLORS.black,
                fontSize: 18,
              }}
            />
          </View>
          {/* BUTTONS ADD */}
          <View style={styles.buttomAdd}>
            <Button
              title={`${isAction.length === 0 ? 'Agregar' : 'Editar'}`}
              filled
              style={{
                paddingHorizontal: 20,
              }}
              onPress={() => {
                if (isAction.length === 0) {
                  setGroupObs([...groupObs, {id: obs, obs}]);

                  setObs('');
                  return;
                }

                handleEditObs(isAction);
              }}
            />
          </View>

          {groupObs.length !== 0 && (
            <View style={{width: '100%', marginVertical: 15}}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                  fontWeight: '700',
                }}>
                Lista
              </Text>
              <View style={{gap: 10}}>
                {groupObs.map(({id, obs}) => (
                  <ListObs
                    key={id}
                    id={id}
                    obs={obs}
                    handleDeleteObs={handleDeleteObs}
                    setObs={setObs}
                    setIsAction={setIsAction}
                  />
                ))}
              </View>
            </View>
          )}

          {/* BUTTONS  */}

          <View style={styles.containerButtons}>
            {/* <Button
              title="Cancelar"
              style={{
                width: 'auto',
                paddingHorizontal: 20,
              }}
              onPress={onClose}
            /> */}
            <Button
              filled
              loading={isSend}
              title="Enviar"
              style={{
                width: 'auto',
                paddingHorizontal: 20,
              }}
              onPress={handleSendObs}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalObs;

const styles = StyleSheet.create({
  buttomAdd: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    gap: 10,
  },
});
