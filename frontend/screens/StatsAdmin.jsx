import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ListRenderItem, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
enableScreens();
// import { LineChart } from 'react-native-chart-kit';
// import DashboardScreen from 'C:/Users/thaku/OneDrive/Desktop/Attendify/Collectify/components/home.jsx'
import PieChart from 'react-native-pie-chart';
import { G, Circle, Text as SvgText } from 'react-native-svg';

  
  const DonutChart = ({ percentage, subject }) => {
    const widthAndHeight = 250
    const data = percentage
      ? [
          { value: percentage, svg: { fill: '#9747FF' }, key: 'slice-1' },
          { value: 100 - percentage, svg: { fill: '#79E0EE' }, key: 'slice-2' },
        ]
      : [];
    const valuesArray = data.map(item => item.value);
    const fillColorsArray = data.map(item => item.svg.fill);
    const CustomCenterLabel = () => (
      <G key="center-label">
        <Circle cx="50%" cy="50%" r={50} fill="white" />
        <SvgText
          x="50%"
          y="45%"
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="#4CAF50"
        >
          {`${percentage}%`}
        </SvgText>
        <SvgText
          x="50%"
          y="60%"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
          fill="#000"
        >
          {subject}
        </SvgText>
      </G>
    );
  
    return (
      <View style={styles.chartContainer}>
        <PieChart
          style={styles.chart}
          widthAndHeight={widthAndHeight}
          series={valuesArray}
          sliceColor={fillColorsArray}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
        
        {/* Custom label positioned on top of the PieChart */}
        <View style={styles.centerLabel}>
          <Text style={styles.percentageLabel}>{`${percentage}%`}</Text>
          <Text style={styles.subjectLabel}>{subject}</Text>
        </View>
      </View>
    );
  };
  
  export default function StatsScreen() {
  
  
  
    const [presentData, setPresentData] = useState([
    //   { id: '1', titleh1: 'Culturals', date: '16/09/2023', description: 'For 3rd and 4th year Students' },
    //   { id: '2', titleh1: 'Prize Distribution', date: '09/10/2023', description: 'Winning and participating students' },
    ]);

    const [absentData, setAbsentData] = useState([
        //   { id: '1', titleh1: 'Culturals', date: '16/09/2023', description: 'For 3rd and 4th year Students' },
        //   { id: '2', titleh1: 'Prize Distribution', date: '09/10/2023', description: 'Winning and participating students' },
        ]);
  
    const renderEventItem = ({ item }) => (
      <View style={styles.eventCardh1}>
        <Text style={styles.eventTitle}>{item.titleh1}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
      </View>
    );
    
    //Object of S


    const [selectedDate, setSelectedDate] = useState(null); // State to track selected date
    
    const generateDates = () => {
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 180; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          dates.push({
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' }),
            fullDate: date.toISOString().split('T')[0], // Store full date in ISO format
          });
        }
        return dates;
      };
    
      const dates = generateDates();
    
      const handleCardPress = (fullDate) => {
        setSelectedDate(fullDate); // Update selected date on press
      };
          
    return (
      <ScrollView style={styles.containerh1}>
          <View style={styles.attendanceh1}> 
          <Text style={styles.titleh1}>Select Course</Text>
          <ScrollView horizontal contentContainerStyle={styles.donutContainer}>
            {/* <DonutChart percentage={71} subject="EC401" /> */}
            <DonutChart percentage={84} subject="EC200" />
            {/* <DonutChart percentage={71} subject="EC403" /> */}
            {/* <DonutChart percentage={92} subject="EC404" /> */}
            {/* <DonutChart percentage={84} subject="HS400" /> */}
            <DonutChart percentage={77} subject="EC852" />
          </ScrollView>
        </View>

        <View style={styles.headerh1}>
        <Text style={styles.titleh1}>Select Date</Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.horizontalScrollContainer}
          showsHorizontalScrollIndicator={false}
        >
          {dates.map((date, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardPress(date.fullDate)}>
              <View
                style={[
                  styles.horizontalCard,
                  selectedDate === date.fullDate && styles.selectedCard, // Apply selected style if selected
                ]}
              >
                <Text style={styles.cardMonth}>{date.month.toUpperCase()}</Text>
                <Text style={styles.cardDate}>{date.day}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
  
        <View style={styles.upcoming}>
          <Text style={styles.titleh1}>Present</Text>
          <FlatList
            data={presentData}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            // onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
        </View>
        <View style={styles.upcoming}>
          <Text style={styles.titleh1}>Absent</Text>
          <FlatList
            data={absentData}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            // onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
        </View>
      </ScrollView>
    );
  };
  
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
  headerh1: { marginBottom:5 },
  titleh1: { fontSize: 18, fontWeight: 'bold', marginVertical: 2 },
  classCard: { backgroundColor: '#e0f7fa', padding: 10, marginVertical: 5, borderRadius: 5 },
  horizontalScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:0,
  },
  horizontalCard: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    marginRight: 10,
    borderRadius: 20,
    width: 60, // Card width
    height: 90,
    justifyContent: 'center',
    alignItems: 'center', // Center content inside the card
  },
  cardMonth: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardDate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },

  selectedCard: {
    backgroundColor:'#CA7AFF',
  },

  attendanceh1: { marginVertical: 20 },
  donutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical:10,
    backgroundColor: 'rgba(121, 224, 238, 0.3)',
    padding: 20,
    borderRadius: 50,
  },
  chart: {
    height: 150,
    width: 150,
    marginHorizontal:30,
    paddingHorizontal: 60,
  },
  upcoming: { marginVertical: 10 },
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