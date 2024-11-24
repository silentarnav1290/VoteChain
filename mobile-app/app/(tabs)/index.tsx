import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VotingScreen from '../screens/VotingScreen';
import VoteStatusScreen from '../screens/VoteStatusScreen';
import WalletConnectScreen from '../screens/WalletConnectScreen';

const Stack = createNativeStackNavigator();

const theme = {
  // Custom theme options here
  colors: {
    primary: '#1565C0',
    accent: '#2196F3',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#B00020',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationIndependentTree>

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="WalletConnect" component={WalletConnectScreen} />
            <Stack.Screen name="Voting" component={VotingScreen} />
            <Stack.Screen name="VoteStatus" component={VoteStatusScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </PaperProvider>
  );
}