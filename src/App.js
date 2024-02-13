import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import ItemDetailScreen from './screens/ItemDetailScreen';
import NetworkProvider from './service/NetworkProvider';
import NetworkStatus from './service/NetworkStatus';

export default function App() {
  const { height } = useWindowDimensions();
  const Stack = createNativeStackNavigator();

  return (
    <NetworkProvider>
      <View style={[styles.container, { height }]}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerStyle: { backgroundColor: '#303F9F' },
                headerTitleStyle: { color: '#ffffff' },
                headerTintColor: '#ffffff',
              }}
            />
            <Stack.Screen
              name="ItemDetailScreen"
              component={ItemDetailScreen}
              options={{
                title: 'Item Detail Screen',
                headerStyle: { backgroundColor: '#303F9F' },
                headerTitleStyle: { color: '#ffffff' },
                headerTintColor: '#ffffff',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <NetworkStatus />
      </View>
    </NetworkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff2',
  },
});
