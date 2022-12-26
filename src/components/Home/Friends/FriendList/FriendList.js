//React
import React, {useEffect, useRef, useState, memo, useContext} from "react";
import { Animated, View, StyleSheet, ScrollView, Text } from "react-native";

//Custom Components
import Empty from "../../../common/Empty";
import FriendListItem from "./FriendListItem/FriendListItem";
import CustomLoader from "../../../common/CustomLoader";

//Third Party
import uuid from 'react-native-uuid'

//Service
import { UserContext } from "../../../../data/UserContext";
import { FriendListContext } from "../../../../data/FriendListContext";
import { responsiveHeight } from "react-native-responsive-dimensions";


const FriendList = memo(({ setActiveFriend, setShowFriend, getFriendList }) => {

    const user = useContext(UserContext);

    const [loading, setLoading] = useState(true);

    const friendList = useContext(FriendListContext)

    useEffect(() => {
        getFriendList();
        setLoading(false);
    },[]);

    return (
        <Animated.View style={[styles.container]}>
            {!loading ?  
                <>
                    {friendList.length != 0 ? 
                        <ScrollView>
                            {friendList.map((friend) => {
                                return <FriendListItem key={uuid.v4()} userid={friend} onPress={() => {
                                    setActiveFriend(friend);
                                    setShowFriend(true);
                                }}/>
                            })}
                            <View style={{height: responsiveHeight(5)}}></View>
                        </ScrollView>
                        : 
                        <View style={{height: "90%", justifyContent: "center"}}>
                            <Empty title={"Du hast noch keine Freunde"} tip={"Tippe auf das + oben rechts."}/>
                        </View>}
                </> 
                : 
                <View style={{height: "90%", justifyContent: "center"}}>
                    <CustomLoader x={50} color={"#0080FF"}/>
                </View>}
        </Animated.View>
    );
})

export default FriendList

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "80%",
    }
});