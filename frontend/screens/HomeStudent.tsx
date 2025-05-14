import React, { useState } from 'react';
import { StyleSheet, Text, View, ListRenderItem, FlatList, ScrollView } from 'react-native';
import { enableScreens } from 'react-native-screens';
enableScreens();
// import { LineChart } from 'react-native-chart-kit';
// import DashboardScreen from 'C:/Users/thaku/OneDrive/Desktop/Attendify/Collectify/components/home.jsx'
import PieChart from 'react-native-pie-chart';
import { G, Circle, Text as SvgText } from 'react-native-svg';


interface EventItem {
    id: string;
    titleh1: string;
    date: string;
    description: string;
  }
  
  interface DonutChartProps {
    percentage: number;
    subject: string;
  }
  
  const DonutChart: React.FC<DonutChartProps> = ({ percentage, subject }) => {
    const widthAndHeight = 250
    const data = percentage
      ? [
          { value: percentage, svg: { fill: '#9747FF' }, key: 'slice-1' },
          { value: 100 - percentage, svg: { fill: '#79E0EE' }, key: 'slice-2' },
        ]
      : [];
    const valuesArray = data.map(item => item.value);
    const fillColorsArray = data.map(item => item.svg.fill);
    const CustomCenterLabel: React.FC = () => (
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
  
  export default function DashboardScreen() {
  
  
  
    const [calendarData, setCalendarData] = useState<EventItem[]>([
      { id: '1', titleh1: 'Culturals', date: '16/09/2023', description: 'For 3rd and 4th year Students' },
      { id: '2', titleh1: 'Prize Distribution', date: '09/10/2023', description: 'Winning and participating students' },
    ]);
  
    const loadMoreData = () => {
      const newEvent: EventItem = {
        id: Math.random().toString(),
        titleh1: 'New Event',
        date: '01/01/2024',
        description: 'This is a sample event.',
      };
      setCalendarData([...calendarData, newEvent]);
    };
  
    const renderEventItem: ListRenderItem<EventItem> = ({ item }) => (
      <View style={styles.eventCardh1}>
        <Text style={styles.eventTitle}>{item.titleh1}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
      </View>
    );
    
    //Object of S





    return (
      <ScrollView style={styles.containerh1}>
        <View style={styles.headerh1}>
    <Text style={styles.titleh1}>Today's Class</Text>
    {/* Horizontal Scrollable Cards */}
    <ScrollView 
      horizontal 
      contentContainerStyle={styles.horizontalScrollContainer}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.horizontalCard}>
        <Text style={styles.cardTitle}>Information Theory and Coding</Text>
        <Text style={styles.cardTime}>9:00 - 9:50 AM</Text>
      </View>
      <View style={styles.horizontalCard}>
        <Text style={styles.cardTitle}>VLSI</Text>
        <Text style={styles.cardTime}>10:00 - 10:50 AM</Text>
      </View>
      <View style={styles.horizontalCard}>
        <Text style={styles.cardTitle}>Microprocessors</Text>
        <Text style={styles.cardTime}>11:00 - 11:50 AM</Text>
      </View>
      {/* Add more cards as needed */}
    </ScrollView>
  </View>

  
  
        <View style={styles.attendanceh1}>
          <Text style={styles.titleh1}>Attendance</Text>
          <ScrollView horizontal contentContainerStyle={styles.donutContainer}>
            <DonutChart percentage={71} subject="EC401" />
            <DonutChart percentage={84} subject="EC402" />
            <DonutChart percentage={71} subject="EC403" />
            <DonutChart percentage={92} subject="EC404" />
            <DonutChart percentage={84} subject="HS400" />
            <DonutChart percentage={77} subject="EC406" />
          </ScrollView>
        </View>
  
        <View style={styles.upcoming}>
          <Text style={styles.titleh1}>Upcoming Schedules</Text>
          <FlatList
            data={calendarData}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
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
  headerh1: { marginBottom: 20 },
  titleh1: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
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
    width: 200, // Card width
    height: 90,
    justifyContent: 'center',
    alignItems: 'center', // Center content inside the card
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardTime: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
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