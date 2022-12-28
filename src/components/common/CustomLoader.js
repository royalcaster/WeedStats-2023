//React
import React, {useEffect, useRef } from "react";
import { Animated, StyleSheet, Easing, ActivityIndicator } from "react-native";

const CustomLoader = ({ x, color, special }) => {

    const scale1 = useRef(new Animated.Value(0)).current;
    const scale2 = useRef(new Animated.Value(0)).current;
    const scale3 = useRef(new Animated.Value(0)).current;
    const scale4 = useRef(new Animated.Value(0)).current;
    const scale5 = useRef(new Animated.Value(0)).current;
    const scale6 = useRef(new Animated.Value(0)).current;
    const scale7 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        show();
    });

    const show = () => {
        Animated.timing(
            scale1, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 0
            }
        ).start();
        Animated.timing(
            scale2, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 100
            }
        ).start();
        Animated.timing(
            scale3, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 140
            }
        ).start();
        Animated.timing(
            scale4, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 160
            }
        ).start();
        Animated.timing(
            scale5, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 175
            }
        ).start();
        Animated.timing(
            scale6, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 200
            }
        ).start();
        Animated.timing(
            scale7, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 240
            },
        ).start(({finished}) => {
            if (finished) {
                hide();
            }
        });
    }

    const hide = () => {
        Animated.timing(
            scale1, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 50
            }
        ).start();
        Animated.timing(
            scale2, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 100
            }
        ).start();
        Animated.timing(
            scale3, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 140
            }
        ).start();
        Animated.timing(
            scale4, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 160
            }
        ).start();
        Animated.timing(
            scale5, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 175
            }
        ).start();
        Animated.timing(
            scale6, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 200
            }
        ).start();
        Animated.timing(
            scale7, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
                delay: 240
            },
        ).start(({finished}) => {
            if (finished) {
                show();
            }
        });
    }

    return (
        <Animated.View style={[styles.container,{width: x, height: x}]}>
            {special ? <><Animated.Image style={[styles.img,{transform: [{scale: scale1}]}]} source={require('../../data/img/loading_animation/01.png')}/>
            <Animated.Image style={[styles.img,{transform: [{scale: scale2}]}]} source={require('../../data/img/loading_animation/02.png')}/>
            <Animated.Image style={[styles.img,{transform: [{scale: scale3}]}]} source={require('../../data/img/loading_animation/03.png')}/>
            <Animated.Image style={[styles.img,{transform: [{scale: scale4}]}]} source={require('../../data/img/loading_animation/04.png')}/>
            <Animated.Image style={[styles.img,{transform: [{scale: scale5}]}]} source={require('../../data/img/loading_animation/05.png')}/>
            <Animated.Image style={[styles.img,{transform: [{scale: scale6}]}]} source={require('../../data/img/loading_animation/06.png')}/>
            <Animated.Image style={[styles.img,{transform: [{scale: scale7}]}]} source={require('../../data/img/loading_animation/07.png')}/>
            </> : 
            <ActivityIndicator size={x} color={color}/>}

        </Animated.View>
    );
}

export default CustomLoader

const styles = StyleSheet.create({
    container: {
        alignSelf: "center"
    },
    img: {
        height: "100%",
        width: "100%",
        position: "absolute"
    }
});