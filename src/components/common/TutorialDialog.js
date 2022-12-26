//React
import React, { useRef, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing, Dimensions } from 'react-native'
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { LanguageContext } from "../../data/LanguageContext";

//Custom Components
import Button from "./Button";


const TutorialDialog = ({ onSubmit, onCancel }) => {

    const language = useContext(LanguageContext);


    useEffect(() => {
        show();
    },[]);

    const screen_height = Dimensions.get("screen").height;
    const screen_width = Dimensions.get("screen").width;

    const slide = useRef(new Animated.Value(screen_height)).current;

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
            finished ? onCancel() : null;
        })
    }
    
    return <>
    <Animated.View style={[styles.container,{transform: [{translateY: slide}]}]}>

        <Image source={require('../../data/img/tutorial.png')} style={styles.tutorial_image}/>
        
        <View style={{height: responsiveHeight(10)}}></View>

        <Button title={language.see_now} color={"#0080FF"} color2={"white"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.3)"} onPress={() => onSubmit()}/>
        <Button title={language.later} color={"#484F78"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.15)"} onPress={() => hide()}/>
        <View style={{height: responsiveHeight(10)}}></View>
    </Animated.View>
    </>
}

export default TutorialDialog

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
    }
});