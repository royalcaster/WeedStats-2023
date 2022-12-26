//React
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import Button from "./Button";

const IntroStatusbar = ({ onExit, progress }) => {

    const screen_height = Dimensions.get("screen").height;
    const screen_width = Dimensions.get("screen").width;

    return (
        <Animated.View style={[styles.container]}>
            <Animated.View style={[styles.progress, {width: (screen_width * 0.7 / 3) * progress}]}>

            </Animated.View>
        </Animated.View>
    );
}

export default IntroStatusbar

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#131520",
        borderRadius: 50,
        height: 15,
        width: "70%"
    },
    progress: {
        backgroundColor: "#0080FF",
        height: "100%",
        borderRadius: 50
    }
});