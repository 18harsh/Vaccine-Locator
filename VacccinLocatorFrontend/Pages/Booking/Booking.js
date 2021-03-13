import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Card, Paragraph, TextInput, Title, TouchableRipple } from "react-native-paper";
import * as planted_colors from "../../Components/Color";

import { useDispatch } from "react-redux";

import LottieView from "lottie-react-native";

import { TabView, SceneMap } from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../../store/actions/auth";

import { TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { ExpandableCalendar, Timeline, CalendarProvider } from "react-native-calendars";
import moment from "moment";
import { Avatar } from "react-native-paper";
import connect from "react-redux/lib/connect/connect";

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


const EVENTS = [
  {
    start: "2017-09-06 22:30:00",
    end: "2017-09-06 23:30:00",
    title: "Dr. Mariana Joseph",
    summary: "3412 Piedmont Rd NE, GA 3032",
    color: "#e6add8",
  },
  {
    start: "2017-09-07 00:30:00",
    end: "2017-09-07 01:30:00",
    title: "Visit Grand Mother",
    summary: "Visit Grand Mother and bring some fruits.",
    color: "#ade6d8",
  },
  {
    start: "2017-09-07 02:30:00",
    end: "2017-09-07 03:20:00",
    title: "Meeting with Prof. Behjet Zuhaira",
    summary: "Meeting with Prof. Behjet at 130 in her office.",
    color: "#e6add8",
  },
  {
    start: "2017-09-07 04:10:00",
    end: "2017-09-07 04:40:00",
    title: "Tea Time with Dr. Hasan",
    summary: "Tea Time with Dr. Hasan, Talk about Project",
  },
  {
    start: "2017-09-07 01:05:00",
    end: "2017-09-07 01:35:00",
    title: "Dr. Mariana Joseph",
    summary: "3412 Piedmont Rd NE, GA 3032",
  },
  {
    start: "2017-09-07 14:30:00",
    end: "2017-09-07 16:30:00",
    title: "Meeting Some Friends in ARMED",
    summary: "Arsalan, Hasnaat, Talha, Waleed, Bilal",
    color: "#d8ade6",
  },
  {
    start: "2017-09-08 01:40:00",
    end: "2017-09-08 02:25:00",
    title: "Meet Sir Khurram Iqbal",
    summary: "Computer Science Dept. Comsats Islamabad",
    color: "#e6bcad",
  },
  {
    start: "2017-09-08 04:10:00",
    end: "2017-09-08 04:40:00",
    title: "Tea Time with Colleagues",
    summary: "WeRplay",
  },
  {
    start: "2017-09-08 00:45:00",
    end: "2017-09-08 01:45:00",
    title: "Lets Play Apex Legends",
    summary: "with Boys at Work",
  },
  {
    start: "2017-09-08 11:30:00",
    end: "2017-09-08 12:30:00",
    title: "Dr. Mariana Joseph",
    summary: "3412 Piedmont Rd NE, GA 3032",
  },
  {
    start: "2017-09-10 12:10:00",
    end: "2017-09-10 13:45:00",
    title: "Merge Request to React Native Calendards",
    summary: "Merge Timeline Calendar to React Native Calendars",
  },
];

// const EVENTS = [{"_id": "6048be8b1b2ae90af0bd00a8", "end": "2021-03-11 12:03:00", "eventDate": "2021-03-10T18:30:00.000Z", "start": "2021-03-11 11:03:00", "summary": "Book Slot", "title": "Capacity:20"}, {"_id": "6048be8b1b2ae90af0bd00a8", "end": "2021-03-11 12:03:00", "eventDate": "2021-03-10T18:30:00.000Z", "start": "2021-03-11 11:03:00", "summary": "Book Slot", "title": "Capacity:20"}, {"_id": "6048be8b1b2ae90af0bd00a8", "end": "2021-03-11 12:03:00", "eventDate": "2021-03-10T18:30:00.000Z", "start": "2021-03-11 11:03:00", "summary": "Book Slot", "title": "Capacity:20"}, {"_id": "6048bea31b2ae90af0bd00aa", "end": "2021-03-12 10:03:00", "eventDate": "2021-03-11T18:30:00.000Z", "start": "2021-03-12 09:03:00", "summary": "Book Slot", "title": "Capacity:17"}, {"_id": "6049b33cfe526117189744fd", "end": "2021-03-15 10:03:00", "eventDate": "2021-03-14T18:30:00.000Z", "start": "2021-03-15 09:03:00", "summary": "Book Slot", "title": "Capacity:19"}]


class MyReactNativeForm extends Component {

  state = {
    originLatitude: 19.213567050389614,
    originLongitude: 72.85285072119105,
    userDetails: {},
    loading: true,
    slotDetails: {},
    eventDetails: [],
    currentDate: "2021-03-12",
  };


  async componentDidMount() {
    const { clinicName, clinicId, clinicAddress, clinicObjectId } = this.props.route.params;
    console.log(clinicObjectId);
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      console.log("User Data AsyncStorage", userData);
      if (!userData) {
        this.props.navigation.navigate("UserClinicPage");
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
      const resData2 = await response1.json();

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

      this.setState({
        slotDetails: resData1,
        userDetails: resData2,
      });

      console.log("This State");

      var array = [];
      // EVENTS.filter(event => console.log(moment(event.start)))
      const new_Object = this.state.slotDetails.map((i, j) => {


        i.eventTiming.map((k, j) => {
          console.log();
          var obj2 = {};
          obj2["start"] = moment(new Date(k.startTime)).format("YYYY-MM-DD HH:MM:SS");
          obj2["end"] = moment(new Date(k.endTime)).format("YYYY-MM-DD HH:MM:SS");
          obj2["title"] = `Capacity:${k.allotmentLimit}`;
          obj2["summary"] = "Book Slot";
          obj2["eventDate"] = i.eventDate;
          obj2["_id"] = i._id;
          // console.log(k)
          array.push(obj2);
        });

        // obj[String(new Date(i.eventDate).getFullYear()+"-"+new Date(i.eventDate).getMonth()+"-"+new Date(i.eventDate).getDate())] = [obj2]
      });
      console.log(array);
      this.setState({
        eventDetails: array,
      });
      // console.log(obj)


      if (expirationDate <= new Date() || !token || !userId) {
        this.props.navigation.navigate("UserClinicPage");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      this.props.dispatchingSession(userId, token, expirationTime, userType);


      this.setState({
        loading: false,
      });
      // setLoading(false);
    };

    tryLogin();


  }

  getTheme = () => {
    const themeColor = "#0059ff";
    const lightThemeColor = "#e6efff";
    const disabledColor = "#a6acb1";
    const black = "#20303c";
    const white = "#ffffff";

    return {
      // arrows
      arrowColor: black,
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: black,
      textMonthFontSize: 16,
      textMonthFontFamily: "HelveticaNeue",
      textMonthFontWeight: "bold",
      // day names
      textSectionTitleColor: black,
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: "HelveticaNeue",
      textDayHeaderFontWeight: "normal",
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: "HelveticaNeue",
      textDayFontWeight: "500",
      textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2 },
    };
  };


  onDateChanged = date => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
    this.setState({
      currentDate: date,
    });

  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };


  render() {
    const { clinicName, clinicId, clinicAddress, clinicObjectId } = this.props.route.params;
    if (this.state.loading) {
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
    return (<CalendarProvider
      // date={ITEMS[0].title}
      date={this.state.currentDate}
      onDateChanged={this.onDateChanged}
      onMonthChange={this.onMonthChange}
      theme={{ todayButtonTextColor: "#0059ff" }}
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
        theme={this.getTheme()}
        // leftArrowImageSource={require('../img/previous.png')}
        // rightArrowImageSource={require('../img/next.png')}
        // calendarStyle={styles.calendar}
        // headerStyle={styles.calendar} // for horizontal only
        // disableWeekScroll
      />
      <Timeline
        format24h={true}
        eventTapped={async e => {
          console.log(e._id);
          console.log(JSON.stringify({
            "clinicObjectId": clinicObjectId,
            "patientObjectId": this.state.userDetails._id,
            "date": e.eventDate,
            "timeSlotId": e._id,
            "start_time": e.start,
            "end_time": e.end,
          }));
          const response2 = await fetch("http://10.0.2.2:4000/booking/time/slots", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "clinicObjectId": clinicObjectId,
                "patientObjectId": this.state.userDetails._id,
                "date": e.eventDate,
                "timeSlotId": e._id,
                "start_time": e.start,
                "end_time": e.end,
              }),
            },
          );


          const resData = await response2.json();
          console.log(resData);
          if (resData.message === "time slots already created") {
            Alert.alert("Slot Booked Successfully");
            this.props.navigation.navigate("UserTabbedNavigation");
          } else if (resData.message === "Bookings are Full") {
            Alert.alert("Bookings are Full, Try another Slot Timing");

          }

        }}
        events={this.state.eventDetails.filter(event => moment(event.start).isSame(this.state.currentDate, "day"))}
        // scrollToFirst={true}
        // start={8}
        // end={18}
      />
    </CalendarProvider>);
  }


  // console.log("THIS itemId otherParam", clinicName, clinicId, clinicAddress, clinicObjectId);


};


const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: "#f0f4f7",
    color: "#79838a",
  },
  item: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e8ecf0",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e8ecf0",
  },
  emptyItemText: {
    color: "#79838a",
    fontSize: 14,
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

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    dispatchingSession: (userId, token, expirationTime, userType) => dispatch(authActions.authenticate(userId, token, expirationTime, userType)),
  };
};

export default connect(null, mapDispatchToProps)(MyReactNativeForm);



