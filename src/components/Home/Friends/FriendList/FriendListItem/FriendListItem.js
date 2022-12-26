//React
import React, { useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet, Text, Easing, Image, TouchableNativeFeedback } from "react-native";

//Custom Components
import ProfileImage from "../../../../common/ProfileImage";

//Konstanten
import levels from "../../../../../data/Levels.json";

//Third Party
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

//Firebase
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../../../../data/FirebaseConfig";

const FriendListItem = ({ userid, onPress }) => {

  const [user, setUser] = useState();
  const [counters, setCounters] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slide1Anim = useRef(new Animated.Value(100)).current;
  const slide2Anim = useRef(new Animated.Value(100)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadUser();
  }, []);

  const animate = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(slide1Anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();

    Animated.timing(slide2Anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();
  };

  const loadUser = async () => {
    try {
      const docRef = doc(firestore, "users", userid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser({
          username: docSnap.data().username,
          photoUrl: docSnap.data().photoUrl,
          last_entry_timestamp: docSnap.data().last_entry_timestamp
        });
        setCounters([
          { type: "Joint", counter: docSnap.data().joint_counter },
          { type: "Bong", counter: docSnap.data().bong_counter },
          { type: "Vape", counter: docSnap.data().vape_counter },
          { type: "Pfeife", counter: docSnap.data().pipe_counter },
          { type: "Edible", counter: docSnap.data().cookie_counter },
        ]);
      }
    } catch (e) {
      console.log("Error:", e);
    }
    setIsLoading(false);
    animate();
  };

  const getTitle = () => {
    if (
      counters.forEach((entry) => {
        entry.counter == null;
      })
    ) {
      return "WeedStats-User";
    }

    counters.sort((a, b) => {
      return b.counter - a.counter;
    });
    return counters[0].type + "-" + calcLevelName(counters[0].counter);
  };

  const hover = () => {
    Animated.timing(
      scale, {
        toValue: 0.95,
        duration: 50,
        useNativeDriver: true,
      }
    ).start(({finished})=> {
      finished ? dehover() : null;
    });
  }

  const dehover = () => {
    Animated.timing(
      scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }
    ).start();
  }

  const calcLevelName = (counter) => {
    let indicator = Math.floor(counter / 70);
    return indicator > levels.length - 1
      ? levels[levels.length - 1].name
      : levels[Math.floor(counter / 70)].name;
  };

  return (
    <>
      {!isLoading ? (
        <Animated.View style={[{ opacity: opacityAnim, transform: [{scale: scale}]}, styles.container]}>
          <TouchableNativeFeedback delayPressIn={50} background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.15)", false)} onPress={() => onPress()}>
            <View style={styles.touchable}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 20 }}></View>
                <Animated.View
                  style={{ transform: [{ translateY: slide1Anim}], zIndex: 2}}
                >
                  <ProfileImage x={35} type={1} url={user.photoUrl} />
                </Animated.View>
                <View style={{ width: responsiveWidth(3) }}></View>
                <Animated.View
                  style={{
                    flexDirection: "row",
                    transform: [{ translateY: slide2Anim}],
                    zIndex: 1,
                  }}
                >
                  <Text style={styles.username}>{user.username}</Text>
                </Animated.View>
              </View>
            </View>
            </TouchableNativeFeedback>
        </Animated.View>
      ) : null}
    </>
  );
};

export default FriendListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  username: {
    color: "rgba(255,255,255,1)",
    fontFamily: "PoppinsMedium",
    fontSize: responsiveFontSize(1.8),
  },
  touchable: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 15
  },
  lvl_image: {
    height: 25,
    width: 25, 
    marginTop: -4,
    marginRight: 2,
    marginLeft: -5,
    opacity: 0.85
  },
  lates_label: {
    color: "white"
  }
});
