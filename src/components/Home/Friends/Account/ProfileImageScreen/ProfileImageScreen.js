//React
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Easing, Image } from "react-native";
import ProfileImage from "../../../../common/ProfileImage";

const ProfileImageScreen = ({ onExit, uri }) => {

    const screen_height = Dimensions.get("screen").height;
    const screen_width = Dimensions.get("screen").width;

    const slide = useRef(new Animated.Value(screen_height)).current;

    useEffect(() => {
        show();
    },[]);

    const show = () => {
        Animated.timing(slide,{
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 1, 0.21, 0.97),
        }).start()
    }

    const hide = () => {
        Animated.timing(slide,{
            toValue: screen_height,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 1, 0.21, 0.97),
        }).start(({finished}) => {
            finished ? onExit() : null;
        })
    }

    return (
        <Animated.View style={[styles.container,{transform:[{translateY: slide}]}]}>
            <Image source={{uri: }}/>
        </Animated.View>
    );
}

export default ProfileImageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green"
    }
});