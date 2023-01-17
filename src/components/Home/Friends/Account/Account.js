//React
import React, { useState, useRef, useContext } from "react";
import { View, StyleSheet, Text, Animated, Easing, Dimensions, TouchableNativeFeedback, Modal, PanResponder } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Custom Components
import Feedback from "./Feedback/Feedback";
import Donation from "./Donation/Donation";
import Levels from "./Levels/Levels";
import ProfileImage from "../../../common/ProfileImage";
import Button from "../../../common/Button";
import BackButton from "../../../common/BackButton";
import AppInfo from "./AppInfo/AppInfo";
import ProfileImagePanel from "../../../common/ProfileImagePanel";

//Tools
import { convertMemberSince } from "../../../../data/DateConversion";

//Third Party
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Antdesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

//Service
import { UserContext } from "../../../../data/UserContext";
import { LanguageContext } from "../../../../data/LanguageContext";
import TutorialPanel from "./TutorialPanel/TutorialPanel";
import Tutorial from "../../../common/Tutorial";

const Account = ({ handleLogOut, onexit, show, toggleNavbar, deleteAccount }) => {

  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  
  const screen_height = Dimensions.get("screen").height;
  const [showLevels, setShowLevels] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAppInfo, setShowAppInfo] = useState(false);
  const [showProfilePicture, setShowProfilePicture] = useState(false);

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.Value(0)).current;

  const slide = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(pan, {
      toValue: responsiveHeight(-1),
      duration: 400,
      easing: Easing.bezier(0.2, 1, 0.21, 0.97),
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    Animated.timing(pan, {
      toValue: screen_height,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
       /*setShowAppInfo(false);
        setShowDonation(false);
        setShowLevels(false);
        setShowTutorial(false);*/
        onexit();
        opacityAnim.setValue(0);
      }
    });
  };

  show ? slide() : hide();

  const [showDelete, setShowDelete] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);

  //PanResponder test -> so funktionierts endlich, so ein dreck ehrlich
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      if (!showTutorial) {
        return true;
      } 
    },
    onMoveShouldSetPanResponder: (event, gesture) => {
      if (!showTutorial && !showDelete && !showLogOut) {
        return true;
      } 
    },
    onPanResponderMove: (event, gesture) => {
      if (gesture.dy > 0 && !showTutorial) {pan.setValue(gesture.dy);}
    },
    onPanResponderRelease: (event, gesture) =>  {
      if ((gesture.dy > screen_height/ 10 || gesture.vy > 1) && !showTutorial) {hide()} else{slide();}
    }
 });

  return (
    <Animated.View
      style={[
        {
          opacity: opacityAnim,
          height: "100%",
          transform: [{ translateY: pan }],
        },
        styles.container,
      ]}
      {...panResponder.panHandlers}
    >
      {showLevels   ? <Levels onexit={() => setShowLevels(false)} show={showLevels}/>             : null}
      {showFeedback ? <Feedback userid={user.id} onexit={() => setShowFeedback(false)}/>          : null}
      {showDonation ? <Donation onexit={() => setShowDonation(false)}/>                           : null}
      {showTutorial ? <Tutorial onDone={() => setShowTutorial(false)} toggleNavbar={toggleNavbar} type={"regular"}/> : null}
      {showAppInfo ? <AppInfo show={showAppInfo} onExit={() => setShowAppInfo(false)}/> : null}

      <Modal animationType="fade" visible={showProfilePicture}>
        <ProfileImagePanel url={user.photoUrl} onExit={() => setShowProfilePicture(false)}/>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={showDelete}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            flex: 1
          }}
        >
          <View
            style={{
              width: "90%",
              height: 300,
              backgroundColor: "#1E2132",
              alignSelf: "center",
              borderRadius: 25,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.heading,
                  {
                    marginLeft: 0,
                    textAlign: "center",
                    height: "100%",
                    textAlignVertical: "center",
                    fontSize: responsiveFontSize(3.5),
                    fontFamily: "PoppinsMedium"
                  },
                ]}
              >
                {language.delete_account_title}
              </Text>
            </View>
            <View style={{ flex: 1}}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2), maxWidth: "80%", fontFamily: "PoppinsMedium"}]}>
                {language.delete_account_text}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button title={language.account_delete_account_cancel} onPress={() => setShowDelete(false)} color={"#484F78"} fontColor={"white"}/>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button title={language.account_delete_account_submit} onPress={() => deleteAccount()} color={"#eb4034"} fontColor={"white"}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={showLogOut}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            flex: 1
          }}
        >
          <View
            style={{
              width: "90%",
              height: 300,
              backgroundColor: "#1E2132",
              alignSelf: "center",
              borderRadius: 25,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.heading,
                  {
                    marginLeft: 0,
                    textAlign: "center",
                    height: "100%",
                    textAlignVertical: "center",
                    fontSize: responsiveFontSize(3.5),
                    fontFamily: "PoppinsMedium"
                  },
                ]}
              >
                {language.signout_title}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button title={language.account_delete_account_cancel} onPress={() => setShowLogOut(false)} color={"#484F78"} fontColor={"white"}/>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button title={language.account_sign_out} onPress={() => handleLogOut()} color={"#eb4034"} fontColor={"white"}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>


      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: "#131520",
        }}
      >
        <View style={{height: responsiveHeight(2.5)}}></View>
        <View style={{width: "20%", height: 10, backgroundColor: "#1E2132", borderRadius: 50, alignSelf: "center"}}></View>
        <View style={{ width: "100%", justifyContent: "center", flex: 1}}>
          <View style={{ marginLeft: 5, position: "absolute" }}>
            <View style={{ transform: [{ rotate: "-90deg" }], zIndex: 20, left: responsiveWidth(7)}}>
              <BackButton
                onPress={() => {
                  onexit();
                  hide();
                }}
              />
            </View>
          </View>
          <Text
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,1)",
              fontSize: responsiveFontSize(3),
              fontFamily: "PoppinsBlack"
            }}
          >
            {language.account_your_account}
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
            width: "80%",
            alignSelf: "center",
            paddingRight: 20,
            paddingLeft: 20,
            height: 100,
            backgroundColor: "#484F78",
            borderRadius: 15
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
          >
              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", true)} style={{overflow: "hidden"}} onPress={() => setShowProfilePicture(true)}>
                  <View style={styles.touchable_profileimage}>
                  </View>
              </TouchableNativeFeedback>
            <ProfileImage url={user.photoUrl} x={70} type={1} circle={true} circleColor={"#484F78"}/>
            
          </View>

          <View style={{ flex: 2 }}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>

        <View style={{ flex: 0.5, justifyContent: "center", backgroundColor: "#1E2132", width: "80%", alignSelf: "center", borderRadius: 15, marginTop: 10}}>
          <Text
            style={{
              alignSelf: "center",
              color: "rgba(255,255,255,1)",
              fontSize: responsiveFontSize(1.8),
              fontFamily: "PoppinsMedium",
            }}
          >
            {language.account_member_since} <Text style={{color: "#0781E1", fontFamily: "PoppinsBlack"}}>{convertMemberSince(user.member_since)}</Text>
          </Text>
        </View>

        <View style={{flex: 4, justifyContent: "center"}}>

        <View style={{flexDirection: "row", width: "80%", alignSelf: "center"}}>
            <View style={{flex: 1}}>
              <Button
                fontColor={"white"}
                onPress={() =>{ setShowLevels(true)}}
                borderradius={100}
                color={"#484F78"}
                title={language.account_levels}
                icon={<FontAwesome name="trophy" style={styles.money_icon} />}
                hovercolor={"rgba(255,255,255,0.15)"}
                small={true}
              />
            </View>
            <View style={{width: responsiveWidth(2)}}></View>
            <View style={{flex: 1}}>
              <Button
                onPress={() => setShowDonation(true)}
                title={language.account_support}
                icon={<MaterialIcons name="euro" style={styles.money_icon} />}
                borderradius={100}
                color={"#484F78"}
                fontColor={"white"}
                hovercolor={"rgba(255,255,255,0.15)"}
                small={true}
              />
            </View>
        </View>

        <View style={{flexDirection: "row", width: "80%", alignSelf: "center"}}>
            <View style={{flex: 1}}>
              <Button
                onPress={() => setShowTutorial(true)}
                title={language.account_tutorial}
                icon={<Feather name="help-circle" style={styles.money_icon} />}
                borderradius={100}
                color={"#484F78"}
                fontColor={"white"}
                hovercolor={"rgba(255,255,255,0.15)"}
                small={true}
              />
            </View>
            <View style={{width: responsiveWidth(2)}}></View>
            <View style={{flex: 1}}>
              <Button
                onPress={() => setShowAppInfo(true)}
                title={"App-Info"}
                icon={<Feather name="info" style={styles.money_icon} />}
                borderradius={100}
                color={"#484F78"}
                fontColor={"white"}
                hovercolor={"rgba(255,255,255,0.15)"}
                small={true}
              />
            </View>
        </View>

        <Button
          onPress={() => setShowLogOut(true)}
          title={language.account_sign_out}
          icon={<MaterialIcons name="logout" style={styles.money_icon} />}
          borderradius={100}
          color={"#eb4034"}
          fontColor={"white"}
          hovercolor={"rgba(255,255,255,0.25)"}
          color2={"#80231C"}
        />


        <View style={{ width: "80%", alignSelf: "center", borderRadius: 10, overflow: "hidden" }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              "rgba(255,255,255,0.05)",
              false
            )}
            onPress={() => setShowDelete(true)}
          >
            <View style={styles.touchable_delete}>
              <Text style={styles.delete_text}>{language.account_delete_account}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default Account;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 1,
    position: "absolute",
    backgroundColor: "#1E2132",
    alignSelf: "center",
    marginTop: 50
  },
  username: {
    color: "white",
    fontSize: responsiveFontSize(2.2),
    fontFamily: "PoppinsMedium",
  },
  email: {
    color: "rgba(255,255,255,0.75)",
    fontSize: responsiveFontSize(1.6),
    fontFamily: "PoppinsLight",
  },
  money_icon: {
    fontSize: 25,
    color: "white",
    textAlignVertical: "center",
  },
  touchable_delete: {
    width: "100%",
    alignSelf: "center",
    height: 60
  },
  delete_text: {
    color: "#eb4034",
    fontFamily: "PoppinsLight",
    alignSelf: "center",
    textAlignVertical: "center",
    height: "100%",
  },
  heading: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsBlack",
    fontSize: responsiveFontSize(3),
    alignSelf: "center",
  },
  touchable: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 40,
  },
  text: {
    color: "white",
    fontFamily: "PoppinsMedium",
    textAlign: "center",
    alignSelf: "center"
  },
  touchable_profileimage: {
    zIndex: 1,
    position: "absolute",
    height: 70,
    width: 70,
    borderRadius: 100
  }
});
