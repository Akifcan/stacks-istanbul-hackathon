import { StyleSheet } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Home from './src/views/home';
import Greet from './src/views/greet';
import { NavigationContainer } from '@react-navigation/native';
import CreateWallet from './src/views/create-wallet';
import Mnemonic from './src/views/mnemonic';
import SaveCreditCard from './src/views/save-credit-card';
import Splash from './src/views/splash';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const RootStack = createStackNavigator<RootStackParamList>()
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.ScaleFromCenterAndroid,
          }}
        >
          <RootStack.Screen
            name="Home"
            component={Home}
          />
          <RootStack.Screen
            name="Greet"
            component={Greet}
          />
          <RootStack.Screen
            name="CreateWallet"
            component={CreateWallet}
          />
          <RootStack.Screen
            name="Mnemonic"
            component={Mnemonic}
          />
          <RootStack.Screen
            name="SaveCreditCard"
            component={SaveCreditCard}
          />
          <RootStack.Screen
            name="Splash"
            component={Splash}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
