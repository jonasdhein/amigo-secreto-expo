import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../themes/global';
import { IUser } from '../@types/user';
import axios from 'axios';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function login() {

  const [user, setUser] = useState<IUser>({} as IUser);

  const handleLogin = async (user : string, pass : string) => {
    try {

      if (user && pass) {

        const authInfo = btoa(`${user}:${pass}`);

        //passar a autenticação
        const options = {
          headers: {
            'Authorization': `Basic ${authInfo}`
          }
        }

        const { status } = await axios.get('/getUsersList', options);
        if (status === 200) {
          console.log('STATUS => ', status);

          //gravar as informacoes
          await AsyncStorage.setItem('user', user);
          await AsyncStorage.setItem('pass', pass);

          //se der certo a autenticacao, navega para Home
          router.replace('home');

        }

      } else {
        Alert.alert('Atenção', 'Informe usuário e senha');
      }

    } catch (err) {
      console.log('ERR => ', err);
    }
  }

  const getLocalAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    console.log('savedBiometrics', savedBiometrics);
    //retorna se existe uma biometria salva no telefone
    if (savedBiometrics) {

      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login com Biometria',
        disableDeviceFallback: true,
        cancelLabel: 'Cancelar',
        requireConfirmation: true
      });

      console.log('biometricAuth_' + Platform.OS, biometricAuth);

      if (biometricAuth.success) {

        const userStorage = await AsyncStorage.getItem('user') || '';
        const passStorage = await AsyncStorage.getItem('pass') || '';
        handleLogin(userStorage, passStorage);
        //navegar para a tela Home

      }
    }
  }

  //executa na primeira vez que a tela se renderiza
  useEffect(() => {

    getLocalAuth();

  }, []);

  return (
    <View style={theme.container}>

      <View style={styles.form}>
        <TextInput
          style={[theme.input, theme.marginBottom, { width: '80%' }]}
          placeholder='Usuário'
          autoCapitalize='none'
          value={user.user}
          onChangeText={value => setUser({ ...user, user: value })}
        />

        <TextInput
          style={[theme.input, theme.marginBottom, { width: '80%' }]}
          placeholder='Senha'
          autoCapitalize='none'
          secureTextEntry
          value={user.pass}
          onChangeText={value => setUser({ ...user, pass: value })}
        />

        <TouchableOpacity
          style={theme.button}
          onPress={() => handleLogin(user.user, user.pass)}>
          <Text style={theme.textButton}>LOGIN</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16
  }
})