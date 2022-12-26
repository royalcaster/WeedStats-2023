//React
import React, { useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated, Dimensions, Easing } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { TouchableNativeFeedback } from "react-native";

//Custom Components
import Button from "./Button";
import { LanguageContext } from "../../data/LanguageContext";


const LanguageDialog = ({ onSelect, onExit }) => {

    const screen_height = Dimensions.get("screen").height;
    const screen_width = Dimensions.get("screen").width;

    const slide = useRef(new Animated.Value(screen_height)).current;

    useEffect(() => {
        show();
    },[]);


    const show = () => {
        Animated.timing(slide,{
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 1, 0.21, 0.97),
        }).start()
    }

    const hide = () => {
        Animated.timing(slide,{
            toValue: screen_height,
            duration: 600,
            useNativeDriver: true
        }).start(({finished}) => {
            finished ? onExit() : null;
        })
    }

    return <>
    <Animated.View style={[styles.container,{transform: [{translateY: slide}]}]}>

        <TouchableNativeFeedback onPress={() => {onSelect("de"); hide()}} background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.15)", false)}>
            <View style={styles.touchable}>
                <Image resizeMode="center" style={styles.flagg} source={require('../../data/img/de.png')}/>
                <View style={{height: responsiveHeight(1)}}></View>
                <Text style={styles.label}>Deutsch (DE)</Text>
            </View>
        </TouchableNativeFeedback>

        <View style={{height: responsiveHeight(5)}}></View>

        <TouchableNativeFeedback onPress={() => {onSelect("en"); hide()}} background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.15)", false)}>
            <View style={styles.touchable}>
                <Image resizeMode="center" style={styles.flagg} source={require('../../data/img/gb.png')}/>
                <View style={{height: responsiveHeight(1)}}></View>
                <Text style={styles.label}>English (UK)</Text>
            </View>
        </TouchableNativeFeedback>

    </Animated.View>
    </>
}

export default LanguageDialog

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    question: {
        color: "white",
        fontFamily: "PoppinsBlack",
        fontSize: responsiveFontSize(3),
        alignSelf: "center",
        textAlign: "center",
        width: "80%"
    },
    tutorial_image: {
        height: 200,
        width: 200
    },
    label: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: responsiveFontSize(2),
        alignSelf: "center"
    },
    touchable: {
        padding: 20
    },
    flagg: {
        height: 100,
        width: responsiveWidth(50)
    }
});