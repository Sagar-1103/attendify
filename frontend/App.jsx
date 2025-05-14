import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './context/AuthProvider';
import AppNavigator from './navigators/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
