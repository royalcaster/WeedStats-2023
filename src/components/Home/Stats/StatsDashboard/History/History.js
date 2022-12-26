//React
import React, { useEffect, useRef, useState, useContext } from "react";
import { Animated, Easing, View, StyleSheet, Dimensions, Modal, FlatList, Text, Vibration } from "react-native";
import { useBackHandler } from "@react-native-community/hooks";

//Custom Components
import HistoryItem from './HistoryItem/HistoryItem'
import IconButton from '../../../../common/IconButton'
import Button from '../../../../common/Button'
import CustomMarker from "../../../../common/CustomMarker";
import BackButton from "../../../../common/BackButton";

//Third Party
import AntDesign from 'react-native-vector-icons/AntDesign'
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import uuid from 'react-native-uuid'

//Konstanten
import { mapStyle } from "../../../../../data/CustomMapStyle";

//Service
import { LanguageContext } from "../../../../../data/LanguageContext";
import { UserContext } from "../../../../../data/UserContext";

const History = ({ show, onExit, history}) => {
    
  const language = useContext(LanguageContext);

  const user = useContext(UserContext);

  const screen_width = Dimensions.get("screen").width;
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [mapType, setMapType] = useState("standard");
  const switch_icon = <AntDesign name={"picture"} style={{fontSize: 20, color: "white"}}/>

  const pan = useRef(new Animated.Value(screen_width * (-1))).current;

  useBackHandler(() => {
    hide();
    return true;
  });

  const slide = () => {
    Vibration.vibrate(25);
    Animated.timing(pan, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    Animated.timing(pan, {
      toValue: screen_width * (-1),
      duration: 300,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) {
        onExit();
        setModalVisible(false);
      }
    });
  };

  show ? slide() : hide();

  const showOnMap = (entry) => {
    setActiveEvent(entry);
    setShowMap(true);
  };

  const renderItem = ({ item }) => (
    <HistoryItem event={item} showOnMap={showOnMap} />
  );

  const toggleMapType = () => {
    mapType == "standard" ? setMapType("hybrid") : setMapType("standard");
  }

  return (
    <>
        <Animated.View style={[styles.container, { transform: [{ translateX: pan }], height: Dimensions.get("window").height }]}>

          <View style={{height: 50}}></View>

          <View style={{flexDirection: "column", flex: 1}}>  

          {showMap ?
        <Modal style={{height: 300, backgroundColor: "green"}}>

              <View style={{position: "absolute", zIndex: 20, bottom: 70, width: "60%", alignSelf: "center"}}>
                <View style={{alignSelf: "center"}}>
                  <IconButton icon={switch_icon} onPress={toggleMapType}/>
                </View>
                <View style={{height: 20}}></View>
                <Button title={"Schließen"} color={"#eb4034"} borderradius={100} onPress={() => {setShowMap(false); setActiveEvent(null)}} fontColor={"white"}/>
              </View>

        <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                longitude: activeEvent.longitude,
                latitude: activeEvent.latitude,
                longitudeDelta: 0.25,
                latitudeDelta: 0.25
              }}
              style={styles.map}
              customMapStyle={mapStyle}
              showsUserLocation={true}
              followsUserLocation={true}
              showsCompass={false}
              showsTraffic={false}
              showsIndoors={true}
              mapType={mapType}
              pitchEnabled={true}
              showsMyLocationButton={false}
            >
                <>
                    <Marker
                      tracksViewChanges={false}
                      key={uuid.v4()}
                      coordinate={{
                        latitude: activeEvent.latitude,
                        longitude: activeEvent.longitude,
                      }}
                    >
                      <CustomMarker
                        photoUrl={user.photoUrl}
                        type={activeEvent.type}
                      />
                    </Marker>
                </>

            </MapView>
        </Modal>
      : null}

      <View style={{height: 60, alignItems: "center", flexDirection: "row"}}>
          <View style={{position: "absolute", zIndex: 2000, left: 15, top: responsiveHeight(0.2)}}>
              <BackButton onPress={() => {hide()}} />
          </View>
          <Text style={[styles.heading]}>{language.stats_history}</Text>
      </View>

      <FlatList
        data={history.slice().reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.number}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
      />
            
          </View>
        </Animated.View>
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#1E2132",
    zIndex: 5,
    position: "absolute",
    flexDirection: "column"
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
    fontSize: responsiveFontSize(5),
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
    height: responsiveHeight(8),
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
  },
  type_image_bong: {
    width: 40,
    height: 70,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "center",
  },
  type_image_vape: {
    width: 30,
    height: 90,
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
    fontFamily: "PoppinsMedium",
    fontSize: responsiveFontSize(2.3),
    alignSelf: "center",
    marginLeft: 70
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
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  small_counter: {
    zIndex: 2,
    color: "white",
    fontSize: responsiveFontSize(3),
    fontFamily: "PoppinsBlack",
    textAlign: "center",
    marginTop: 5,
    opacity: 1
  },
  small_image: {
      height: responsiveHeight(10),
      width: responsiveHeight(3),
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
  map: {
    height: "100%",
    width: "100%",
    zIndex: 10
  }
});
