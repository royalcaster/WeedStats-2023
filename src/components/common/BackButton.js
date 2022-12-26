//React
import React from "react";
import { Animated, View, StyleSheet, TouchableNativeFeedback } from "react-native";

//Third Party
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const BackButton = ({onPress}) => {
    return (
        <Animated.View style={styles.container}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.2)", true)} onPress={onPress}>
                <View style={styles.touchable}>
                    <MaterialIcons name="arrow-back" style={styles.icon_back}/>
                </View>
            </TouchableNativeFeedback>
        </Animated.View>
    );
}

export default BackButton

const styles = StyleSheet.create({
    container: {
    },   
    icon_back: {
        color: "rgba(255,255,255,0.75)", 
        fontSize: 20, 
        padding: 15,
        textAlign: "center",
        textAlignVertical: "center"
    },
    touchable: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(0,0,0,0.0)",
        borderRadius: 25
    }
    
});