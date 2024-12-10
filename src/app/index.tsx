import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../themes/global';
import { IUser } from '../@types/user';
import axios from 'axios';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';

export default function login() {

  const [user, setUser] = useState<IUser>({} as IUser);

  const handleLogin = async () => {
    try {

      if (user.user && user.pass) {

        const authInfo = btoa(`${user.user}:${user.pass}`);

        //passar a autenticação
        const options = {
          headers: {
            'Authorization': `Basic ${authInfo}`
          }
        }

        const { status } = await axios.get('/getUsersList', options);
        if (status === 200) {
          console.log('STATUS => ', status);
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
    const result = LocalAuthentication.authenticateAsync();
  }

  useEffect(() => {

    getLocalAuth();

  }, [])

  return (
    <View style={theme.container}>

      <View style={styles.form}>
        <TextInput
          style={theme.input}
          placeholder='Usuário'
          autoCapitalize='none'
          value={user.user}
          onChangeText={value => setUser({ ...user, user: value })}
        />

        <TextInput
          style={theme.input}
          placeholder='Senha'
          autoCapitalize='none'
          secureTextEntry
          value={user.pass}
          onChangeText={value => setUser({ ...user, pass: value })}
        />

        <TouchableOpacity
          onPress={() => handleLogin()}>
          <Text>LOGIN</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 16
  }
})