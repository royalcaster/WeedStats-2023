//React
import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";

//Third-Party
import { LinearGradient } from "expo-linear-gradient";

//Service
import { LanguageContext } from "../../../../../data/LanguageContext";
import TypeImage from "../../../../common/TypeImage";

const DailyAveragePanel = ({selectedType, value}) => {

    const language = useContext(LanguageContext);

    return (
    <View style={{borderRadius: 10, padding: 20, width: "100%", overflow: "hidden"}}>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        {selectedType === "main" ? (
            <>
            <TypeImage type={"joint"} size={50}/>
            <TypeImage type={"bong"} size={50}/>
            <TypeImage type={"vape"} size={50}/>
            <TypeImage type={"pipe"} size={50}/>
            <TypeImage type={"cookie"} size={50}/>
            </>
        ) : null}

        {selectedType !== "main" ? (
          <TypeImage type={selectedType} size={70}/>
        ) : null}

      </View>
      

    <View style={{height: 20}}></View>

    <View style={{alignSelf: "center"}}>
      <Animated.Text style={styles.value}>
        {value}
      </Animated.Text>
      <Text style={styles.time_tag}>
        Ø {language.stats_day}
      </Text>
    </View>

    </View>)
}

export default DailyAveragePanel

const styles = StyleSheet.create({
    bong_img: {
        width: 35,
        height: 60,
        alignSelf: "center",
        position: "absolute",
        marginTop: 10,
        opacity: 1,
      },
      joint_img: {
        width: 20,
        height: 60,
        alignSelf: "center",
        position: "absolute",
        marginTop: 10,
        opacity: 1
      },
      vape_img: {
        width: 20,
        height: 60,
        alignSelf: "center",
        position: "absolute",
        marginTop: 10,
        opacity: 1,
      },
      pipe_img: {
        width: 45,
        height: 65,
        alignSelf: "center",
        position: "absolute",
        marginTop: 10,
        opacity: 1,
      },
      cookie_img: {
        width: 50,
        height: 50,
        alignSelf: "center",
        position: "absolute",
        marginTop: 10,
        opacity: 1,
      },
      time_tag: {
        fontSize: 18,
        color: "white",
        fontFamily: "PoppinsLight",
        textAlign: "center"
      },
      value: {
        fontSize: 60,
        color: "white",
        fontFamily: "PoppinsBlack",
        marginBottom: -25,
        textAlign: "center"
      }
});