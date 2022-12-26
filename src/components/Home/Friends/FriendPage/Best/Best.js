//React
import React, {useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, Easing } from "react-native";

//Custom Components
import LevelImage from "../../../../common/LevelImage";

//Third Party
import { LinearGradient } from "expo-linear-gradient";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const Best = ({ colors, level_index, title}) => {

    const scale_anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(scale_anim,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97)
            }    
        ).start();
    });

    return (
        <Animated.View style={[styles.container,{transform: [{scale: scale_anim}]}]}>
                <LinearGradient colors={colors} style={[styles.activity_container,{height: 80}]}>
                  <LevelImage index={level_index} style={{marginTop: -5, marginLeft: -25}}/>
                  <Text style={{color: "white", fontSize: responsiveFontSize(1.8), fontFamily: "PoppinsBlack"}}>{title}</Text>
                </LinearGradient>
        </Animated.View>
    );
}

export default Best

const styles = StyleSheet.create({
    container: {

    },
    activity_container: {
        borderRadius: 10,
        flexDirection: "row",
        width: "70%",
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center"
      },
});