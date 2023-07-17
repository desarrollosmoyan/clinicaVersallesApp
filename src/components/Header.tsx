/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
  show?: boolean;
}

const Header = ({title, show = false}: Props) => {
  const navigate = useNavigation();
  return (
    <>
      <View>
        {show && (
          <TouchableOpacity
            style={{position: 'absolute', left: 10, top: 15, zIndex: 999}}
            onPress={() => navigate.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            fontWeight: '700',
            marginTop: 10,
            color: COLORS.secondary,
          }}>
          {title}
        </Text>
        <Text />
      </View>
    </>
  );
};

export default Header;
