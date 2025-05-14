import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function SignUpScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={ {fontSize: 38,
      fontWeight: 'bold',
      color: '#2B4EFF', marginTop:130}}>
        Welcome to NITG</Text>
        <Text style={[styles.subtitle, {marginBottom:30}]}>Let's get you started</Text>
  
        {/* Placeholder for Google button */}
  
        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#666"
        />
  
        {/* Roll Input */}
        <TextInput
          style={styles.input}
          placeholder="Roll Number"
          placeholderTextColor="#666"
        />
  
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#666"
        />
  
        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
        />
  
        {/* Password Verify */}
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          secureTextEntry
        />
  
        {/* Login and Admin Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
  
        {/* Placeholder for image */}
        <Image 
          source={require('../assets/signup.png')}
          style={{ width: 250, height:220, }} 
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    imagePlaceholder: {
      height: 200,
      width: 300,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      marginTop: 20,
    },
    imageText: {
      color: '#999',
      fontSize: 14,
    },
    title: {
      fontSize: 60,
      fontWeight: 'bold',
      color: '#2B4EFF',
      marginBottom:0,
      marginTop: 60,
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
      marginBottom: 60,
    },
    loginbtn: {
      backgroundColor: '#2B4EFF',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      marginVertical: 10,
      width:150,
    },
    signupbtn: {
      backgroundColor: '#2B4EFF',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      marginVertical: 10,
      marginBottom: 80,
      width:150,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: "center",
    },
    input: {
      backgroundColor: '#EAEAEA',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      marginVertical: 10,
      width: '85%',
      fontSize: 16,
    },
    forgotPassword: {
      color: '#2B4EFF',
      marginBottom: 20,
    },
    loginimg: {
      height: 150,
      width: 300,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      marginTop: 30,
    },
    button: {
      backgroundColor: '#2B4EFF',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      marginVertical: 10,
      width:150,
    },
  // home1
  containerh1: { flex: 1, padding: 10 },
  headerh1: { marginBottom: 20 },
  titleh1: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  classCard: { backgroundColor: '#e0f7fa', padding: 10, marginVertical: 5, borderRadius: 5 },
  attendanceh1: { marginVertical: 20 },
  donutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical:10,
    backgroundColor: 'rgba(121, 224, 238, 0.3)',
    padding: 10,
    borderRadius: 50,
  },
  chart: {
    height: 150,
    width: 150,
    marginHorizontal:30,
    paddingHorizontal: 60,
  },
  upcoming: { marginVertical: 20 },
  eventCardh1: { backgroundColor: '#f3e5f5', padding: 15, marginBottom: 10, borderRadius: 5 },
  eventTitle: { fontWeight: 'bold' },
  eventDescription: { fontSize: 12 },
  eventDate: { color: 'gray', fontSize: 12 },
  chartContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  centerLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign:'center',
  },
  subjectLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    textAlign:'center',
  },
  
  
  });