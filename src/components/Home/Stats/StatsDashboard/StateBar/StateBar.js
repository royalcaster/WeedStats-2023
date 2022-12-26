//React
import React from "react";
import {View, Text, Animated, StyleSheet, Image} from 'react-native'

//Third-Party
import moment from "moment";
import AntDesign from 'react-native-vector-icons/AntDesign'

const StateBar = ({ type, value }) => {

    const today = moment(new Date(), "YYYY-MM-DD HH:mm:ss")
    today.locale("de");

    if (type=="streak") {
        return (
            <View style={styles.container}>

                <View style={styles.div}>
                    <View style={styles.image_container}>
                        {value > 3 ? <Image style={{height: 20, width: 20}} source={require('../../../../../data/img/logo.png')}/>
                         : <Image style={{height: 20, width: 20}} source={require('../../../../../data/img/logo_bw.png')}/>}
                        
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(-2).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
                <View style={styles.div}>
                    <View style={styles.image_container}>
                        {value > 2 ? <Image style={{height: 20, width: 20}} source={require('../../../../../data/img/logo.png')}/>
                         : <Image style={{height: 20, width: 20}} source={require('../../../../../data/img/logo_bw.png')}/>}
                        
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(-1).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
                <View style={styles.div}>
                    <View style={styles.image_container}>
                        {value > 1 ? <Image style={{height: 20, width: 20}} source={require('../../../../../data/img/logo.png')}/> 
                        : <Image style={{height: 20, width: 20}} source={require('../../../../../data/img/logo_bw.png')}/>}
                        
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(0).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
                <View style={[styles.div, styles.div_selected]}>
                    <View style={styles.image_container}>
                        <Image style={{height: 20, width: 20}} source={require('../../../../../data/img/logo.png')}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(1).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
                <View style={styles.div}>
                    <View style={styles.image_container}>
                        <Image style={{height: 20, width: 20}} source={require('../../../../../data/img/logo_bw.png')}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(2).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
                <View style={styles.div}>
                    <View style={styles.image_container}>
                        <Image style={{height: 20, width: 20}} source={require('../../../../../data/img/logo_bw.png')}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(3).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>

                <View style={styles.div}>
                    <View style={styles.image_container}>
                        <Image style={{height: 20, width: 20}} source={require('../../../../../data/img/logo_bw.png')}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(4).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
            </View>
        );
    }
    else if (type=="break") {
        return (
            <View style={styles.container}>

                <View style={styles.div}>
                    <View style={styles.image_container}>
                        <AntDesign name="closecircleo" style={[styles.close_icon,{color: value > 3 ? "#eb4034" : "#484F78"}]}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(-2).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
                <View style={styles.div}>
                    <View style={styles.image_container}>
                        <AntDesign name="closecircleo" style={[styles.close_icon,{color: value > 2 ? "#eb4034" : "#484F78"}]}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(-1).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
                <View style={styles.div}>
                    <View style={styles.image_container}>
                        <AntDesign name="closecircleo" style={[styles.close_icon,{color: value > 1 ? "#eb4034" : "#484F78"}]}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(0).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
                <View style={[styles.div, styles.div_selected]}>
                    <View style={styles.image_container}>
                        <AntDesign name="closecircleo" style={[styles.close_icon,{color: "#eb4034"}]}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(1).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
                <View style={styles.div}>
                    <View style={styles.image_container}>
                        <AntDesign name="closecircleo" style={[styles.close_icon,{color: "#484F78"}]}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(2).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
                <View style={styles.div}>
                    <View style={styles.image_container}>
                        <AntDesign name="closecircleo" style={[styles.close_icon,{color: "#484F78"}]}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(3).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>

                <View style={styles.div}>
                    <View style={styles.image_container}>
                        <AntDesign name="closecircleo" style={[styles.close_icon,{color: "#484F78"}]}/>
                    </View>
                    <View style={styles.day_container}>
                        <Text style={styles.day}>{today.day(4).format("dddd").substring(0,2)}</Text>
                    </View>
                </View>
    
            </View>
        );
    }
    else {
        return null;
    }


    
}

export default StateBar

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        height: 40
    },
    div: {
        flex: 1,
        flexDirection: "column"
    },
    div_selected: {
        backgroundColor: "#1E2132",
        borderRadius: 4
    },
    image_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 3
    },
    day_container: {
        flex: 1,
    },
    day: {
        color: "white",
        textAlign: "center",
        fontFamily: "PoppinsBlack",
        fontSize: 10,
        textAlignVertical: "center"
    },
    close_icon: {
        fontSize: 13,
        textAlign: "center",
        textAlignVertical: "center"
    }
});
