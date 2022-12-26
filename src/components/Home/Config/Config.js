//React
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Dimensions,
  View,
  LogBox,
  StyleSheet,
  Text,
  Animated,
  ScrollView,
  Modal,
  Vibration
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Custom Components
import Button from "../../common/Button";
import ConfigItem from "./ConfigItem/ConfigItem";
import CustomLoader from "../../common/CustomLoader";
import ConfigToggle from "./ConfigToggle/ConfigToggle";

//Thirt Party
import Toggle from "react-native-toggle-element";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth
} from "react-native-responsive-dimensions";
import LanguageSelector from "./LanguageSelector/LanguageSelector";

//Service
import { LanguageContext } from "../../../data/LanguageContext";
import { useBackHandler } from "@react-native-community/hooks";
import { ConfigContext } from "../../../data/ConfigContext";

const Config = ({ toggleLanguage, loadSettings }) => {

  const language = useContext(LanguageContext);
  const config = useContext(ConfigContext);

  const [localConfig, setLocalConfig] = useState(config);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(true);
  const [lightmode, setLightMode] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    LogBox.ignoreAllLogs();
    config != null ? setLoading(false) : null;
  }, []);

  const vibrate = (ms) => {
    Vibration.vibrate(ms);
  }

  useBackHandler(() => {
    return true;
  });

  const storeSettings = async () => {
    try {
      const jsonValue = JSON.stringify(localConfig);
      await AsyncStorage.setItem("settings", jsonValue);
      toggleLanguage(localConfig.language);
    } catch (e) {
      console.log("Error in Config beim Speichern: ", e);
    }
    loadSettings();
    setLoading(false);
    setSaved(true);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLanguageSwitch = (lang) => {
    setLocalConfig({...localConfig, language: lang});
  }

  return (
    <>
      <Animated.View style={[{ opacity: fadeAnim }, styles.container]}>
        <Modal animationType="fade" transparent={true} visible={lightmode}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              flex: 1,
              height: Dimensions.get("screen").height,
              top: 0,
              zIndex: 1000
            }}
          >
            <View style={{flex:1, justifyContent: "flex-start"}}></View>
            <View
              style={{
                width: "90%",
                backgroundColor: "#1E2132",
                alignSelf: "center",
                borderRadius: 25,
                height: "50%"
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
                    },
                  ]}
                >
                  {language.config_modal_title}
                </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={[styles.text, { fontSize: responsiveFontSize(1.8) }]}>
                  {language.config_modal_text}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title={language.config_modal_thanks}
                  color={"#484F78"}
                  borderradius={25}
                  fontColor={"white"}
                  onPress={() => setLightMode(false)}
                  hovercolor={"rgba(255,255,255,0.3)"}
                />
              </View>
            </View>
            <View style={{flex:1, justifyContent: "flex-end"}}></View>
          </View>
        </Modal>

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
          >
            <CustomLoader x={50} color={"#0080FF"}/>
          </View>
        ) : (
          <View style={{height: "100%", position: "absolute", width: "100%"}}>
          <ScrollView style={{ width: "100%"}}>
            <View style={{height: responsiveHeight(7)}}></View>

            <Text style={styles.bold_heading}>Settings</Text>
            <Text style={styles.heading}>{language.config_counter}</Text>

            <View style={{ flexDirection: "row", width: "90%", alignSelf: "center"}}>
              <ConfigItem
                type="joint"
                config={localConfig.showJoint}
                onToggle={() => {
                  setLocalConfig({ ...localConfig, showJoint: !localConfig.showJoint });
                  vibrate(25);
                  setSaved(false);
                }}
              ></ConfigItem>
              <ConfigItem
                type="bong"
                config={localConfig.showBong}
                onToggle={() => {
                  setLocalConfig({ ...localConfig, showBong: !localConfig.showBong });
                  vibrate(25);
                  setSaved(false);
                }}
              ></ConfigItem>
              <ConfigItem
                type="vape"
                config={localConfig.showVape}
                onToggle={() => {
                  setLocalConfig({ ...localConfig, showVape: !localConfig.showVape });
                  vibrate(25);
                  setSaved(false);
                }}
              ></ConfigItem>
              <ConfigItem
                type="pipe"
                config={localConfig.showPipe}
                onToggle={() => {
                  setLocalConfig({ ...localConfig, showPipe: !localConfig.showPipe });
                  vibrate(25);
                  setSaved(false);
                }}
              ></ConfigItem>
              <ConfigItem
                type="cookie"
                config={localConfig.showCookie}
                onToggle={() => {
                  setLocalConfig({ ...localConfig, showCookie: !localConfig.showCookie });
                  vibrate(25);
                  setSaved(false);
                }}
              ></ConfigItem>
            </View>

            <Text style={styles.heading}>{language.config_personal_data}</Text>
            <View style={{ height: 5 }}></View>

            <ConfigToggle
              value={localConfig.shareMainCounter}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareMainCounter: !localConfig.shareMainCounter,
                });
                vibrate(25);
                setSaved(false);
              }}
              disabled={false}
              label={language.config_share_main_counter}
            />

            <ConfigToggle
              label={language.config_share_detail_counter}
              disabled={!localConfig.shareMainCounter}
              value={localConfig.shareTypeCounters}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareTypeCounters: !localConfig.shareTypeCounters,
                });
                vibrate(25);
                setSaved(false);
              }}
            />

            <ConfigToggle
              label={language.config_share_last_activity}
              value={localConfig.shareLastEntry}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareLastEntry: !localConfig.shareLastEntry,
                });
                vibrate(25);
                setSaved(false);
              }}
            />

            <ConfigToggle
              label={language.config_get_location}
              value={localConfig.saveGPS}
              onPress={() => {
                setLocalConfig({ ...localConfig, saveGPS: !localConfig.saveGPS });
                vibrate(25);
                setSaved(false);
              }}
            />

            <ConfigToggle
              label={language.config_share_location}
              disabled={!localConfig.saveGPS}
              value={localConfig.shareGPS}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareGPS: !localConfig.shareGPS,
                });
                vibrate(25);
                setSaved(false);
              }}
            />

            <View style={{ height: 30 }}></View>

            <Text style={styles.heading}>{language.config_security}</Text>
            <View style={{ height: 5 }}></View>

            <ConfigToggle
            label={language.config_unlock_on_launch}
              value={localConfig.localAuthenticationRequired}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  localAuthenticationRequired: !localConfig.localAuthenticationRequired,
                });
                vibrate(25);
                setSaved(false);
              }}
            />

            <View style={{ height: 30 }}></View>

            <Text style={styles.heading}>{language.config_language}</Text>
            <View style={{ height: 5 }}></View>

            <LanguageSelector toggleLanguage={(lang) => {handleLanguageSwitch(lang); setSaved(false)}} value={localConfig.language} onVibrate={() => vibrate(25)}/>

            <View style={{ height: 30 }}></View>

            <Text style={styles.heading}>{language.config_other}</Text>
            <View style={{ height: 5 }}></View>

            <ConfigToggle
              label={language.config_lightmode}
              value={lightmode}
              onPress={(val) => {setLightMode(true); vibrate(25);}}
            />

          <View style={{ height: responsiveHeight(10) }}></View>
          </ScrollView>
          </View>
        )}

          <View style={styles.save_button_container}>
            {saved ? (
              <Button
                fontColor={"rgba(255,255,255,0.5)"}
                onPress={() => {}}
                borderradius={100}
                color={"#131520"}
                title={language.config_saved}
                hovercolor={"rgba(255,255,255,0.3)"}
              />
            ) : (
              <Button
                fontColor={"white"}
                onPress={() => {
                  vibrate(100);
                  storeSettings();
                }}
                borderradius={100}
                color={"#484F78"}
                title={language.config_save}
                hovercolor={"rgba(255,255,255,0.3)"}
              />
              
            )}
            </View>
      </Animated.View>
    </>
  );
};

export default Config;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1E2132",
    justifyContent: "center",
  },
  heading: {
    color: "white",
    fontSize: responsiveFontSize(2.3),
    fontFamily: "PoppinsMedium",
    marginLeft: 20,
  },
  label: {
    color: "rgba(255,255,255,0.75)",
    fontSize: responsiveFontSize(1.6),
    fontFamily: "PoppinsLight",
    marginLeft: 20,
  },
  text: {
    alignSelf: "center",
    fontFamily: "PoppinsLight",
    fontSize: 18,
    color: "white",
    maxWidth: 250,
    textAlign: "center",
  },
  save_button_container: {
    width: "100%",
    position: "absolute",
    bottom: 0
  },
  toggle_container: {
    flexDirection: "row",
    height: 40,
    width: "95%",
    alignContent: "center",
  },
  bold_heading: {
    color: "white",
    fontFamily: "PoppinsBlack",
    fontSize: responsiveFontSize(4),
    marginLeft: responsiveWidth(5)
  }
});
