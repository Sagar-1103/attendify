import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Animated } from 'react-native'; 
import LinearGradient from 'react-native-linear-gradient';

// Screens
import ProfileScreen from './ProfileStudent';
import DashboardScreen from './HomeStudent';
import StatsScreen from './StatsStudent';

//Screen names
const homeName = "Home";
const statsName = "Stats";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
       <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        style: { padding: 10, height: 80 },
        tabBarIcon: ({ focused, color, size }) => {
          const scale = new Animated.Value(focused ? 1.2 : 1); // Initial scale value

          // Animation effect when the tab is focused
          Animated.timing(scale, {
            toValue: focused ? 1.2 : 1, // Scale-up on focus
            duration: 300, // Duration of animation in milliseconds
            useNativeDriver: true, // Use native driver for better performance
          }).start();

          let iconSource;
          if (route.name === homeName) {
            iconSource = focused
              ? require('../assets/home-active.png') // Example custom icon
              : require('../assets/home-inactive.png'); // Example custom icon
          } else if (route.name === statsName) {
            iconSource = focused
              ? require('../assets/stats-active.png') // Example custom icon
              : require('../assets/stats-inactive.png'); // Example custom icon
          } else if (route.name === profileName) {
            iconSource = focused
              ? require('../assets/profile-active.png') // Example custom icon
              : require('../assets/profile-inactive.png'); // Example custom icon
          }

          return (
            <Animated.Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: 'white',
                transform: [{ scale }], // Apply the animation scale effect
              }}
            />
          );
        },
        tabBarLabel: () => null, // Removes the text label completely
        tabBarBackground: () => (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#161697', '#9747FF']} // Gradient colors
            style={{ flex: 1 }}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBar: {
      backgroundColor: 'transparent',
      height: 60,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderTopWidth: 0,
      borderRadius: 25,
      marginHorizontal: 20,
    },
  });
  
export default MainContainer;