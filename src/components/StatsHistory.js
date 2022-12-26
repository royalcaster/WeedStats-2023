import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  Pressable,
  ScrollView,
  Animated,
  Easing,
  Modal
} from "react-native";

import uuid from 'react-native-uuid'

import CustomMarker from "./CustomMarker";

import MapView, {
  PROVIDER_GOOGLE,
  UrlTile,
  Marker,
  MarkerAnimated,
  Callout,
  Heatmap,
} from "react-native-maps";

import HistoryItem from "./HistoryItem";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import IconButton from "./IconButton";
import Button from "./Button";

const StatsHistory = ({ user, history }) => {
  const [loaded] = useFonts({
    PoppinsBlack: require("./fonts/Poppins-Black.ttf"),
    PoppinsLight: require("./fonts/Poppins-Light.ttf"),
  });

  const [showMap, setShowMap] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [mapType, setMapType] = useState("standard");

  const switch_icon = <AntDesign name={"picture"} style={{fontSize: 20, color: "white"}}/>

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start();
  }, []);

  // TODO: Weiterleiten auf Maps-Seite und Zoom auf Koordinaten des Eintrags (+ Marker setzen)
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
                        username={user.uername}
                        type={activeEvent.type}
                        timestamp={activeEvent.timestamp}
                      />
                    </Marker>
                </>

            </MapView>
        </Modal>
      : null}

      <FlatList
        data={history.slice().reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.number}
      />
    </>
  );
};

export default StatsHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2132",
    width: "100%",
  },
  heading: {
    fontFamily: "PoppinsBlack",
    color: "white",
    fontSize: 18,
  },
  heading: {
    fontFamily: "PoppinsBlack",
    color: "#c4c4c4",
    fontSize: 20,
    marginLeft: 10,
  },
  map: {
    height: "100%",
    width: "100%",
    zIndex: 10
  }
});


const mapStyle = [
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];
