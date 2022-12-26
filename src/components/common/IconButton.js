import React from "react";
import { Animated, View, StyleSheet,TouchableNativeFeedback } from "react-native";

const IconButton = ({icon, onPress, backgroundColor }) => {
    return (
        <Animated.View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : "#1E2132"}]}>
            <TouchableNativeFeedback
        onPress={() => {
          onPress();
        }}
        background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.2)", true)}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={styles.touchable}>
            {icon}
        </View>
      </TouchableNativeFeedback>
        </Animated.View>
    );
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        height: 60,
        width: 60
    },
    touchable: {
        height: "100%",
        width: "100%",
        padding: 20,
        borderRadius: 100
    }
});