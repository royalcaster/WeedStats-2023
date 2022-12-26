import React, { useEffect, useReducer, useRef } from "react";
import { Text, View, StyleSheet, Animated, Dimensions, Easing } from 'react-native'
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";

const DialogContainer = ({ backgroundColor, title, backButtonEnabled, contentView, onExit }) => {

    const screen_width = Dimensions.get("screen").width;
    const screen_height = Dimensions.get("screen").height;

    const slide = useRef(new Animated.Value(screen_height)).current;

    useEffect(() => {
        show();
    });

    const show = () => {
        Animated.timing(slide, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.07, 1, 0.33, 0.89),
        }).start()
    }

    const hide = () => {
        Animated.timing(slide, {
            toValue: screen_height,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.07, 1, 0.33, 0.89),
        }).start(({finished}) => {
            finished ? onExit() : null;
        })
    }

    return <>
    <Animated.View style={[styles.container, {backgroundColor: backgroundColor, transform: [{translateY: slide}]}]}>
        <View style={{height: 50}}></View>
        <View style={styles.heading_container}>
            {backButtonEnabled ? <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>--</Text>
            </View> : null}
            <View style={{flex: 7, justifyContent: "center"}}>
                <Text style={styles.heading}>{title}</Text>
            </View>
        </View>
        <View style={styles.content_container}>
            {contentView}
        </View>
    </Animated.View>
    </>
}

export default DialogContainer

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heading_container: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        paddingHorizontal: responsiveWidth(5)
    },
    heading: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: responsiveFontSize(2.5)
    },
    content_container: {
        flex: 1
    }
});