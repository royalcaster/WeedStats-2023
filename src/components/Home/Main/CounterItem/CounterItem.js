//React
import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, Animated, Easing, TouchableNativeFeedback, Vibration } from "react-native";

//Custom Components
import Statusbar from "./StatusBar/Statusbar";
import LevelImage from "../../../common/LevelImage";
import Slider from './Slider/Slider'

//Third Party
import { LinearGradient } from "expo-linear-gradient";

//Service
import { LanguageContext } from "../../../../data/LanguageContext";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import LevelBar from "./LevelBar/LevelBar";

const CounterItem = ({ type, counter, toggleCounter, toggleBorderColor }) => {

  const language = useContext(LanguageContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonFill = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(200)).current;

  const heightInterpolate = buttonFill.interpolate({
    inputRange: [0,1],
    outputRange: [0, 300]
  })

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 400,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const fill = () => {
    Animated.timing(buttonFill, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const empty = () => {
    Animated.timing(buttonFill, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const calcLevelStatus = (counter) => {

    if (counter == null) {
      return 0;
    }

    if (counter >= 420) {
      return 100;
    } else if (counter == 0) {
      return 0;
    } else {
      var indicator = Math.ceil(counter / 70);
      return (100 * (counter - 70 * (indicator - 1))) / 70;
    }
  };

  const calcLevelName = (counter) => {
    if (counter) {
    let indicator = Math.floor(counter / 70);
    return indicator > language.levels.length - 1
      ? language.levels[levels.length - 1].name
      : language.levels[indicator].name;
    }
    else {
      return language.levels[0].name;
    }
  };

  const getGradientColors = (counter) => {
    if (counter) {
    let indicator = Math.floor(counter / 70);
    return indicator > language.levels.length - 1
      ? language.levels[language.levels.length - 1].colors
      : language.levels[indicator].colors;
    }
    else {
      
      return language.levels[0].colors;
    }
  };

  const grow = () => {
    Animated.timing(
      scaleAnim,
      {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }
    ).start();
  }

  const shrink = () => {
    Animated.timing(
      scaleAnim,
      {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }
    ).start();
  }

  const convertToRGB = ( hex, a) => {
    if(hex.length != 6){
        throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = hex.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16),
        a
    ];
    return "rgba(" + aRgb[0] + ", " + aRgb[1] + ", " + aRgb[2] + ", " + a + ")";
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: scaleAnim }], opacity: fadeAnim }]}>
       
      <Animated.View style={[styles.card_opener, {backgroundColor: convertToRGB(getGradientColors(counter)[0].substring(1,7), 0.4), borderColor: getGradientColors(counter)[0], borderWidth: 0.5, transform: [{translateX: scaleAnim}]}]}>
      {type === "joint" ? (
            <Image
              style={styles.joint_img}
              source={require("../../../../data/img/joint.png")}
            />
          ) : null}
          {type === "bong" ? (
            <Image style={styles.bong_img} source={require("../../../../data/img/bong.png")} />
          ) : null}
          {type === "vape" ? (
            <Image style={styles.vape_img} source={require("../../../../data/img/vape.png")} />
          ) : null}
          {type === "pipe" ? (
            <Image style={styles.pipe_img} source={require("../../../../data/img/pipe.png")} />
          ) : null}
          {type === "cookie" ? (
            <Image
              style={styles.cookie_img}
              source={require("../../../../data/img/cookie.png")}
            />
          ) : null}
      </Animated.View>
      
      <View style={[styles.card_content]}>
        <View style={{flex: 6}}>
        <View style={styles.grab}></View>
          <View style={{flex: 1, flexDirection: "row", padding: 5, paddingBottom: 0}}>
            <View style={{flex: 2, alignItems: "center", flexGrow: 3}}>
              <Text style={styles.counter_number}>{counter}</Text>
            </View>
            <View style={{flex: 5, padding: 5, maxHeight: responsiveHeight(7)}}>
              <Statusbar status={calcLevelStatus(counter)} />
            </View>
          </View> 
          <View style={{flex: 1, padding: 10, paddingTop: 5}}>
            <Slider firstColor={getGradientColors(counter)[0]} secondColor={getGradientColors(counter)[2]} onToggleCounter={() => {toggleCounter(type.toLowerCase()); toggleBorderColor(getGradientColors(counter)[0])}}/>
          </View>
        </View>  
        <View style={{flex: 1, flexDirection: "column"}}>
          <LevelBar index={Math.floor(counter / 70)}/>
        </View>
      </View> 

    </Animated.View>
  );
};

export default CounterItem;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    margin: 5,
    marginVertical: 10,
    flexDirection: "row"
  },
  counter_number: {
    color: "white",
    fontSize: responsiveFontSize(6),
    fontFamily: "PoppinsMedium",
    marginBottom: responsiveHeight(1) * -1
  },
  level_label: {
    color: "white",
    fontFamily: "PoppinsMedium",
    fontSize: responsiveFontSize(2),
    marginBottom: 3,
    marginTop: 5,
    position: "absolute",
    top: 0
  },
  bong_img: {
    width: responsiveWidth(6),
    height: responsiveHeight(5),
    alignSelf: "center"
  },
  joint_img: {
    width: responsiveWidth(3),
    height: responsiveHeight(5),
    alignSelf: "center"
  },
  vape_img: {
    width: responsiveWidth(3),
    height: responsiveHeight(5),
    alignSelf: "center"
  },
  pipe_img: {
    width: responsiveWidth(7),
    height: responsiveHeight(5),
    alignSelf: "center"
  },
  cookie_img: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    alignSelf: "center"
  },
  add_pressable: {
    padding: 30,
    paddingTop: 40,
    paddingBottom: 40,
    position: "absolute",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginTop: 35,
    right: -25,
    overflow: "hidden",
  },
  fire_icon: {
    color: "white",
    fontSize: 30,
    zIndex: 10,
  },
  progress: {
    backgroundColor: "#0080FF",
    height: "100%",
    width: "100%",
    position: "absolute",
    borderRadius: 30,
    width: "83%",
    alignSelf: "center"
  },
  touchable: {
    borderWidth: 2,
    borderRadius: 10
  },
  add: {
    color: "white",
    fontFamily: "PoppinsMedium",
    fontSize: responsiveFontSize(7.5),
    textAlignVertical: "center",
    textAlign: "center"
  },
  panel: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  type_label: {
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(1.5)
  },
  card_opener: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingRight: 20
  },
  card_content: {
    flex: 5,
    backgroundColor: "#131520",
    borderRadius: 10,
    marginLeft: -20,
    flexDirection: "row"
  },
  grab: {
    alignSelf: "center",
    height: 5,
    width: "25%",
    borderRadius: 10,
    backgroundColor: "#1E2132",
    zIndex: 1000,
    marginVertical: 15,
    marginBottom: 5
  }
});
