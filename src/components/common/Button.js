//React
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";

//Third Party
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

const Button = ({ icon, title, color, hovercolor, borderradius, onPress,fontColor, color2, small }) => {

  const [rippleOverflow, setRippleOverflow] = useState(true);

  return (
    <>
    <View
      style={[
        { backgroundColor: color, borderRadius: 10, width: small ? "100%" : "80%"},
        styles.container,
      ]}
    >
      <TouchableNativeFeedback
        onPress={() => {
          onPress();
        }}
        background={TouchableNativeFeedback.Ripple(hovercolor, rippleOverflow)}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={styles.touchable}>
          <Text> {icon}</Text>
          <Text style={[{ color: fontColor }, styles.title]}> {title}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
    
    <View style={[styles.container2,{borderRadius: 5, backgroundColor: color2}]}></View>
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    zIndex: 10,
  },
  container2: {
    height: 10,
    width: "75%",
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    transform: [
      {translateY: responsiveHeight(-0.8)}
    ]
  },
  title: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: "PoppinsMedium",
    zIndex: 6,
    marginTop: 3,
  },
  touchable: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 10
  },
});
