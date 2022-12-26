//React
import React from "react";
import { StyleSheet, View, Text, Image, Pressable, TouchableNativeFeedback } from "react-native";

//Tools
import toGermanDate from "../../../../../../data/DateConversion";

//Third Party
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import IconButton from "../../../../../common/IconButton";

const HistoryTable = ({ event, showOnMap }) => {

  return (
    <View style={{
      flexDirection: "row",
      width: "90%",
      marginBottom: 5,
      borderTopColor: "#121212",
      borderTopWidth: 0,
      alignSelf: "center",
      backgroundColor: "#131520",
      justifyContent: "center",
      borderRadius: 10,
      overflow: "hidden"
    }}>
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", false)} onPress={() => showOnMap(event)} delayPressIn={50}>
    <View
      style={[styles.touchable]}
    >
      <View style={{ flex: 1 }}>
        {event.type == "joint" ? (
          <Image style={styles.j_img} source={require("../../../../../../data/img/joint.png")} />
        ) : null}
        {event.type == "bong" ? (
          <Image style={styles.b_img} source={require("../../../../../../data/img/bong.png")} />
        ) : null}
        {event.type == "vape" ? (
          <Image style={styles.v_img} source={require("../../../../../../data/img/vape.png")} />
        ) : null}
        {event.type == "pipe" ? (
          <Image style={styles.p_img} source={require("../../../../../../data/img/pipe.png")} />
        ) : null}
        {event.type == "cookie" ? (
          <Image style={styles.c_img} source={require("../../../../../../data/img/cookie.png")} />
        ) : null}
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text style={styles.date}>
          <Fontisto name="date" style={styles.icon_date} />{"  "}
          {toGermanDate(new Date(event.timestamp))}
        </Text>
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text style={styles.time}>
          <Ionicons name="time-outline" style={styles.icon_time} />{" "}
          {new Date(event.timestamp).toLocaleTimeString("de-DE").substring(0,5)}
        </Text>
      </View>
      {/* <View style={{ flex: 1.5, borderRadius: 10 }}>

        <IconButton 
          icon={<AntDesign
            name="enviromento"
            style={{
              color: "white",
              fontSize: responsiveFontSize(2.3),
              textAlignVertical: "center",
              textAlign: "center"
            }}
          />}
          onPress={() => showOnMap(event)}
        />
      </View> */}
    </View>
    </TouchableNativeFeedback>
    </View>
  );
};

export default HistoryTable;

const styles = StyleSheet.create({
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#2b2b2b",
  },
  TableText: {
    margin: 10,
    color: "white",
    fontFamily: "PoppinsLight",
  },
  j_img: {
    height: 50,
    width: 15,
    alignSelf: "center",
  },
  b_img: {
    height: 50,
    width: 30,
    alignSelf: "center",
  },
  v_img: {
    height: 50,
    width: 30,
    alignSelf: "center",
  },
  p_img: {
    height: 50,
    width: 30,
    alignSelf: "center",
  },
  c_img: {
    height: 40,
    width: 40,
    alignSelf: "center",
  },
  date: {
    textAlign: "center",
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(1.75),
    color: "white",
    alignSelf: "center",
  },
  time: {
    textAlign: "center",
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(1.75),
    color: "white",
  },
  icon_date: {
    fontSize: 13,
    color: "white",
  },
  icon_time: {
    fontSize: 16,
    color: "white",
  },
  touchable: {
    flexDirection: "row",
    width: "100%",
    padding: 10
  }
});
