import React from 'react';

import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color';

interface Props {
  icon: string;
  title: string;
  info: string;
}

const ListInfo = ({icon, title, info}: Props) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* GROUP TEXT ICON */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
          }}>
          <Icon name={icon} size={18} color={COLORS.greySecondary} />

          <Text
            style={{
              fontSize: 18,
              color: COLORS.greySecondary,
            }}>
            {title}
          </Text>
        </View>
        <Text style={{fontSize: 18, color: COLORS.black}}>{info}</Text>
      </View>
    </>
  );
};

export default ListInfo;
