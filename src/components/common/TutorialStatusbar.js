import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Animated, View, StyleSheet, Dimensions } from 'react-native'

const TutorialStatusbar = ({ status }) => {
    return <View style={styles.container}>
        <Animated.View style={[styles.status,{left: Dimensions.get("screen").width * (-1),width: Dimensions.get("screen").width, transform: [{translateX: status}]}]}></Animated.View>
        <LinearGradient colors={["#1E2132","#0781E1"]} style={styles.blur} start={{ x: 1, y: 1 }}></LinearGradient>
    </View>
}

export default TutorialStatusbar

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#1E2132",
        height: 30,
        position: "absolute",
        zIndex: 20000,
        bottom: 0,
        flexDirection: "row"
    },
    status: {
        backgroundColor: "#0781E1",
        height: "100%",
    },
    blur: {
        backgroundColor: "green",
        width: 30,
        height: "100%",
    }
});