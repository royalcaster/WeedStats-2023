//React
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, PanResponder, Easing, View, Vibration} from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const Template = ({ firstColor, secondColor, onToggleCounter }) => {

    const pan = useRef(new Animated.Value(0)).current;

    const SLIDER_WIDTH = responsiveWidth(20);
    const [containerWidth, setContainerWidth] = useState(0);

    const shrink = () => {
        Animated.timing(
            pan, {
                toValue: 0,
                useNativeDriver: true,
                duration: 500,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
            }
        ).start();
    }

    //PanResponder test -> so funktionierts endlich, so ein dreck ehrlich
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => {
            Vibration.vibrate(25);
            return true;
        },
        onMoveShouldSetPanResponder: (event, gesture) => {
            return true;
        },
        onPanResponderMove: (event, gesture) => {
            if (gesture.dx > 0) {
                pan.setValue(gesture.dx);

                if (gesture.dx > (containerWidth - SLIDER_WIDTH)) {
                    pan.setValue(containerWidth - SLIDER_WIDTH);
                    onToggleCounter();
                    shrink();
                }

            }
            
        },
        onPanResponderRelease: (event, gesture) =>  {
            if (gesture.moveX > 0) {
                shrink();
            }
        }
    });

    return (
        <Animated.View style={[styles.container, {backgroundColor: secondColor}]} onLayout={(event) => {
            setContainerWidth(event.nativeEvent.layout.width);
          }}>
            <Animated.View style={{transform: [{translateX: pan}], justifyContent: "center", backgroundColor: "red", width: SLIDER_WIDTH, height: "100%", backgroundColor: firstColor, borderRadius: 5, flexDirection: "row", alignItems: "center"}} {...panResponder.panHandlers}>
                <View style={[styles.grab, {backgroundColor: secondColor, opacity: 0.25}]}></View>
                <View style={[styles.grab, {backgroundColor: secondColor, opacity: 0.25}]}></View>
                <View style={[styles.grab, {backgroundColor: secondColor, opacity: 0.25}]}></View>
            </Animated.View>
        </Animated.View>
    );
}

export default Template

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 45,
        borderRadius: 5,
        marginBottom: 5
    },
    grab: {
        height: "50%",
        width: 5,
        borderRadius: 10,
        margin: 2.5
    }
});