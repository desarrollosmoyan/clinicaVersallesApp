import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Button from './Button';
import COLORS from '../constants/color';

interface Props {
  id: string;
  obs: string;
  handleDeleteObs: (id: string) => void;
  setObs: (obs: string) => void;
  setIsAction: (isAction: string) => void;
}

const ListObs = ({id, obs, handleDeleteObs, setObs, setIsAction}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={{color: COLORS.black, fontSize: 16}}>{obs}</Text>
      <View style={styles.containerButtom}>
        <Button
          title=""
          filled
          icon="create-outline"
          style={{
            width: 'auto',
            paddingHorizontal: 8,
          }}
          onPress={() => {
            setObs(obs);
            setIsAction(id);
          }}
        />
        <Button
          title=""
          filled
          icon="trash-outline"
          style={{
            width: 'auto',
            paddingHorizontal: 10,
          }}
          onPress={() => {
            handleDeleteObs(id);
          }}
        />
      </View>
    </View>
  );
};

export default ListObs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 7,
  },
  containerButtom: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});
