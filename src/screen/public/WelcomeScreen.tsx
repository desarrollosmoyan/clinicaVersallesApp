import React from 'react';
import {View, Text, Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {StackScreenProps} from '@react-navigation/stack';

import Button from '../../components/Button';
import COLORS from '../../constants/color';

interface Props extends StackScreenProps<any, any> {}

const WelcomeScreen = ({navigation}: Props) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}>
      <View style={{flex: 1}}>
        <View>
          <Image
            source={require('../../../images/doctor_6.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 10,
              transform: [
                {translateX: 20},
                {translateY: 50},
                {rotate: '-15deg'},
              ],
            }}
          />

          <Image
            source={require('../../../images/doctor_3.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: -30,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '-5deg'},
              ],
            }}
          />

          <Image
            source={require('../../../images/doctor_2.png')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 130,
              left: -50,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '15deg'},
              ],
            }}
          />

          <Image
            source={require('../../../images/doctor_1.png')}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: 'absolute',
              top: 110,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '-15deg'},
              ],
            }}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: 'absolute',
            top: 400,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: '800',
              color: COLORS.white,
            }}>
            ¡Bienvenido!
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontWeight: '800',
              color: COLORS.white,
            }}>
            ¡Descubre y disfruta!🌟😊
          </Text>

          <Button
            title="Empezar"
            onPress={() => navigation.navigate('Login')}
            style={{
              marginTop: 22,
              width: '100%',
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;
