//React
import React, { useRef, useContext } from "react";
import { View, StyleSheet, Text, Animated, Easing, Dimensions } from "react-native";

//Custom Components
import BackButton from "../../../../common/BackButton";
import LevelImage from "../../../../common/LevelImage";

//Konstanten
import levels from "../../../../../data/Levels.json";

//Service
import { LanguageContext } from "../../../../../data/LanguageContext";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { useBackHandler } from "@react-native-community/hooks";

const Levels = ({ onexit, show }) => {

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
        onexit();
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
        <Text style={styles.heading}>{language.account_levels}</Text>
      </View>

      <View style={{ height: responsiveHeight(3) }}></View>

      {language.levels.map((level, index) => {
        return (
          <View
            key={index}
            style={{
              alignSelf: "center",
              borderRadius: 10,
              width: "90%",
              backgroundColor: level.colors[0],
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              borderColor: index == language.levels.length - 1 ? "#E6C743" : null,
              borderWidth: index == language.levels.length - 1 ? 3 : null,
              maxWidth: 700,
            }}
          >
            <LevelImage index={index} style={styles.lvl_img} />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.lvl_name}>{level.name}</Text>
              {index != language.levels.length - 1 ? (
                <Text style={styles.lvl_bounds}>
                  {index * 70}-{(index + 1) * 70 - 1}
                </Text>
              ) : (
                <Text style={styles.lvl_bounds}>ab {index * 70}</Text>
              )}
            </View>
          </View>
        );
      })}
      <View style={{ height: responsiveHeight(2) }}></View>
    </Animated.View>
  );
};

export default Levels;

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
  }
});
