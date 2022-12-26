//React
import React from "react";
import { View, StyleSheet,TouchableNativeFeedback, Image } from "react-native";

const MenuButton = ({type, url, icon, color, borderradius, onPress, disabled}) => {
        
    return (
      <View style={[{backgroundColor: color, borderRadius: borderradius},styles.container]}>
      <TouchableNativeFeedback
      disabled={disabled}
        onPress={() => {
          onPress();
        }}
        background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.05)", true)}
        style={{height: "100%"}}
      >

        {
            type == "img" ? 
            <View style={styles.touchable}>
                <Image source={url} style={styles.image}/>
            </View>
            :   <View style={styles.touchable}>
                    {icon}
                </View>
        }
            
      </TouchableNativeFeedback>
    </View>
    );
}

export default MenuButton

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flex: 1,
        padding: 0
    },
    title: {
        fontSize: 13,
        fontFamily: "PoppinsLight",
        zIndex: 6,
        marginTop: -10,
    },
    touch: {
        width: "100%",
        height: 100,
        borderRadius: 100,
        backgroundColor: "green",
        position: "absolute",
        zIndex: 5
    },
    touchable: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
        height: 60,
        width: 60,
        alignSelf: "center",
      },
});