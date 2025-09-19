import { StyleSheet } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Home from './src/views/home';
import Greet from './src/views/greet';
import { NavigationContainer } from '@react-navigation/native';
import CreateWallet from './src/views/create-wallet';
import Mnemonic from './src/views/mnemonic';
import SaveCreditCard from './src/views/save-credit-card';

const RootStack = createStackNavigator<RootStackParamList>()

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Greet"
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
