import React, {useState} from 'react';

import {Switch, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color';

interface Props {
  title: string;
  show?: boolean;
  color?: boolean;
  showSwitch?: boolean;
}

const Header = ({
  title,
  show = false,
  color = false,
  showSwitch = false,
}: Props) => {
  const navigate = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    if (!isEnabled) {
      console.log('estoy en linea');
    } else {
      console.log('estoy fuera de linea');
    }
    setIsEnabled(previousState => !previousState);
  };
  return (
    <>
      <View
        style={{
          position: 'relative',
        }}>
        {show && (
          <TouchableOpacity
            style={{position: 'absolute', left: 10, top: 15, zIndex: 999}}
            onPress={() => navigate.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={30}
              color={color ? COLORS.white : COLORS.primary}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            fontWeight: '700',
            marginTop: 10,
            color: color ? COLORS.white : COLORS.primary,
          }}>
          {title}
        </Text>
        {/* Switch */}

        {showSwitch ?? (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 10,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{fontWeight: '500', color: COLORS.primary}}>
              {isEnabled ? 'Activo' : 'Inactivo'}
            </Text>
            <Switch
              trackColor={{false: '#cccccc', true: '#0A188D80'}}
              thumbColor={isEnabled ? COLORS.primary : '#dddddd'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default Header;
