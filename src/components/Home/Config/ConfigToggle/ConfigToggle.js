//React
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Easing, TouchableNativeFeedback, View, Text} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Toggle from "react-native-toggle-element";

const ConfigToggle = ({ label, value, onPress, disabled, scrolling }) => {

    const screen_height = Dimensions.get("screen").height;
    const screen_width = Dimensions.get("screen").width;

    useEffect(() => {
        
    },[]);


    return <View style={styles.container}>
            <TouchableNativeFeedback delayPressIn={50} disabled={disabled || scrolling} background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", false)} onPress={onPress}>
                <View style={styles.touchable}>
                    <View style={{flex: 5}}>
                        <Text style={[styles.label,{color: disabled ? "#484F78" : "white"}]}>{label}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{backgroundColor: "rgba(0,0,0,0)", height: 30, width: 50, position: "absolute", zIndex: 1000}}></View>
                        <Toggle
                            value={value}
                            onPress={() => null}
                            disabled={disabled}
                            trackBar={{
                                activeBackgroundColor: "#484F78",
                                inActiveBackgroundColor: "#1E2132",
                                width: 50,
                                height: 25,
                            }}
                            thumbButton={{
                                inActiveBackgroundColor: "white",
                                activeBackgroundColor: "white",
                                height: 25,
                                width: 25,
                            }}
                        />
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
}

export default ConfigToggle

const styles = StyleSheet.create({
    container: {
        width: "90%",
        backgroundColor: "#131520",
        overflow: "hidden",
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 2.5
    },
    touchable: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        fontFamily: "PoppinsMedium",
        fontSize: responsiveFontSize(1.75),
        color: "white"
    }
});