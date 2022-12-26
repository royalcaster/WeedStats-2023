//React
import React from "react";
import { Animated, StyleSheet } from "react-native";

//Custom Components
import ProfileImage from "./ProfileImage";

const SearchPanelItem = () => {
    return (
        <Animated.View>
            <ProfileImage type={1} x={50}  />
        </Animated.View>
    );
}

export default SearchPanelItem