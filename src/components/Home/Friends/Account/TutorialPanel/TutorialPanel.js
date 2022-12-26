//React
import React, { useRef } from "react";
import { View, StyleSheet, Text, Animated, Easing, Dimensions } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";

//Custom Components
import BackButton from "../../../../common/BackButton";
import Tutorial from '../../../../common/Tutorial'


const TutorialPanel = ({ onexit }) => {

  const screen_width = Dimensions.get("window").width;
  const fadeAnim = useRef(new Animated.Value(screen_width)).current;

  return (
    <Animated.View style={styles.container}>

        {/* <View style={{position: "absolute" ,flexDirection: "row", alignContent: "center", alignItems: "center", width: "100%", top: 0, zIndex: 1000}}>
            <View style={{marginLeft: 10}}>
                <BackButton onPress={() => onexit()}/>
            </View>
            <Text style={styles.heading}>Tutorial</Text>
        </View> */}

        
          <Tutorial onDone={() => onexit()}/>

      </Animated.View>
  );
};

export default TutorialPanel;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "purple",
    zIndex: 3,
    position: "absolute",
    top: 0
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontFamily: "PoppinsBlack",
    marginLeft: 20,
    textAlign: "left",
    marginTop: 5
  },
});
