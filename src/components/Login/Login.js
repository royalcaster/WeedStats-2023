//React
import React, { useContext, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Image, Text } from "react-native";

//Service
import { LanguageContext } from "../../data/LanguageContext";

//Custom Components
import LoginNumber from "./LoginNumber/LoginNumber";
import LoginLine from "./LoginLine/LoginLine";
import Button from '../common/Button'

const Login = ({ handleLogin }) => {

  const screen_width = Dimensions.get("screen").width;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const language = useContext(LanguageContext);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    }, []);

  return (
    <Animated.View style={[{ opacity: fadeAnim }, styles.login_container]}>

      <View
        style={{
          width: "100%",
          height: 200,
          position: "absolute",
          top: 200,
          zIndex: 2
        }}
      >
        
        <Image
          style={{ height: 250, width: 250, alignSelf: "center", marginTop: -50}}
          source={require("../../data/img/logo.png")}
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontFamily: "PoppinsBlack",
            textAlign: "center",
            marginTop: -30,
          }}
        >
          WeedStats
        </Text>
      </View>

      <View
        style={{ zIndex: 2, position: "absolute", bottom: 0, width: "100%" }}
      >
        <Button
          fontColor={"white"}
          title={language.login}
          borderradius={100}
          color={"#0080FF"}
          onPress={handleLogin}
          hovercolor={"rgba(255,255,255,0.3)"}
          color2={"#004080"}
        />
        <View style={{ height: 40 }}></View>
      </View>

      <View
        style={{
          position: "absolute",
          height: 250,
          width: "100%",
          bottom: 0,
          zIndex: 1,
        }}
      >
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  login_container: {
    backgroundColor: "#1E2132",
    height: "100%",
  },
  login_heading: {
    color: "#1E2132",
    fontSize: 25,
    fontFamily: "PoppinsBlack",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10,
  },
  login_pressable: {
    borderWidth: 2,
    borderRadius: 100,
    width: 300,
    height: 60,
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  login_pressable_text: {
    color: "white",
    alignSelf: "center",
    fontFamily: "PoppinsLight",
    fontSize: 18,
    color: "#1E2132",
  },
  login_logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  info_container: {
    width: "85%",
    flex: 4,
    backgroundColor: "#1E2132",
    alignSelf: "center",
    borderRadius: 20,
  },
  info_icon: {
    color: "white",
    alignSelf: "center",
    fontSize: 70,
  },
  text: {
    color: "white",
    fontFamily: "PoppinsLight",
    width: "85%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 15,
  },
  image: {
      height: 60,
      width: 20,
      alignSelf: "center"
  }
});

export default Login;
