//React
import React, {useEffect, useRef } from "react";
import { Animated, StyleSheet, Easing } from "react-native";

const LoginNumber = ({ fontFamily, color, top, left, fontSize, number, delay }) => {

const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(scaleAnim,
            {
                toValue: 1,
                delay: delay,
                useNativeDriver: true,
                duration: 500,
                easing: Easing.bounce
            }).start()
    },[]);

    return  (
                <Animated.Text style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.15)",
                    borderRadius: 100,
                    position: "absolute", 
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    color: color,
                    transform: [
                        {translateX: left-5},
                        {translateY: top-5},
                        {scale: scaleAnim}
                    ]}}>
                        {number}
                    </Animated.Text>
            );
}

export default LoginNumber