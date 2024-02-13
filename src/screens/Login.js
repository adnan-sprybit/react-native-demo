import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Platform,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { BaseSettings } from '../config/BaseSettings';
import { fetchApi } from '../config/apiUtil';
import useGetDeviceLocation from '../components/useGetDeviceLocation';

const width = Dimensions.get('window').width;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('admin@gmail.com'); //admin@gmail.com
  const [password, setPassword] = useState('admin@123'); //admin@123

  const { deviceCurrentLocation } = useGetDeviceLocation();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    var URL =
      email == 'admin@gmail.com'
        ? BaseSettings.endpoints.adminLogin
        : BaseSettings.endpoints.login;
    fetchApi('post', `/${URL}`, {
      email: email,
      password: password,
    })
      .then(async res => {
        console.log('response', res);
        if (res.success) {
          navigation.navigate('Home', { isUser: res?.is_Admin });
        } else {
          alert("It doesn't match the user credential")
        }

      })
      .catch(err => {
        console.log('🚀 ~ getItem ~ err:', err);
      });
    navigation.navigate('Home', { isUser: false });
  };

  return (
    <View style={styles.container}>
      {Platform.OS == 'web' && (
        <View>
          <Text style={styles.ImpressiveText}>Project</Text>
          <Text style={styles.ReactLoginPageText}>XYZ Login Page</Text>
        </View>
      )}
      <View style={styles.secondContainer}>
        <Text style={styles.loginText}>Login</Text>
        <Text style={styles.welcomeToSneatText}>Welcome to Demo! 👋</Text>
        <Text style={styles.PleaseSignInYourText}>
          Please sign in your account and start the adventure
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.LoginBtn}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
        {Platform.OS !== 'web' && (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Location',
                `Latitude: ${deviceCurrentLocation?.lat} Longitude: ${deviceCurrentLocation?.lng}`,
              );
            }}
            style={styles.LoginBtn}>
            <Text style={styles.loginBtnText}>Show Location</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: Platform.OS == 'web' ? 'space-between' : 'center',
    padding: 16,
    backgroundColor: '#E8EAF6',
    alignItems: 'center',
    flexDirection: 'row',
  },
  secondContainer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    marginRight: Platform.OS == 'web' ? 100 : 0,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: Platform.OS == 'web' ? width / 3 : '100%',
    marginVertical: 8,
    borderRadius: 5,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginText: {
    fontSize: 30,
    color: '#000000',
    fontWeight: '700',
    marginVertical: 8,
  },
  welcomeToSneatText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '500',
    marginVertical: 8,
  },
  PleaseSignInYourText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '400',
    marginVertical: 12,
  },
  LoginBtn: {
    backgroundColor: '#273361',
    borderRadius: 5,
    marginVertical: 12,
    paddingVertical: 8,
  },
  loginBtnText: {
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 8,
  },
  ImpressiveText: {
    fontSize: 55,
    color: '#151f42',
    fontWeight: '600',
    marginLeft: 160,
    marginVertical: 20,
  },
  ReactLoginPageText: {
    fontSize: 77,
    color: '#151f42',
    fontWeight: '600',
    marginLeft: 160,
  },
});

export default LoginScreen;
