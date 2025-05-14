import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AdminContainer from './screens/AdminContainer';
import MainContainer from './screens/MainContainer';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Authentication and onboarding screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        {/* <Stack.Screen name="homeStudent" component={DashboardScreen} /> */}

        {/* MainContainer for bottom navigation */}
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="AdminContainer" component={AdminContainer} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
