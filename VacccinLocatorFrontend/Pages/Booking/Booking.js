import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Card, Paragraph, TextInput, Title, TouchableRipple } from "react-native-paper";
import * as planted_colors from "../../Components/Color";

import { useDispatch } from "react-redux";

import LottieView from "lottie-react-native";

import { TabView, SceneMap } from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../../store/actions/auth";

import { TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {ExpandableCalendar, Timeline, CalendarProvider} from 'react-native-calendars';
import moment from 'moment';
import { Avatar} from 'react-native-paper';

const theme = {

  roundness: 4,
  colors: {
    placeholder: "white", text: planted_colors.STRONG_RED, primary: planted_colors.STRONG_RED,
    underlineColor: "black", background: planted_colors.STRONG_RED,
  },
};

const theme2 = {

  roundness: 4,
  colors: {
    placeholder: "white", text: planted_colors.STRONG_RED, primary: planted_colors.STRONG_RED,
    underlineColor: "black", background: planted_colors.LIGHT_BLUE,
  },
};

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const EVENTS = [
  {
    start: '2017-09-06 22:30:00',
    end: '2017-09-06 23:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
    color: '#e6add8'
  },
  {
    start: '2017-09-07 00:30:00',
    end: '2017-09-07 01:30:00',
    title: 'Visit Grand Mother',
    summary: 'Visit Grand Mother and bring some fruits.',
    color: '#ade6d8'
  },
  {
    start: '2017-09-07 02:30:00',
    end: '2017-09-07 03:20:00',
    title: 'Meeting with Prof. Behjet Zuhaira',
    summary: 'Meeting with Prof. Behjet at 130 in her office.',
    color: '#e6add8'
  },
  {
    start: '2017-09-07 04:10:00',
    end: '2017-09-07 04:40:00',
    title: 'Tea Time with Dr. Hasan',
    summary: 'Tea Time with Dr. Hasan, Talk about Project'
  },
  {
    start: '2017-09-07 01:05:00',
    end: '2017-09-07 01:35:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032'
  },
  {
    start: '2017-09-07 14:30:00',
    end: '2017-09-07 16:30:00',
    title: 'Meeting Some Friends in ARMED',
    summary: 'Arsalan, Hasnaat, Talha, Waleed, Bilal',
    color: '#d8ade6'
  },
  {
    start: '2017-09-08 01:40:00',
    end: '2017-09-08 02:25:00',
    title: 'Meet Sir Khurram Iqbal',
    summary: 'Computer Science Dept. Comsats Islamabad',
    color: '#e6bcad'
  },
  {
    start: '2017-09-08 04:10:00',
    end: '2017-09-08 04:40:00',
    title: 'Tea Time with Colleagues',
    summary: 'WeRplay'
  },
  {
    start: '2017-09-08 00:45:00',
    end: '2017-09-08 01:45:00',
    title: 'Lets Play Apex Legends',
    summary: 'with Boys at Work'
  },
  {
    start: '2017-09-08 11:30:00',
    end: '2017-09-08 12:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032'
  },
  {
    start: '2017-09-10 12:10:00',
    end: '2017-09-10 13:45:00',
    title: 'Merge Request to React Native Calendards',
    summary: 'Merge Timeline Calendar to React Native Calendars'
  }
];

const Booking = ({ route, navigation }) => {
  const { clinicName, clinicId, clinicAddress, clinicObjectId } = route.params;

  console.log("THIS itemId otherParam", clinicName, clinicId, clinicAddress, clinicObjectId);

  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [slotDetails, setSlotDetails] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [currentDate, setCurrentDate] = useState('2021-03-11');

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      // console.log("User Data AsyncStorage", userData);
      if (!userData) {
        navigation.navigate("UserClinicPage");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate, userType } = transformedData;
      const expirationDate = new Date(expiryDate);

      const response1 = await fetch("http://10.0.2.2:4000/patient/single", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "patientId": userId,

          }),
        },
      );

      const response2 = await fetch("http://10.0.2.2:4000/get/slots", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "clinicObjectId": clinicObjectId,

          }),
        },
      );


      const resData1 = await response2.json();
      setSlotDetails(resData1);

      console.log(slotDetails)

      const resData2 = await response1.json();
      setUserDetails(resData2);
      if (expirationDate <= new Date() || !token || !userId) {
        navigation.navigate("UserClinicPage");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(userId, token, expirationTime, userType));

      const toSetSlotsDynamically = () =>{
        var array = []
        // EVENTS.filter(event => console.log(moment(event.start)))
        const new_Object = slotDetails.map((i,j)=>{
          var obj2 = {}

          i.eventTiming.map((k,j)=>{
            obj2['start'] = k.startTime
            obj2['end'] = k.endTime
            array.push(obj2)
          })
          console.log(obj2)
          // obj[String(new Date(i.eventDate).getFullYear()+"-"+new Date(i.eventDate).getMonth()+"-"+new Date(i.eventDate).getDate())] = [obj2]
        })
        setEventDetails(array);
        // console.log(obj)
      }
      toSetSlotsDynamically();


      setLoading(false);
    };

    tryLogin();


  }, [dispatch]);



  if (loading) {
    return (
      <View style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <LottieView source={require("../../Components/Images/loading.json")} autoPlay loop />
      </View>
    );
  }



  // console.log(items);

  const getTheme = () => {
    const themeColor = '#0059ff';
    const lightThemeColor = '#e6efff';
    const disabledColor = '#a6acb1';
    const black = '#20303c';
    const white = '#ffffff';

    return {
      // arrows
      arrowColor: black,
      arrowStyle: {padding: 0},
      // month
      monthTextColor: black,
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: black,
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2}
    };
  };



  const onDateChanged = date => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
    setCurrentDate(date);
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };


  return (
    <CalendarProvider
      // date={ITEMS[0].title}
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      theme={{todayButtonTextColor: '#0059ff'}}
      showTodayButton
      disabledOpacity={0.6}
      // todayBottomMargin={16}
    >
      <ExpandableCalendar
        // horizontal={false}
        // hideArrows
        // disablePan
        // hideKnob
        // initialPosition={ExpandableCalendar.positions.OPEN}
        firstDay={1}
        // markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
        // markedDates={() => {}} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
        theme={getTheme()}
        // leftArrowImageSource={require('../img/previous.png')}
        // rightArrowImageSource={require('../img/next.png')}
        // calendarStyle={styles.calendar}
        // headerStyle={styles.calendar} // for horizontal only
        disableWeekScroll
      />
      <Timeline
        format24h={true}
        eventTapped={e => e}
        events={eventDetails.filter(event => moment(event.start).isSame(currentDate, 'day'))}
        // scrollToFirst={true}
        // start={0}
        // end={24}
      />
    </CalendarProvider>
  );
};


const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a'
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0'
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14
  },
  MainContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",

    backgroundColor: planted_colors.OFF_WHITE,
  },
  MainContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: planted_colors.OFF_WHITE,

  },
  input:
    {
      backgroundColor: planted_colors.OFF_WHITE,
      color: planted_colors.OFF_WHITE,
      width: "90%",
      height: 45,
      margin: 10,


      fontSize: 18,


    },
  input2:
    {
      backgroundColor: planted_colors.OFF_WHITE,
      color: planted_colors.OFF_WHITE,
      width: "42%",
      height: 45,
      margin: 10,

      fontSize: 18,


    },
  errorText: {
    color: planted_colors.STRONG_RED,
    fontSize: 15,
    marginLeft: 20,

  },
  SplashScreen_ChildView:
    {
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

    },

});

export default Booking;



