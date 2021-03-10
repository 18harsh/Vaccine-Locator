import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Linking } from "react-native";
import {  TextInput } from "react-native-paper";
import * as planted_colors from "../../../Components/Color";

import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from 'lottie-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import connect from "react-redux/lib/connect/connect";

const theme = {

  roundness: 4,
  colors: {
    placeholder: "white", text: "red", primary: "red",
    underlineColor: "black", background: "#003489",
  },
};


class MyReactNativeForm extends Component{
  state={
    userDetails:"",
    loading:true,
    getAppointment:"",
  }
  // const dispatch = useDispatch();
  // const navigation = useNavigation();
  // const [userDetails, setUserDetails] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [getAppointment, setAppointment] = useState(true);

  componentDidMount(){
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

      // const response = await fetch("http://10.0.2.2:4000/patient/single", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       "patientId": userId,
      //
      //     }),
      //   },
      // );
      const responseApp = await fetch("http://10.0.2.2:4000/patient/time/slots", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "patientObjectId": userId,

          }),
        },
      );
      const appointment = await responseApp.json();
      this.setState({
        getAppointment:appointment
      })

      // const resData = await response.json();
      // setUserDetails(resData);
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




render(){
  if (this.state.loading) {
    return (
      <View style={{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>
        <LottieView source={require('../../../Components/Images/loading.json')} autoPlay loop />
      </View>
    );
  }
  return (


    <View style={styles.MainContainer}>
      <View style={{

      }}>
        <Text style={{
          marginTop:10,
          color:planted_colors.STRONG_RED,
          fontSize:20
        }}> Appointments Made</Text>
      </View>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View>


          {this.state.getAppointment.map((i,j)=>{
            return  <Card style={{
              width:"90%",
              marginTop:30,
              backgroundColor:planted_colors.BLUEISH_GREEN
            }}>

              <Card.Content>
                <Title style={{
                  color:planted_colors.OFF_WHITE,
                  fontSize:18
                }} >{i.clinicName}</Title>
                <Paragraph style={{
                  color:planted_colors.OFF_WHITE,

                }}>{i.clinicAddress}</Paragraph>
              </Card.Content>
              <Card.Content>
                <Title style={{
                  color:planted_colors.STRONG_RED,
                  fontSize:15
                }} >Time Slot: {new Date(i.startTime).toLocaleTimeString()} - {new Date(i.endTime).toLocaleTimeString()}</Title>
                <Title style={{
                  color:planted_colors.STRONG_RED,
                  fontSize:15
                }} >Date: {new Date(i.eventDate).toLocaleDateString()}</Title>
                <Button theme={theme}
                        style={{
                          backgroundColor:planted_colors.STRONG_YELLOW
                        }}
                        onPress={()=>{
                          const latitude = i.coordinates[1];
                          const longitude = i.coordinates[0];
                          const label = i.clinicAddress;

                          const url = Platform.select({
                            ios: "maps:" + latitude + "," + longitude + "?q=" + label,
                            android: "geo:" + latitude + "," + longitude + "?q=" + label
                          });

                          Linking.canOpenURL(url).then(supported => {
                            if (supported) {
                              return Linking.openURL(url);
                            } else {
                              const browser_url =
                                "https://www.google.de/maps/@" +
                                latitude +
                                "," +
                                longitude +
                                "?q=" +
                                label;
                              return Linking.openURL(browser_url);
                            }
                          });
                          console.log("HelloWorld")
                        }}
                > Go To Here</Button>
              </Card.Content>

            </Card>
          })}

        </View>
      </ScrollView>
    </View>

  );
}





};


const styles = StyleSheet.create({
  MainContainer: {

    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
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



