import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const Statusbar = ({ status }) => {

    const [levelStatus, setLevelStatus] = useState(status);
    const [containerWidth, setContainerWidth] = useState(300);
    const animateTarget = (containerWidth * status / 100) - containerWidth;

    const slideAnim = useRef(new Animated.Value(-400)).current;

      Animated.timing(
        slideAnim, {
            toValue: animateTarget,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.bezier(0, 1.02, 0.21, 0.97),
            delay: 0
        }
    ).start();

    const chopStatus = () => {
        if (Number.isNaN(status)) {
            return null;
        }
       else if (status < 10) {
        return status.toString().substring(0,3) + "%"
       }
       else if (status == 100) {
        return "100%"
       }
       else if (status == "0%") {
        return "0%"
       }
       else {
        return status.toString().substring(0,2) + "%"
       }
    }

    return (
            <View style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#1E2132",
            alignSelf: "center",
            bottom: 0,
            borderRadius: 5,
            overflow: "hidden",
            alignItems: "center"
        }}
        onLayout={(event) => {
            setContainerWidth(event.nativeEvent.layout.width);
          }}>
            <Text style={styles.status}>{chopStatus(status)}</Text>
            
            <Animated.View style={{transform: [{translateX: slideAnim}], width: "100%", alignSelf: "flex-start",  height: "100%", backgroundColor: "#484F78"}}>
            </Animated.View>
        </View>
    )
}

export default Statusbar

const styles = StyleSheet.create({
    status: {
        color: "white", 
        fontFamily: "PoppinsMedium",
        fontSize: 12,
        position: "absolute",
        zIndex: 1,
        textAlignVertical: "center",
        top: -1,
        opacity: 0.75,
        top: "30%"
    }
})