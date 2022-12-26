//React
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  Easing,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  BackHandler,
} from "react-native";

//Custom Components
import Empty from "../../../common/Empty";
import BackButton from "../../../common/BackButton";
import RequestItem from "./RequestItem/RequestItem";
import CustomLoader from "../../../common/CustomLoader";

//Third Party
import uuid from "react-native-uuid";
import Antdesign from "react-native-vector-icons/AntDesign";

//Firebase
import {
  doc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import { firestore } from "../../../../data/FirebaseConfig";

//Service
import { UserContext } from "../../../../data/UserContext";
import { LanguageContext } from "../../../../data/LanguageContext";

const FriendRequests = ({ onExit, refresh }) => {

  const user = useContext(UserContext);
  const language = useContext(LanguageContext);

  const screen_height = Dimensions.get("screen").height;
  const [modalVisible, setModalVisible] = useState(false);
  const [activeRequested, setActiveRequested] = useState(null);
  const [alreadySent, setAlreadySent] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const slideAnim = useRef(new Animated.Value(screen_height)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();
    loadRequests();
  }, []);

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
    Animated.timing(slideAnim, {
      toValue: screen_height,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        onExit();
      }
    });
  };

  const loadRequests = async () => {
    var resultBuffer = [];

    try {
      const docRef = doc(firestore, "users", user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resultBuffer = docSnap.data().requests;
      }
    } catch (e) {
      console.log("Error", e);
    }
    setResults(resultBuffer);
    setLoading(false);
  };

  const makeFriendRequest = async (id) => {
    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);

    var requested;
    if (docSnap.exists()) {
      requested = {
        id: docSnap.data().id,
        requests: docSnap.data().requests,
      };
    }

    if (requested.requests.includes(user.id)) {
      console.log("Anfrage bereits gesendet!");
      setAlreadySent(true);
    } else {
      try {
        const docRef = doc(firestore, "users", requested.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          var buffer = docSnap.data().requests;
          updateDoc(docRef, {
            requests: buffer.concat(user.id),
          });
        }
      } catch (e) {
        console.log("Error:", e);
      }
    }
    setModalVisible(false);
  };

  const acceptFriend = async (id) => {
    setLoading(true);

    const docRef = doc(firestore, "users", user.id);
    const docRef2 = doc(firestore, "users", id);

    var buffer = results.filter((item) => item != id);
    updateDoc(docRef, {
      requests: buffer,
    });
    console.log(buffer);

    var friends_buffer;
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      friends_buffer = docSnap.data().friends;
    }

    friends_buffer.push(id);

    updateDoc(docRef, {
      friends: friends_buffer,
    });

    const docSnap2 = await getDoc(docRef2);
    if (docSnap2.exists()) {
      friends_buffer = docSnap2.data().friends;
    }

    friends_buffer.push(user.id);

    updateDoc(docRef2, {
      friends: friends_buffer,
    });

    loadRequests();
    refresh();
    setLoading(false);
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      <View style={{ height: 50 }}></View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
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
            {!alreadySent ? (
              <>
                <View style={{ flex: 1, justifyContent: "center" }}>

                    {language.language_short == "de" ? 
                    <Text style={styles.heading}>
                      <Text>{activeRequested ? activeRequested.username : null}</Text>{language.send_request}
                    </Text> 
                    : 
                    <Text style={styles.heading}>
                      {language.send_request}
                    <Text>{activeRequested ? activeRequested.username : null}</Text> ?</Text>}

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
                      onPress={() => makeFriendRequest(activeRequested.id)}
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
            ) : (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Antdesign style={styles.info_icon} name="exclamationcircleo" />
                <View style={{ height: 30 }}></View>
                  {language.language_short == "de" ? 
                  <Text style={styles.heading}>
                    <Text>{activeRequested ? activeRequested.username : null}</Text>{language.already_sent}
                  </Text>
                  :
                  <Text style={styles.heading}>
                    {language.already_sent}<Text>{activeRequested ? activeRequested.username : null}</Text>
                  </Text>}
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
              </View>
            )}
          </View>
        </View>
      </Modal>

      <View
        style={{ width: "100%", flexDirection: "row"}}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <BackButton onPress={() => hide()} />
        </View>
        <View style={{ flex: 5, justifyContent: "center"}}>
          <Text style={styles.heading}>{language.friendrequests_title}</Text>
        </View>
      </View>

        {loading ? (
          <View style={{height: "100%", justifyContent: "center"}}>
            <CustomLoader x={50} color={"#484F78"}/>
          </View>
        ) : (
          <>
            {results ? (
              <ScrollView style={{ width: "100%", flex: 1, alignSelf: "center", marginTop: 20 }}>
                {results.length != 0 ? (
                  results.map((result) => {
                    return (
                      <RequestItem
                        key={uuid.v4()}
                        userid={result}
                        onAccept={() => acceptFriend(result)}
                      />
                    );
                  })
                ) : 
                <View style={{height: "100%", width: "100%", justifyContent: "center"}}>
                <Empty title={"test"} tip={"test"}/>
                </View>}
              </ScrollView>
            ) : 
            <View style={{flex: 1}}><Empty title={"Du hast noch keine Anfragen."} tip={"Das wird schon noch!"}/></View>}
          </>
        )}

    </Animated.View>
  );
};

export default FriendRequests;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#131520",
    zIndex: 10,
    position: "absolute",
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
    fontFamily: "PoppinsMedium",
    fontSize: 20,
    textAlign: "left",
    marginLeft: 10,
    marginTop: 5
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
  info_icon: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
  },
  empty: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "center",
    fontFamily: "PoppinsLight",
    fontSize: 12,
  },
});
