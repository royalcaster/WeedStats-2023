//React
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Image, View, Text, Easing } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

//Custom Components
import Button from "./Button";
import IntroStatusbar from "./IntroStatusbar";
import LanguageDialog from "./LanguageDialog";
import Tutorial from "./Tutorial";

import { LanguageContext } from "../../data/LanguageContext";
import Authenticator from "./Authenticator";
import TutorialDialog from "./TutorialDialog";

const Intro = ({ onExit, onLanguageSelect, onAuthenticatorSelect }) => {

    const language = useContext(LanguageContext);

    const screen_height = Dimensions.get("screen").height;
    const screen_width = Dimensions.get("screen").width;

    const slide = useRef(new Animated.Value(screen_height)).current;

    const [step, setStep] = useState(1);
    const [showTutorial, setShowTutorial] = useState(false);

    useEffect(() => {
        show();
    },[]);

    const titles = ["What language do you speak?", language.unlock_question, language.tutorial_question]

    const show = () => {
        Animated.timing(slide,{
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 1, 0.21, 0.97),
        }).start()
    }

    const hide = () => {
        Animated.timing(slide,{
            toValue: screen_height,
            duration: 300,
            useNativeDriver: true
        }).start(({finished}) => {
            if (finished) {
                onExit();
            }
        })
    }

    const handleStep = () => {
        if (step == 3) {
            hide();
        }
        else {
            setStep(step + 1);
        }
    }

    return (
        <Animated.View style={[styles.container,{transform:[{translateY: slide}]}]}>

            {showTutorial ? <Tutorial toggleNavbar={() => null} type={"first"} onDone={() => {setShowTutorial(false); handleStep()}}/> : null}

            <View style={{height: responsiveHeight(5)}}></View>
            <Image style={styles.logo} source={require("../../data/img/logo.png")}/>
            <Text style={styles.step_label}>{language.step} {step} {language.of_3}</Text>
            <IntroStatusbar progress={step}/>
            <View style={{height: responsiveHeight(2.5)}}></View>
            <Text style={styles.title}>{titles[step - 1]}</Text>
            {
                step == 1 ? <>
                    <LanguageDialog onSelect={onLanguageSelect} onExit={() => handleStep()}/>
                </>
                : null
            }
            {
                step == 2 ? <>
                    <Authenticator first={true} onSubmit={() => onAuthenticatorSelect(true)} onCancel={() => onAuthenticatorSelect(false)} onExit={() => handleStep()}/>
                </>
                : null
            }
            {
                step == 3 ? <>
                    <TutorialDialog onSubmit={() => setShowTutorial(true)} onCancel={() => handleStep()}/>
                </>
                : null
            }
        </Animated.View>
    );
}

export default Intro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E2132",
        alignItems: "center"
    },
    logo: {
        height: responsiveHeight(8),
        width: responsiveWidth(12)
    },
    step_label: {
        color: "white",
        fontFamily: "PoppinsLight",
        alignSelf: "center",
        textAlign: "center"
    },
    title: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: responsiveFontSize(2.5),
        maxWidth: "80%",
        textAlign: "center"
    }
});