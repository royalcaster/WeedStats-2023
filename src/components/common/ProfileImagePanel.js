//React
import react, { useContext, useEffect } from "react";
import { View, StyleSheet, Dimensions } from 'react-native'
import { responsiveHeight } from "react-native-responsive-dimensions";
import { LanguageContext } from "../../data/LanguageContext";
import Button from "./Button";

//Custom Components
import ProfileImage from "./ProfileImage";

const ProfileImagePanel = ({ url, onExit }) => {

    const language = useContext(LanguageContext);

    const getHighResUrl = () => {
       return url.substring(0, url.length - 4) + "800-c";
    }

    return <View style={{flex: 1, backgroundColor: "#1E2132", justifyContent: "center"}}>
        <ProfileImage url={getHighResUrl()} x={Dimensions.get("window").width}/>
        <View style={{height: responsiveHeight(5)}}></View>
        <Button title={language.account_delete_account_cancel} onPress={() => onExit()} color={"#484F78"} fontColor={"white"}/>
    </View>
}

export default ProfileImagePanel