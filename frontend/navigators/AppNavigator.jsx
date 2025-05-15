import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MainContainer from "../screens/MainContainer";
import AdminContainer from "../screens/AdminContainer";
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import StudentRegistration from '../screens/StudentRegistration';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const {user,setUser,token,setToken} = useAuth();
    const [loading,setLoading] = useState(true);

     useEffect(()=>{
        storageAccess();
        setTimeout(()=>{
            setLoading(false);
        },2000);
    },[])

     const storageAccess = async()=>{
        const tempUser = await AsyncStorage.getItem('user');
        const tempToken = await AsyncStorage.getItem('token');

        setUser(JSON.parse(tempUser));
        setToken(tempToken);
    }

    if(loading) return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{color:"black"}}>Loading...</Text></View>

    if(!user || !token){
        return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
        );
    }

    if(user.role==="admin"){
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AdminContainer" component={AdminContainer} />
                <Stack.Screen name="StudentRegistration" component={StudentRegistration} />
            </Stack.Navigator>
        );
    }

    if(user.role==="user"){
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainContainer" component={MainContainer} />
            </Stack.Navigator>
        );
    }

    return null;
};


export default AppNavigator;
