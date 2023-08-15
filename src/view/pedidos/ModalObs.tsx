/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TextInput} from 'react-native';

import Button from '../../components/Button';
import COLORS from '../../constants/color';
import ListObs from '../../components/ListObs';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  id: string;
}

const ModalObs = ({onClose, isOpen}: Props) => {
  const [obs, setObs] = useState('');
  const [groupObs, setGroupObs] = useState<{id: string; obs: string}[]>([]);
  const [isAction, setIsAction] = useState('');

  let id = 1;

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
              }}
            />
          </View>
          <View style={styles.containerButtom}>
            <Button
              title="Cancelar"
              style={{
                width: 'auto',
                paddingHorizontal: 20,
              }}
              onPress={onClose}
            />
            <Button
              title={`${isAction.length === 0 ? 'Agregar' : 'Editar'}`}
              filled
              style={{
                paddingHorizontal: 20,
              }}
              onPress={() => {
                if (isAction.length === 0) {
                  id++;
                  setGroupObs([...groupObs, {id: `${id + 1}`, obs}]);
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
        </View>
      </View>
    </Modal>
  );
};

export default ModalObs;

const styles = StyleSheet.create({
  containerButtom: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    justifyContent: 'center',
  },
});
