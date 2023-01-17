import react, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

const TypeImage = ({ type, size, border }) => {

    const [loading, setLoading] = useState(true);

    switch(type){
        case 'joint':
        return (
            <View style={{
                height: size == 0 ? "100%" : size,
                width: size == 0 ? "100%" : size,
                marginHorizontal: 3.5
            }}>
                <View style={styles.cover}>
                    <Image style={styles.img} source={require('../../data/img/joint.png')}/>
                </View>
            </View>
            )
        break;

        case 'bong':
        return (
            <View style={{
                height: size == 0 ? "100%" : size,
                width: size == 0 ? "100%" : size,
                marginHorizontal: 3.5
            }}>
                <View style={styles.cover}>
                    <Image style={styles.img} source={require('../../data/img/bong.png')}/>
                </View>
            </View>
            )
        break;

        case 'vape':
        return (
            <View style={{
                height: size == 0 ? "100%" : size,
                width: size == 0 ? "100%" : size,
                marginHorizontal: 3.5
            }}>
                <View style={styles.cover}>
                    <Image style={styles.img} source={require('../../data/img/vape.png')}/>
                </View>
            </View>
            )
        break;

        case 'pipe':
        return (
            <View style={{
                height: size == 0 ? "100%" : size,
                width: size == 0 ? "100%" : size,
                marginHorizontal: 3.5
            }}>
                <View style={styles.cover}>
                    <Image style={styles.img} source={require('../../data/img/pipe.png')}/>
                </View>
            </View>
            )
        break;

        case 'cookie':
        return (
            <View style={{
                height: size == 0 ? "100%" : size,
                width: size == 0 ? "100%" : size,
                marginHorizontal: 3.5
            }}>
                <View style={styles.cover}>
                    <Image style={styles.img} source={require('../../data/img/cookie.png')}/>
                </View>
            </View>
            )
        break;

        default:
        return (
            <View>
                <View style={styles.cover}>
                    <Image style={styles.img} source={require('../../data/img/bong.png')}/>
                </View>
            </View>
            )
        break;
    }

    
}

export default TypeImage

const styles = StyleSheet.create({
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    cover: {
        height: "100%",
        width: "100%",
        backgroundColor: "#484F78",
        borderRadius: 10,
        padding: 5
    }
});