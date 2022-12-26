//React
import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Animated, Easing, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../../data/UserContext";

//Custom Components
import CounterItem from "./CounterItem/CounterItem";
import Tutorial from '../../common/Tutorial';
import CustomLoader from "../../common/CustomLoader";
import Empty from "../../common/Empty";

//Tools
import moment from "moment";
import { LanguageContext } from "../../../data/LanguageContext";
import { ConfigContext } from '../../../data/ConfigContext'
import { responsiveFontSize } from "react-native-responsive-dimensions";

const Main = ({ toggleCounter, toggleBorderColor }) => {

  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  const config = useContext(ConfigContext);

  const headingAnim = useRef(new Animated.Value(-100)).current;
  const leftAnim = useRef(new Animated.Value(-70)).current;
  const rightAnim = useRef(new Animated.Value(70)).current;

  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);

  const [countdown, setCountDown] = useState(0);
  const [counterOrder, setCounterOrder] = useState([
    { type: "joint", counter: user.joint_counter },
    { type: "bong", counter: user.bong_counter },
    { type: "vape", counter: user.vape_counter },
    { type: "pipe", counter: user.pipe_counter },
    { type: "cookie", counter: user.cookie_counter },
  ]);

  useEffect(() => {
    Animated.timing(headingAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start();

    Animated.timing(leftAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start();

    Animated.timing(rightAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start();

    calcDaysTill420();
    sortCounterOrder();
  }, []);

  const sortCounterOrder = () => {

    let settings = [];
    !config.showJoint ? settings.push("joint") : null;
    !config.showBong ? settings.push("bong") : null;
    !config.showVape ? settings.push("vape") : null;
    !config.showPipe ? settings.push("pipe") : null;
    !config.showCookie ? settings.push("cookie") : null;

    let buffer = counterOrder.filter((item) => !settings.includes(item.type));
    setCounterOrder(buffer);
    setShowTutorial(config.showTutorial);
      
    counterOrder.sort((a, b) => {
      return b.counter - a.counter;
    });
    setLoading(false);
  };

  const calcDaysTill420 = () => {
    let target = "";
    let now = new Date();
    let ft_current_year = new Date(now.getFullYear(), 3, 20, 0, 0);

    if (now.getTime() < ft_current_year.getTime()) {
      let a = moment(now);
      let b = moment(ft_current_year);
      target = b.diff(a, "days");
    } else {
      let ft_next_year = new Date(
        ft_current_year.setFullYear(ft_current_year.getFullYear() + 1)
      );
      let a = moment(now);
      let b = moment(ft_next_year);
      target = b.diff(a, "days");
    }
    setCountDown(target);
  };

  const tutorialSeen = async () => {
    try {
      const jsonValue = JSON.stringify(config);
      await AsyncStorage.setItem("settings", jsonValue);
    } catch (e) {
      console.log("Error in Config beim Speichern: ", e);
    }
    setLoading(false);
    /* setSaved(true); */
  };

  const slides = [
    {
      key: 'zero',
      title: 'Willkommen',
      text: 'WeedStats bietet verschiedenste Möglichkeiten zum Erfassen, Auswerten und Teilen deines Gras-Konsums. \n\nDiese kurze Tour wird dir die wesentlichen Funktionen der App beibringen.',
      backgroundColor: '#0080FF',
    },
    {
      key: 'one',
      title: 'Counter',
      text: 'Jedes mal, wenn du etwas rauchst, solltest du den jeweiligen Counter um eins erhöhen. Halte dazu den Button für kurze Zeit gedrückt.\n\n Je nach Einstellung wird der Zeitpunkt und die aktuellen GPS-Daten gespeichert.',
      image: require('../../../data/img/screenshots/counter.png'),
      backgroundColor: '#0080FF',
    },
    {
      key: 'two',
      title: 'Stats',
      text: 'Hier findest du sowohl statistische Auswertungen und Diagramme zu deinem Konsum als auch eine Liste deiner letzten Einträge.',
      image: require('../../../data/img/screenshots/stats.png'),
      backgroundColor: '#0080FF',
    },
    {
      key: 'three',
      title: 'Map',
      text: 'Die Karte kann dir entweder eine Heatmap mit den Orten zeigen, an denen du am häufigsten geraucht hast, oder auch die letzten Einträge deiner Freunde.',
      image: require('../../../data/img/screenshots/map.png'),
      backgroundColor: '#0080FF',
    },
    {
      key: 'four',
      title: 'Einstellungen',
      text: 'Hier kannst du Einstellungen für deine Privatsphäre und die Anzeige treffen.',
      image: require('../../../data/img/screenshots/config.png'),
      backgroundColor: '#0080FF',
    },
    {
      key: 'five',
      title: 'Freunde',
      text: 'Füge Freunde hinzu, um deine Statistiken mit ihnen zu teilen und das volle Potential von WeedStats auszuschöpfen!\n\nAußerdem kannst du hier auf deinen Account zugreifen.',
      image: require('../../../data/img/screenshots/friends.png'),
      backgroundColor: '#0080FF',
    },
    {
      key: 'six',
      title: 'Unser Tipp',
      text: 'Hier eventuell Hinweis auf Intention der App, keine Anregung zu Konsum, kein Konsum bei minderjährigen! \n\nJe gewissenhafter du deinen Konsum in der App einträgst, desto genauer werden deine Statistiken mit der Zeit.\n\nWir wünschen dir viel Spaß mit WeedStats!',
      backgroundColor: '#0080FF',
    }
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={{flexDirection: "column", height: "100%"}}>
        <View style={{height: 50}}></View>
        <View style={{flex: 1}}>
          <Text style={{color: "white", fontFamily: "PoppinsBlack", fontSize: 25, textAlign: "center"}}>{item.title}</Text>
        </View>

        {item.image ? 
        <View style={{flex: 5}}>
          <Image source={item.image} style={{height: "100%", width: "55%", borderRadius: 25, alignSelf: "center"}}/>
        </View> : null}

        <View style={{flex: 4}}>
          <Text style={{color: "white", fontFamily: "PoppinsLight", fontSize: 15, marginLeft: 30, textAlign: "center", maxWidth: "80%", marginTop: 20}}>{item.text}</Text>
        </View>
        
      </View>
    );
  }

  const onDone = () => {
    setShowTutorial(false);
    tutorialSeen();
  }

  return (
    <>

        {showTutorial ? 
        <View style={{zIndex: 3000, position: "absolute", height: Dimensions.get("screen").height, width: "100%"}}>
          <Tutorial renderItem={renderItem} slides={slides} onDone={onDone} extraHeight={50}/>
        </View> : <> 

          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomLoader x={50} color={"#484F78"}/>
            </View>
          ) : (
            <>
              {counterOrder.length == 0 ? (
                <View style={{height: "90%", justifyContent: "center"}}>
                  <Empty title={"Keine Stats aktiviert"} tip={"Konfiguriere deine Ansicht in den Einstellungen."}/>
                </View>
              ) : <ScrollView style={styles.counters_container}> 

            <View style={{ height: 50 }}></View>
            <View style={{ width: "100%", flexDirection: "row"}}>
            <Animated.View
              style={{
                paddingLeft: 15,
                flex: 1,
                transform: [{ translateX: leftAnim }]
              }}
            >
              <Text
                style={{
                  color: "#737EBF",
                  fontFamily: "PoppinsLight",
                  marginBottom: -10,
                  fontSize: 12,
                }}
              >
                {language.main_all}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsBlack",
                  fontSize: 25,
                  color: "#737EBF",
                }}
              >
                {user.main_counter}
              </Text>
            </Animated.View>
            <View>
              <Animated.Text
                style={[
                  { transform: [{ translateY: headingAnim }] },
                  styles.main_heading,
                ]}
              >
                WeedStats
              </Animated.Text>
            </View>
            <Animated.View
              style={{
                paddingRight: 15,
                flex: 1,
                transform: [{ translateX: rightAnim }],
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: "#737EBF",
                  fontFamily: "PoppinsLight",
                  marginBottom: -10,
                  fontSize: 12,
                }}
              >
                {language.main_days_till_420}
              </Text>
              <Text
                style={{
                  textAlign: "right",
                  fontFamily: "PoppinsBlack",
                  fontSize: 25,
                  color: "#737EBF",
                }}
              >
                {countdown}
              </Text>
            </Animated.View>
          </View>

                {
                counterOrder.map((item) => {
                  return (
                    <CounterItem
                      key={item.type}
                      type={item.type}
                      counter={user[item.type + "_counter"]}
                      toggleCounter={toggleCounter}
                      toggleBorderColor={toggleBorderColor}
                    />
                  );
                })}
              </ScrollView>}
            </>
          )}
          </>}
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  counters_container: {
    flex: 5,
    backgroundColor: "#1E2132",
    width: "100%",
    height: "100%"
  },
  tut_img: {
    height: 200,
    width: 200,
    marginBottom: -35,
  },
  blank_text: {
    color: "#787878",
    fontSize: 15,
    alignSelf: "center",
    fontFamily: "PoppinsLight",
    marginTop: 15,
  },
  main_heading: {
    color: "white",
    fontSize: responsiveFontSize(4),
    fontFamily: "PoppinsBlack",
    position: "relative",
  },
});
