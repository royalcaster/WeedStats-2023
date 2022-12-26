//React
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  TouchableNativeFeedback,
} from "react-native";

//Custom Components
import Account from "./Account/Account";
import FriendPage from "./FriendPage/FriendPage";
import SearchPanel from './SearchPanel/SearchPanel'
import FriendRequests from "../Friends/FriendRequests/FriendRequests";
import FriendList from "./FriendList/FriendList";

//Third Party
import Feather from 'react-native-vector-icons/Feather'
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";

//Serice
import { UserContext } from "../../../data/UserContext";
import { LanguageContext } from "../../../data/LanguageContext";
import { responsiveWidth } from "react-native-responsive-dimensions";

const Groups = ({ handleLogOut, toggleNavbar, deleteAccount, getFriendList }) => {

  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  
  const [showFriend, setShowFriend] = useState(false);
  const [activeFriend, setActiveFriend] = useState();
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showRequests, setShowRequests] = useState();

  const accountAnim = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(accountAnim,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0, 1.02, 0.21, 0.97),
      }).start();
    Animated.timing(fadeAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start()
  },[]);


  return (
    <>
      {showAddFriend ? <SearchPanel onExit={() => setShowAddFriend(false)}/> : null}
      {showRequests ? <FriendRequests onExit={() => setShowRequests(false)} refresh={() => getFriendList()}/> : null}

      <FriendPage
        show={showFriend}
        userid={activeFriend}
        onExit={() => {setShowFriend(false); setActiveFriend(null);}}
        refresh={() => {getFriendList(); setActiveFriend(null); setShowFriend(false);}}
        toggleNavbar={toggleNavbar}
        />

      <Account
        handleLogOut={handleLogOut}
        onexit={() => setShowAccount(false)}
        toggleNavbar={toggleNavbar}
        show={showAccount}
        deleteAccount={deleteAccount}
      />

      <Animated.View style={[{ opacity: fadeAnim }, styles.container]}>
        <View style={{ height: responsiveHeight(7) }}></View>
        <View style={{ alignItems: "center", flexDirection: "row", marginBottom: 0}}>
          <Text style={styles.bold_heading}>{language.friends_friends}</Text>
          <View
            style={{ flexDirection: "row", right: 0, position: "absolute" }}
          >
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.1)", true)}
              onPress={() => setShowAddFriend(true)}
            >
              <View
                style={[
                  styles.touchable,
                  { height: 50, backgroundColor: "#1E2132", width: 50 },
                ]}
              >
                <Feather name="plus" style={styles.icon} />
              </View>
            </TouchableNativeFeedback>

            <View style={{ width: 10 }}></View>

            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                "rgba(255,255,255,0.1)",
                true
              )} onPress={() => setShowRequests(true)}
            >
              <View
                style={[
                  styles.touchable,
                  { height: 50, backgroundColor: "#1E2132", width: 50 },
                ]}
              >
                <Feather name="user-check" style={styles.icon} />
              </View>
            </TouchableNativeFeedback>

            <View style={{ width: 20 }}></View>
          </View>
        </View>

      <FriendList setActiveFriend={setActiveFriend} setShowFriend={setShowFriend} getFriendList={getFriendList}/>


        <Animated.View
          style={{
            transform: [{ translateY: accountAnim }],
            borderRadius: 10,
            overflow: "hidden",
            position: "absolute",
            bottom: 10,
            height: 60,
            width: "95%",
            alignSelf: "center",
            borderTopColor: "#131520"
          }}
        >
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              "rgba(255,255,255,0.1)",
              true
            )}
            onPress={() => {setShowAccount(true)}}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={styles.touchable}>
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: user.photoUrl }}
                  style={{ height: "100%", width: "100%" }}
                ></Image>
              </View>
              <View style={{ flex: 4, justifyContent: "center" }}>
                <Text
                  style={{
                    left: 15,
                    fontFamily: "PoppinsMedium",
                    color: "white",
                    fontSize: responsiveFontSize(2.0),
                  }}
                >
                  {user.username}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </Animated.View>
      </Animated.View>
      </>
  );
  
};

export default Groups;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2132",
    height: "100%",
    width: "100%",
    zIndex: 0
  },
  heading: {
    fontFamily: "PoppinsMedium",
    color: "white",
    fontSize: responsiveFontSize(2.3),
    marginLeft: 30,
  },
  icon: {
    textAlignVertical: "center",
    color: "white",
    fontSize: responsiveFontSize(2.3),
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  text: {
    textAlignVertical: "center",
    marginLeft: 10,
    color: "#c4c4c4",
    fontFamily: "PoppinsLight",
    fontSize: 16,
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#131520"
  },
  empty: {
        color: "rgba(255,255,255,0.5)",
        alignSelf: "center",
        fontFamily: "PoppinsLight",
        fontSize: 12
    },
    bold_heading: {
      color: "white",
      fontFamily: "PoppinsBlack",
      fontSize: responsiveFontSize(4),
      marginLeft: responsiveWidth(5)
    }
});
