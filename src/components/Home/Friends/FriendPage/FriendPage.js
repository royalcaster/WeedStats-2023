//React
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Easing, View, StyleSheet, Dimensions, Text, Image, TouchableNativeFeedback, Modal, BackHandler, PanResponder } from "react-native";

//Custom Components
import ProfileImage from '../../../common/ProfileImage'
import Best from "./Best/Best";
import BackButton from "../../../common/BackButton";
import CustomLoader from "../../../common/CustomLoader";
import ProfileImagePanel from "../../../common/ProfileImagePanel";

//Third Party
import { responsiveHeight, responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import Antdesign from "react-native-vector-icons/AntDesign";

//Konstanten
import levels from "../../../../data/Levels.json";

//Firebase
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { firestore } from "../../../../data/FirebaseConfig";

//Service
import {UserContext} from '../../../../data/UserContext'
import { LanguageContext } from "../../../../data/LanguageContext";

const FriendPage = ({ show, userid, onExit, refresh, toggleNavbar }) => {

  const language = useContext(LanguageContext);

  const realuser = useContext(UserContext);
    
  const screen_width = Dimensions.get("screen").width;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const pan = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(screen_width)).current;
  const slideAnim2 = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim2 = useRef(new Animated.Value(0)).current;
  const [showProfilePicture, setShowProfilePicture] = useState(false);


  useEffect(() => {
    if (userid) {
      getUser();
    }
  }, [userid]);

  useEffect(() => {
    if (!show) {
    setLoading(true);
    }
  }, [show]);

  

  const slideCounters = () => {
    slideAnim2.setValue(-50);
    opacityAnim.setValue(0);
    opacityAnim2.setValue(0);

    Animated.timing(slideAnim2,{
      delay: 0,
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97)
    }).start();

    Animated.timing(opacityAnim,{
      delay: 0,
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnim2,{
      /* delay: 400, */
      toValue: 0.3,
      duration: 300,
      useNativeDriver: true,
    }).start();

  }

  const getUser = async () => {
    try {
      const docRef = doc(firestore, "users", userid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser({
          username: docSnap.data().username,
          photoUrl: chopUrl(docSnap.data().photoUrl),
          member_since: docSnap.data().member_since,
          main_counter: docSnap.data().main_counter,
          last_act_timestamp: docSnap.data().last_entry_timestamp,
          last_act_type: docSnap.data().last_entry_type,
          joint_counter: docSnap.data().joint_counter,
          bong_counter: docSnap.data().bong_counter,
          vape_counter: docSnap.data().vape_counter,
          pipe_counter: docSnap.data().pipe_counter,
          cookie_counter: docSnap.data().cookie_counter,
          best: getSortedCounters([
            { type: "Joint", counter: docSnap.data().joint_counter },
            { type: "Bong", counter: docSnap.data().bong_counter },
            { type: "Vape", counter: docSnap.data().vape_counter },
            { type: "Pfeife", counter: docSnap.data().pipe_counter },
            { type: "Edible", counter: docSnap.data().cookie_counter },
          ])
        });
          setLoading(false);
          slideCounters();
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  const slide = () => {
    Animated.timing(pan, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();
    toggleNavbar(0);
  };

  // Call back function when back button is pressed
  const backActionHandler = () => {
    hide();
    return true;
  };

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);

  const hide = () => {
    Animated.timing(pan, {
      toValue: screen_width,
      duration: 200,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) {
        onExit();
        setModalVisible(false);
      }
    });
    toggleNavbar(1);
  };

  show ? slide() : hide();

  const chopUrl = (url) => {
    var result;
    result = url.replace("s96-c", "s800-c");
    return result;
  };

  const chopTimeStamp = (timestamp) => {
    var a = new Date(timestamp);

    return (
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.date}>{a.toDateString()}</Text>
          <Text style={[styles.date]}>
            {a.toTimeString().substring(0, 5) + " Uhr"}
          </Text>
        </View>
      );
    };

  const calcLevelName = (counter) => {
      let indicator = Math.floor(counter / 70);
      return indicator > levels.length - 1
          ? levels[levels.length - 1].name
          : levels[Math.floor(counter / 70)].name;
  };

  const getGradientColors = (counter) => {
      let indicator = Math.floor(counter / 70);
      return indicator > levels.length - 1
          ? levels[levels.length - 1].colors
          : levels[Math.floor(counter / 70)].colors;
  };

  const removeFriend = async (id) => {

    try {
      const docRef = doc(firestore, "users", realuser.id);
      const docSnap = await getDoc(docRef);

      var buffer;
      if (docSnap.exists()) {
        buffer = docSnap.data().friends;
      }

      updateDoc(docRef, {
        friends: buffer.filter((item) => item != id),
      });
    } catch (e) {
      console.log("Error", e);
    }

    try {
      const docRef = doc(firestore, "users", id);
      const docSnap = await getDoc(docRef);

      var buffer;
      if (docSnap.exists()) {
        buffer = docSnap.data().friends;
      }

      updateDoc(docRef, {
        friends: buffer.filter((item) => item != realuser.id),
      });
    } catch (e) {
      console.log("Error", e);
    }
    setModalVisible(false);
    refresh();
  };

  const getSortedCounters = (array) => {
    array.sort((a, b) => {
      return b.counter - a.counter;
    });
    return array[0];
  }

  const getTitle = () => {
    return user.best.type + "-" + calcLevelName(user.best.counter);
  };


  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };


  //PanResponder test -> so funktionierts endlich, so ein dreck ehrlich
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (event, gesture) => {
      if (gesture?.moveX > gesture?.moveY) {
        return false;
      }
      return true;
    },
    onPanResponderMove: (event, gesture) => {
      gesture.dx > 0 ? pan.setValue(gesture.dx) : null;
    },
    onPanResponderRelease: (event, gesture) =>  {
      if (gesture.dx > screen_width / 10 || gesture.vx > 1) {
        hide()} else{slide();}
    }
 });


  return (
    <>
      {user ? (
        
        <Animated.View
        {...panResponder.panHandlers}
          style={[styles.container, { transform: [{ translateX: pan }], height: Dimensions.get("screen").height }]}
        >

      <Modal animationType="fade" visible={showProfilePicture}>
        <ProfileImagePanel url={user.photoUrl} onExit={() => setShowProfilePicture(false)}/>
      </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View style={styles.modal_container}>
                <>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    {LanguageContext.language_short == "de" ? <Text style={styles.heading}>
                      {user.username} {language.remove_friend}
                    </Text> : <Text style={styles.heading}>
                    {language.remove_friend} {user.username} ?         
                    </Text>}
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(
                          "rgba(255,255,255,0.05)",
                          true
                        )}
                        onPress={() => setModalVisible(false)}
                      >
                        <View style={styles.touchable}>
                          <Antdesign
                            name="close"
                            style={[styles.icon, { color: "#eb4034" }]}
                          />
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(
                          "rgba(255,255,255,0.05)",
                          true
                        )}
                        onPress={() => {
                          removeFriend(userid);
                          hide();
                        }}
                      >
                        <View style={styles.touchable}>
                          <Antdesign
                            name="check"
                            style={[styles.icon, { color: "#3BA426" }]}
                          />
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  </View>
                </>
              </View>
            </View>
          </Modal>

         { //hier beginnt Sichtbarer Komponent
         }

          <View style={{height: 50}}></View>

          <View style={{flexDirection: "column", flex: 1}}>

          <View
            style={{
              zIndex: 6,
              marginTop: 0,
              position: "relative",
              width: "100%",
              justifyContent: "center",
              flex: 2
            }}
          >
            <View style={{position: "absolute", zIndex: 20, left: 15, top: responsiveHeight(1)}}>
              <BackButton onPress={() => {onExit();setLoading(true);}} />
            </View>

            <View style={{alignSelf: "center"}}>

            <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center", zIndex: 1000}}
            >
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", true)} /* style={{overflow: "hidden"}} */ onPress={() => setShowProfilePicture(true)}>
                    <View style={styles.touchable_profileimage}>
                    </View>
                </TouchableNativeFeedback>
              <ProfileImage url={user.photoUrl} x={90} type={1} circle={true} circleColor={"#484F78"}/>
              
            </View>

              <View style={{height: responsiveHeight(1)}}></View>

              <View style={{justifyContent: "center", alignItems: "center"}}>
                <Animated.Text style={[styles.username,{opacity: opacityAnim}]}>{!loading ? user.username : " "}</Animated.Text>
                <View style={{height: responsiveHeight(0)}}></View>
                <Animated.Text style={[styles.member_since,{opacity: opacityAnim}]}>
                  {!loading ? <Text>Mitglied seit: <Text style={{color: "#0781E1"}}>{user.member_since}</Text></Text> : " "}
                  
                </Animated.Text>
              </View>
            </View>
            <View style={{height: responsiveHeight(1)}}></View>
          </View>    

           
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  position: "relative",
                  flex: 2
                }}
              >
                
                {!loading ? <>
                {user.main_counter ? (
                  <Animated.View style={{height: responsiveHeight(8), opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                    <Text style={styles.value}>{user.main_counter}</Text>
                  </Animated.View>
                ) : (
                  <Text style={styles.empty_text}>
                    {"\n"}
                    Dieser Nutzer teilt seinen Gesamt-Counter momentan nicht.
                  </Text>
                )}
                <Text style={[styles.small_label]}>GESAMT</Text>
                </> : <View style={{height: responsiveHeight(7), justifyContent: "center"}}>
                        <CustomLoader x={30} color={"#0080FF"}/>
                      </View>}
              
                <View style={{ height: responsiveHeight(1.5) }}></View>

                {!loading ? 

                <Animated.View style={{width: "95%", flexDirection: "row", alignSelf: "center", height: responsiveHeight(7)}}>
                    <View style={{flex: 1, justifyContent: "center"}}>
                      <Animated.View style={{opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.small_counter}>{user.joint_counter ? user.joint_counter  : "-"}</Text>
                      </Animated.View>
                        <Text style={styles.small_label}>JOINT</Text>
                        <Animated.Image style={[styles.small_image,{opacity: opacityAnim2}]} source={require('../../../../data/img/joint.png')}/>
                    </View>
                    <View style={{flex: 1, justifyContent: "center"}}>
                     <Animated.View style={{opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.small_counter}>{user.bong_counter ? user.bong_counter  : "-"}</Text>
                      </Animated.View>
                        <Text style={styles.small_label}>BONG</Text>
                        <Animated.Image style={[styles.small_image,{height: responsiveHeight(8), width: responsiveHeight(5), marginTop: responsiveHeight(-1), opacity: opacityAnim2}]} source={require('../../../../data/img/bong.png')}/>
                    </View>
                    <View style={{flex: 1, justifyContent: "center"}}>
                      <Animated.View style={{opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.small_counter}>{user.vape_counter ? user.vape_counter  : "-"}</Text>
                      </Animated.View>
                        <Text style={styles.small_label}>VAPE</Text>
                        <Animated.Image style={[styles.small_image,{height: responsiveHeight(9), width: responsiveWidth(7), marginTop: responsiveHeight(-1), opacity: opacityAnim2}]} source={require('../../../../data/img/vape.png')}/>
                    </View>
                    <View style={{flex: 1, justifyContent: "center"}}>
                     <Animated.View style={{opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.small_counter}>{user.pipe_counter ? user.pipe_counter  : "-"}</Text>
                      </Animated.View>
                        <Text style={styles.small_label}>PFEIFE</Text>
                        <Animated.Image style={[styles.small_image,{height: responsiveHeight(9), width: responsiveWidth(10), marginTop: responsiveHeight(0), opacity: opacityAnim2}]} source={require('../../../../data/img/pipe.png')}/>
                    </View>
                    <View style={{flex: 1, justifyContent: "center"}}>
                      <Animated.View style={{opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.small_counter}>{user.cookie_counter ? user.cookie_counter : "-"}</Text>
                      </Animated.View>
                        <Text style={styles.small_label}>EDIBLE</Text>
                        <Animated.Image style={[styles.small_image,{height: responsiveHeight(7), width: responsiveWidth(13), marginTop: responsiveHeight(1), opacity: opacityAnim2}]} source={require('../../../../data/img/cookie.png')}/>
                    </View>
                </Animated.View>
                  : 
                <View style={{height: 60, justifyContent: "center"}}>
                  <CustomLoader x={30} color={"#0080FF"}/>
                </View>}

                <View style={{ height: 40 }}></View>
              </View>

                  
              {/* <View style={{position: "relative", width: "100%", alignSelf: "center", backgroundColor: "#131520", flex: 3}}>
                <View style={{ height: 10 }}></View>
                <Text style={styles.label}>BESTLEISTUNG</Text>
                <View style={{ height: 10 }}></View>
                {!loading ? 

                <Best colors={getGradientColors(user.best.counter)} level_index={Math.floor(user.best.counter / 70)} title={getTitle()}/>

                : 
                <View style={{height: 80, justifyContent: "center"}}>
                  <CustomLoader x={30} color={"#0080FF"}/>
                </View>}
              </View> */}

              

              <View style={{position: "relative", width: "100%", alignSelf: "center", flex: 4}}>
                <View style={{ height: 10 }}></View>
                <Text style={styles.label}>LETZTE AKTIVITÄT</Text>
                <View style={{ height: 10 }}></View>
                <View style={styles.activity_container}>
                  {user.last_act_timestamp != null &&
                  user.last_act_type != null ? (
                    <>
                      <View
                        style={{
                          flex: 2,
                          alignItems: "center",
                          alignContent: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Text style={styles.date}>
                          {chopTimeStamp(user.last_act_timestamp)}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        {user.last_act_type == "joint" ? (
                          <Image
                            style={styles.type_image_joint}
                            source={require("../../../../data/img/joint.png")}
                          />
                        ) : null}
                        {user.last_act_type == "bong" ? (
                          <Image
                            style={styles.type_image_bong}
                            source={require("../../../../data/img/bong.png")}
                          />
                        ) : null}
                        {user.last_act_type == "vape" ? (
                          <Image
                            style={styles.type_image_vape}
                            source={require("../../../../data/img/vape.png")}
                          />
                        ) : null}
                        {user.last_act_type == "pipe" ? (
                          <Image
                            style={styles.type_image_pipe}
                            source={require("../../../../data/img/pipe.png")}
                          />
                        ) : null}
                        {user.last_act_type == "cookie" ? (
                          <Image
                            style={styles.type_image_cookie}
                            source={require("../../../../data/img/cookie.png")}
                          />
                        ) : null}
                      </View>
                    </>
                  ) : (
                    <Text style={styles.empty_text}>
                      Dieser User teilt seine letzte Aktivität momentan nicht.
                    </Text>
                  )}
                </View>
              </View>

              
            
              <View style={{position: "relative", width: "100%", flex: 1, marginBottom: 20}}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    "rgba(255,255,255,0.05)",
                    false
                  )}
                  onPress={() => setModalVisible(true)}
                >
                  <View style={styles.touchable_delete}>
                    <Text style={styles.delete_text}>Als Freund entfernen</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>{/* */}
          </View>
        </Animated.View>
        
      ) : null}
    </>
  );
};

export default FriendPage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#1E2132",
    zIndex: 5,
    position: "absolute",
    flexDirection: "column",
    borderRadius: 30,
    borderLeftWidth: 1,
    borderLeftColor: "#131520"
  },
  image: {
    width: "100%",
    position: "absolute",
    zIndex: 4,
  },
  username: {
    color: "white",
    fontSize: responsiveFontSize(3),
    fontFamily: "PoppinsBlack"
  },
  member_since: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(-1)
  },
  label: {
    color: "rgba(255,255,255,0.75)",
    fontSize: responsiveFontSize(1.3),
    fontFamily: "PoppinsLight",
    letterSpacing: 3,
    textAlignVertical: "center",
    textAlign: "center"
  },
  value: {
    color: "white",
    fontSize: responsiveFontSize(6),
    fontFamily: "PoppinsBlack",
    textAlignVertical: "center",
    textAlign: "center",
    height: "100%"
  },
  date: {
    color: "white",
    fontSize: responsiveFontSize(1.75),
    fontFamily: "PoppinsLight",
    textAlignVertical: "center",
    textAlign: "left",
  },
  type_image_joint: {
    width: responsiveFontSize(2),
    height: responsiveHeight(6),
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
  },
  type_image_bong: {
    width: responsiveWidth(7),
    height: responsiveHeight(6),
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "center",
  },
  type_image_vape: {
    width: responsiveWidth(7),
    height: responsiveHeight(6),
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "center",
  },
  type_image_pipe: {
    width: responsiveWidth(7),
    height: responsiveHeight(7),
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "center",
  },
  type_image_cookie: {
    width: responsiveWidth(12),
    height: responsiveHeight(6),
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "center",
  },
  touchable_delete: {
    width: "100%",
    alignSelf: "center",
    height: 60,
    borderRadius: 100,
  },
  delete_text: {
    color: "#eb4034",
    fontFamily: "PoppinsLight",
    alignSelf: "center",
    textAlignVertical: "center",
    height: "100%",
  },
  modal_container: {
    backgroundColor: "#1E2132",
    width: "90%",
    height: 300,
    alignSelf: "center",
    borderRadius: 25,
    flexDirection: "column",
  },
  heading: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsBlack",
    fontSize: 22,
    maxWidth: 300,
    alignSelf: "center",
  },
  touchable: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 40,
  },
  info_icon: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
  },
  activity_container: {
    backgroundColor: "#131520",
    borderRadius: 10,
    flexDirection: "row",
    width: "70%",
    alignSelf: "center",
    justifyContent: "center"
  },
  small_counter: {
    zIndex: 2,
    color: "white",
    fontSize: responsiveFontSize(4),
    fontFamily: "PoppinsMedium",
    textAlign: "center",
    marginTop: 5,
    opacity: 1
  },
  small_image: {
      height: responsiveHeight(8),
      width: responsiveHeight(2),
      position: "absolute",
      zIndex: -1,
      opacity: 0.2,
      alignSelf: "center",
      marginTop: responsiveHeight(-1)
  },
  small_label: {
    textAlign: "center",
    zIndex: 1,
    color: "rgba(255,255,255,1)",
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(1.4),
    marginTop: responsiveHeight(-1.5)
  },
  empty_text: {
    textAlign: "center",
    color: "#eb4034",
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(1.5),
    margin: 20
  },
  touchable_profileimage: {
    zIndex: 1,
    position: "absolute",
    height: 70,
    width: 70,
    borderRadius: 100
  }
});
