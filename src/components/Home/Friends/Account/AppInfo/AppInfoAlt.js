//React
import React, { useContext, useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View, Text, Image } from "react-native";

//Custom Components
import Button from "../../../common/Button";

//Third Party
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { LanguageContext } from "../../../../data/LanguageContext";
import Entypo from 'react-native-vector-icons/Entypo'

const AppInfo = ({ onExit }) => {

    const language = useContext(LanguageContext);

    return (
        <Animated.View style={[styles.container]}>
            <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              flex: 1,
              height: Dimensions.get("screen").height,
              top: 0,
              zIndex: 1000
            }}
          >
            <View style={{flex:1, justifyContent: "flex-start"}}></View>
            <View
              style={{
                width: "90%",
                backgroundColor: "#1E2132",
                alignSelf: "center",
                borderRadius: 25,
                height: "50%"
              }}
            >
              <View style={{ flex: 1}}>
                <Text
                  style={[
                    styles.heading,
                    {
                      textAlign: "center",
                      height: "100%",
                      textAlignVertical: "center",
                      fontSize: responsiveFontSize(2.5),
                      marginLeft: 0
                    },
                  ]}
                >App-Info
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center"}}>
                <Image style={{height: responsiveHeight(5), width: responsiveHeight(5), alignSelf: "center"}} source={require('../../../../../assets/icon.png')}/>
                <Text style={[styles.text, { fontSize: responsiveFontSize(1.5) }]}>
                  Version 0.2
                </Text>
              </View>

              <View style={{ flex: 2, justifyContent: "center"}}>
                <Text style={[styles.text, { fontSize: responsiveFontSize(1.5) }]}>
                  {language.config_authors}
                </Text>
                <Text style={[styles.text, { fontSize: responsiveFontSize(1.8), color: "#0080FF" }]}>
                  royalcaster{"\n"}
                  Ined{"\n"}
                  yung lillo
                </Text>
              </View>

              <View style={{ flex: 1, justifyContent: "center"}}>
                
                <Text style={[styles.text, { fontSize: responsiveFontSize(1.8), color: "#484f78", fontFamily: "PoppinsLight"}]}>
                  Made in Schneeberg <Entypo style={{fontSize: responsiveFontSize(1.8)}} name="heart-outlined"/>
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Button
                  title={"Ok"}
                  color={"#484f78"}
                  borderradius={25}
                  fontColor={"white"}
                  onPress={() => onExit()}
                  hovercolor={"rgba(255,255,255,0.15)"}
                />
              </View>
            </View>
            <View style={{flex:1, justifyContent: "flex-end"}}></View>
          </View>
        </Animated.View>
    );
}

export default AppInfo

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
      },
      heading: {
        color: "white",
        fontSize: responsiveFontSize(2.3),
        fontFamily: "PoppinsMedium",
        marginLeft: 20,
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
        fontSize: 18,
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