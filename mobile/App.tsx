import { StyleSheet } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Home from './src/views/home';
import Greet from './src/views/greet';
import { NavigationContainer } from '@react-navigation/native';
import CreateWallet from './src/views/create-wallet';
import Mnemonic from './src/views/mnemonic';
import SaveCreditCard from './src/views/save-credit-card';
import CreditCards from './src/views/credit-cards';
import Settings from './src/views/settings';
import Splash from './src/views/splash';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CardDetails from './src/views/card-details';
import Webview from './src/views/transaction-view';
import TransactionView from './src/views/transaction-view';

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
            ...TransitionPresets.RevealFromBottomAndroid,
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
            name="CreditCards"
            component={CreditCards}
            options={{
              ...TransitionPresets.ModalPresentationIOS
            }}
          />
          <RootStack.Screen
            name="Settings"
            component={Settings}
            options={{
              ...TransitionPresets.ModalPresentationIOS
            }}
          />
          <RootStack.Screen
            name="CardDetails"
            component={CardDetails}
            options={{
              ...TransitionPresets.ModalPresentationIOS
            }}
          />
          <RootStack.Screen
            name="Splash"
            component={Splash}
          />
          <RootStack.Screen
            name="Transaction"
            component={TransactionView}
                        options={{
              ...TransitionPresets.ModalPresentationIOS
            }}
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
