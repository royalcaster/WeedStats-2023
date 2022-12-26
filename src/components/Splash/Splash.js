//React
import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated, Image, Easing } from 'react-native'
import { responsiveHeight } from "react-native-responsive-dimensions";

const Splash = ({onExit}) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(700)).current;

  const scale1 = useRef(new Animated.Value(0)).current;
  const scale2 = useRef(new Animated.Value(0)).current;
  const scale3 = useRef(new Animated.Value(0)).current;
  const scale4 = useRef(new Animated.Value(0)).current;
  const scale5 = useRef(new Animated.Value(0)).current;
  const scale6 = useRef(new Animated.Value(0)).current;
  const scale7 = useRef(new Animated.Value(0)).current;

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
        Animated.timing(
          fadeAnim2, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true
          },
      ).start()
      }
    });

    Animated.timing(
      fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }
    ).start();
  }

  const hideSplash = () => {
    Animated.timing(
        fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true
        }
    ).start();

    Animated.timing(slideAnim,{
      toValue: -1000,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.bezier(0,1.02,.21,.97),
    }).start(({finished}) => {
      if (finished) {onExit()}
    });
  }

    useEffect(() => {
      show();
      setTimeout(() => hideSplash(),2000);
    },[]);

    return (
        <Animated.View style={[{opacity: fadeAnim}, styles.container]}>
            <Animated.View style={{transform: [{translateY: 0}],height: 50, width: 50, justifyContent: "center", alignItems: "center"}}>

                <Animated.Image style={[styles.img,{transform: [{scale: scale1}]}]} source={require('../../data/img/loading_animation/01.png')}/>
                <Animated.Image style={[styles.img,{transform: [{scale: scale2}]}]} source={require('../../data/img/loading_animation/02.png')}/>
                <Animated.Image style={[styles.img,{transform: [{scale: scale3}]}]} source={require('../../data/img/loading_animation/03.png')}/>
                <Animated.Image style={[styles.img,{transform: [{scale: scale4}]}]} source={require('../../data/img/loading_animation/04.png')}/>
                <Animated.Image style={[styles.img,{transform: [{scale: scale5}]}]} source={require('../../data/img/loading_animation/05.png')}/>
                <Animated.Image style={[styles.img,{transform: [{scale: scale6}]}]} source={require('../../data/img/loading_animation/06.png')}/>
                <Animated.Image style={[styles.img,{transform: [{scale: scale7}]}]} source={require('../../data/img/loading_animation/07.png')}/>

                <Animated.Image style={[styles.img,{transform: [{scale: scale7}], opacity: fadeAnim2}]} source={require('../../data/img/logo_glow.png')}/>

            </Animated.View>
        </Animated.View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1E2132",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: 150,
        width: 150
    },
    img: {
        height: responsiveHeight(20),
        width: responsiveHeight(20),
        position: "absolute"
    }
});