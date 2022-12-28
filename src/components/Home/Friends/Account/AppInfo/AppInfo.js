//React
import React, { useRef, useContext } from "react";
import { View, StyleSheet, Text, Animated, Easing, Dimensions, Image } from "react-native";

//Custom Components
import Button from "../../../../common/Button";
import BackButton from "../../../../common/BackButton";

//Service
import { LanguageContext } from "../../../../../data/LanguageContext";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

//Third Party
import Entypo from 'react-native-vector-icons/Entypo'
import { useBackHandler } from "@react-native-community/hooks";

const AppInfo = ({ onExit, show }) => {

  const language = useContext(LanguageContext);

  const screen_width = Dimensions.get("window").width;
  const fadeAnim = useRef(new Animated.Value(screen_width)).current;

  const slide = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.bezier(0,.79,0,.99),
      useNativeDriver: true,
    }).start();
  }

  const hide = () => {
    Animated.timing(fadeAnim, {
      toValue: screen_width,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        onExit();
      }
    });
  };

  show ? slide() : hide();

  useBackHandler(() => {
    hide();
    return true;
  },[]);

  return (
    <Animated.View style={[{ opacity: 1 , transform: [{translateX: fadeAnim}]}, styles.container]}>

              <View style={{ height: responsiveHeight(1) }}></View>

              <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                <View style={{marginLeft: 20}}>
                    <BackButton onPress={() => hide()}/>
                </View>
                <Text style={styles.heading}>App-Info</Text>
              </View>

              <View style={{flex: 1, justifyContent: "center"}}>
                <Image style={{height: responsiveHeight(12), width: responsiveHeight(12), alignSelf: "center"}} source={require('../../../../../data/img/logo.png')}/>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2) }]}>
                  Version 2.0
                </Text>

                <View style={{ height: responsiveHeight(5)}}></View>
                
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.5) }]}>
                  {language.config_authors}
                </Text>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2), color: "#0080FF" }]}>
                  royalcaster{"\n"}
                  Ined{"\n"}
                  yung lillo
                </Text>

                <View style={{ height: responsiveHeight(5)}}></View>

                <Text style={[styles.text, { fontSize: responsiveFontSize(1.8), color: "#484f78", fontFamily: "PoppinsLight"}]}>
                  Made in Schneeberg <Entypo style={{fontSize: responsiveFontSize(1.8)}} name="heart-outlined"/>
                </Text>
              </View>
    </Animated.View>
  );
};

export default AppInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#131520",
    paddingBottom: 30,
    zIndex: 1,
    position: "absolute",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontFamily: "PoppinsMedium",
    marginLeft: 20,
    textAlign: "left",
    marginTop: 3
  },
  lvl_img: {
    height: responsiveHeight(8),
    width: responsiveHeight(8),
    marginLeft: 15,
    marginTop: -10
  },
  lvl_name: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: "PoppinsBlack",
    color: "white",
  },
  lvl_bounds: {
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(1.75),
    marginTop: -5,
    color: "white",
  },
  label: {
    color: "rgba(255,255,255,0.75)",
    fontSize: responsiveFontSize(1.6),
    fontFamily: "PoppinsLight",
    marginLeft: 20,
  },
  text: {
    alignSelf: "center",
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(2),
    color: "white",
    maxWidth: 250,
    textAlign: "center",
  },
  save_button_container: {
    width: "100%",
    position: "absolute",
    bottom: 0
  },
  toggle_container: {
    flexDirection: "row",
    height: 40,
    width: "95%",
    alignContent: "center",
  }
});
