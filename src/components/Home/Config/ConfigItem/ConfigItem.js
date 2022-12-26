//React
import React, { useContext, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableNativeFeedback } from "react-native";

//Third Party
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { LanguageContext } from "../../../../data/LanguageContext";

const ConfigItem = ({ type, config, onToggle }) => {

  const [active, setActive] = useState(config);

  const language = useContext(LanguageContext)

  return (
    <View style={styles.outer_container}>
      <TouchableNativeFeedback 
      onPress={() => {
        onToggle(type);
        setActive(!active);
      }}
      background={TouchableNativeFeedback.Ripple(
        "rgba(255,255,255,0.1)",
        true
      )}>
        
      <View style={active ? styles.container_active : styles.container}>
      <View style={styles.touchable}>
        {type === "joint" ? (
          <>
            <Image
              style={active ? styles.joint_img_active : styles.joint_img}
              source={require("../../../../data/img/joint.png")}
            ></Image>{/* 
            <Text style={active ? styles.label_active : styles.label}>
              {language.joint}
            </Text> */}
          </>
        ) : null}
        {type === "bong" ? (
          <>
            <Image
              style={active ? styles.bong_img_active : styles.bong_img}
              source={require("../../../../data/img/bong.png")}
            ></Image>{/* 
            <Text style={active ? styles.label_active : styles.label}>
            {language.bong}
            </Text> */}
          </>
        ) : null}
        {type === "vape" ? (
          <>
            <Image
              style={active ? styles.vape_img_active : styles.vape_img}
              source={require("../../../../data/img/vape.png")}
            ></Image>{/* 
            <Text style={active ? styles.label_active : styles.label}>
            {language.vape}
            </Text> */}
          </>
        ) : null}
        {type === "pipe" ? (
          <>
            <Image
              style={active ? styles.pipe_img_active : styles.pipe_img}
              source={require("../../../../data/img/pipe.png")}
            ></Image>{/* 
            <Text style={active ? styles.label_active : styles.label}>
            {language.pipe}
            </Text> */}
          </>
        ) : null}
        {type === "cookie" ? (
          <>
            <Image
              style={active ? styles.cookie_img_active : styles.cookie_img}
              source={require("../../../../data/img/cookie.png")}
            ></Image>
            {/* <Text style={active ? styles.label_active : styles.label}>
            {language.cookie}
            </Text> */}
          </>
        ) : null}
        </View>
      </View>
      </TouchableNativeFeedback></View>
  );
};

export default ConfigItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 2.5,
    marginBottom: 30,
    borderRadius: 5,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#131520",
    flex: 1,
  },
  container_active: {
    padding: 10,
    margin: 2.5,
    marginBottom: 30,
    borderRadius: 5,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#484F78",
    flex: 1
  },
  touchable: {
    flex: 1,
    justifyContent: "center"
  },
  bong_img: {
    height: responsiveHeight(6),
    width: responsiveWidth(7),
    alignSelf: "center",
    opacity: 0.8,
  },
  bong_img_active: {
    height: responsiveHeight(6),
    width: responsiveWidth(7),
    alignSelf: "center",
  },
  joint_img: {
    height: responsiveHeight(6),
    width: responsiveWidth(3),
    alignSelf: "center",
    opacity: 0.8,
  },
  joint_img_active: {
    height: responsiveHeight(6),
    width: responsiveWidth(3),
    alignSelf: "center",
  },
  vape_img: {
    height: responsiveHeight(6),
    width: responsiveWidth(5),
    alignSelf: "center",
    opacity: 0.8,
  },
  vape_img_active: {
    height: responsiveHeight(6),
    width: responsiveWidth(5),
    alignSelf: "center",
  },
  pipe_img: {
    height: responsiveHeight(6),
    width: responsiveWidth(6),
    alignSelf: "center",
    opacity: 0.8,
  },
  pipe_img_active: {
    height: responsiveHeight(6),
    width: responsiveWidth(6),
    alignSelf: "center",
  },
  cookie_img: {
    height: responsiveHeight(5),
    width: responsiveWidth(10),
    alignSelf: "center",
    opacity: 0.8,
  },
  cookie_img_active: {
    height: responsiveHeight(5),
    width: responsiveWidth(10),
    alignSelf: "center",
  },
  label: {
    color: "white",
    fontSize: responsiveFontSize(1.5),
    fontFamily: "PoppinsLight",
    marginTop: 10,
    marginBottom: 5,
    opacity: 0.8,
    alignSelf: "center",
  },
  label_active: {
    color: "white",
    fontSize: responsiveFontSize(1.5),
    fontFamily: "PoppinsLight",
    marginTop: 10,
    marginBottom: 5,
    alignSelf: "center",
  },
  checkbox: {
    color: "#666666",
    fontSize: 20,
    position: "absolute",
    top: 10,
    left: 10,
  },
  checkbox_active: {
    color: "#0781E1",
    fontSize: 20,
    position: "absolute",
    top: 10,
    left: 10
  },
  outer_container: {
    flex: 1,
    overflow: "hidden",
    marginHorizontal: 0
  }
});
