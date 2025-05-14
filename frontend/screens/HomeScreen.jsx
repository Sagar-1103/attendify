import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { enableScreens } from 'react-native-screens';
import NITG from "../assets/nitg.png";
enableScreens();

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        {/* Placeholder for image */}
  
        {/* Title and subtitle */}
        <Text style={styles.title}>Attendify</Text>
        <Text style={styles.subtitle}>Snap your Attendance now.</Text>
  
        {/* Buttons */}
        <TouchableOpacity style={styles.loginbtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupbtn} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <Image 
          source={NITG}
          style={{ width: 400, height: 400, borderRadius: 0 }} 
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