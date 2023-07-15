/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {Input} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {useAuthServices} from '../services/useAuthServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackScreenProps} from '@react-navigation/stack';
import {useSessionStore} from '../store/session';

interface Props extends StackScreenProps<any, any> {}
const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // STORE
  const sessionUpdate = useSessionStore(state => state.sessionUpdate);

  // LLAMADA DE GRAPHQL
  const {Login} = useAuthServices();

  const handleLogin = async () => {
    const res = await Login({identifier: email, password});
    if (res.res) {
      await AsyncStorage.setItem('token', JSON.stringify(res?.response!)).then(
        () => console.log('todo salio bien'),
      );
      sessionUpdate(res?.response!);
      navigation.navigate('Pedidos');
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Input placeholder="Email" onChangeText={text => setEmail(text)} />
        <Input
          placeholder="Password"
          onChangeText={text => setPassword(text)}
        />
        <Button
          title="Entrar"
          buttonStyle={{
            backgroundColor: '#7367F0',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{fontWeight: 'bold'}}
          onPress={handleLogin}
        />
      </View>
    </>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
