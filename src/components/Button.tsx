import React, {ReactNode} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import COLORS from '../../src/constants/color';

interface Props {
  filled?: boolean;
  color?: string;
  title: string | ReactNode;
  onPress?: () => void;
  style?: any;
  loading?: boolean;
  opacity?: boolean;
  icon?: string;
}

const Button = ({
  filled,
  color,
  title,
  onPress,
  style,
  loading,
  opacity,
  icon,
}: Props) => {
  const filledBgColor = color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = filled ? filledBgColor : outlinedColor;
  const textColor = filled ? COLORS.white : COLORS.black;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.button,
        ...{backgroundColor: bgColor},
        ...style,
        opacity: opacity ? 0.5 : 1,
      }}
      onPress={onPress}>
      <Text style={{fontSize: 18, fontWeight: '700', ...{color: textColor}}}>
        {!loading && title}
        {!loading && icon?.length !== 0 && (
          <Icon name={icon!} size={20} color={COLORS.white} />
        )}
        {loading && (
          <ActivityIndicator
            color={filled ? COLORS.white : COLORS.black}
            size={30}
          />
        )}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 10,
    paddingVertical: 8,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Button;
