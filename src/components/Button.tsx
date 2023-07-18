import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../../src/constants/color';

const Button = (props: any) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.black;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.button,
        ...{backgroundColor: bgColor},
        ...props.style,
      }}
      onPress={props.onPress}>
      <Text style={{fontSize: 18, fontWeight: '700', ...{color: textColor}}}>
        {props.title}
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
