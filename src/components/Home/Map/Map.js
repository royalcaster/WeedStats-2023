//React
import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, LogBox, Image, View, Text, ScrollView, Dimensions, TouchableOpacity, TouchableNativeFeedback, Vibration } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Custom Components
import IconButton from "../../common/IconButton";
import ProfileImage from "../../common/ProfileImage";
import CustomMarker from "../../common/CustomMarker";
import Empty from '../../common/Empty'

//Konstanten
import { mapStyle } from "../../../data/CustomMapStyle";

//Third Party
import AntDesign from "react-native-vector-icons/AntDesign";
import uuid from "react-native-uuid";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
import { Pages } from "react-native-pages";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//Firebase
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../../data/FirebaseConfig";

//Service
import { UserContext } from "../../../data/UserContext";
import { LanguageContext } from "../../../data/LanguageContext";
import { FriendListContext } from "../../../data/FriendListContext";
import { getLocalData } from "../../../data/Service";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

const Map = ({ getFriendList }) => {
  LogBox.ignoreAllLogs();

  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  const friendList = useContext(FriendListContext);

  const windowHeight = Dimensions.get("window").height;
  const [view, setView] = useState("friends");
  const [localData, setLocalData] = useState([]);
  const [localDataLoaded, setLocalDataLoaded] = useState(false);
  const carouselRef = React.useRef(null);
  const [mapType, setMapType] = useState("standard");
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const camref = useRef(null);

  const switch_icon = <AntDesign name={"picture"} style={{fontSize: 20, color: "white"}}/>
  const friends_icon = <MaterialIcons name="groups" style={{fontSize: 20, color: "white"}}/>
  const map_icon = <MaterialCommunityIcons name="map-marker-radius-outline" style={{fontSize: 20, color: "white"}}/>

  useEffect( async () => {
    getFriendList();
    loadData(); //Freunde + deren letzte Einträge
    setLocalData(filterNull(await getLocalData(user, () => null))); //Einträge des Users für Heatmap
    
  }, []);

  useEffect(() => {
    if (localData != null) {
      setLocalDataLoaded(true);
    }
  },[localData]);

  useEffect(() => {
    /* if (view == "heatmap" && localData.length != 0) {
      setRegion({
        latitude: localData[0].latitude,
        longitude: localData[0].longitude,
        latitudeDelta: 4,
        longitudeDelta: 4
      });
    }

    if (view == "friends" && markers.length != 0) {
      setRegion({
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
        latitudeDelta: 2,
        longitudeDelta: 2
      });
    } */
  },[view]);

  const loadData = async () => {
    try {
      const docRef = doc(firestore, "users", user.id);
      const docSnap = await getDoc(docRef);

      var friends;
      if (docSnap.exists()) {
        friends = docSnap.data().friends;
      }
      
      var buffer = [];
      friendList.forEach(async (friend) => {
        const docRef = doc(firestore, "users", friend);
        const friendSnap = await getDoc(docRef);

        if (
         
          docSnap.exists() &&
          friendSnap.data().last_entry_latitude != null &&
          friendSnap.data().last_entry_longitude != null
        ) {
          buffer.push({
            latitude: friendSnap.data().last_entry_latitude,
            longitude: friendSnap.data().last_entry_longitude,
            timestamp: friendSnap.data().last_entry_timestamp,
            type: friendSnap.data().last_entry_type,
            photoUrl: friendSnap.data().photoUrl,
            username: friendSnap.data().username,
          });
          buffer.length == 1 ? setRegion({
            latitude: friendSnap.data().last_entry_latitude,
            longitude: friendSnap.data().last_entry_longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }) : null;
          
        }
      });
      
      setMarkers(buffer);
      setLoading(false);
    } catch (e) {
      console.log("Load Data Error:", e);
    }
  };

  const toggleMapType = () => {
    mapType == "standard" ? setMapType("hybrid") : setMapType("standard");
    Vibration.vibrate(50);
  }

  const chopTimeStamp = (timestamp) => {
    var a = new Date(timestamp);
    return [a.toDateString(), a.toTimeString().substring(0, 5) + " Uhr"];
  };

  const filterNull = (array) => {
    return array.filter((entry) => {
      return entry.latitude != null && entry.longitude != null;
    });
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.item}
        /* onPress={() => {
                       carouselRef.current.scrollToIndex(index);
                        console.log("test");
                      }} */
      >
        <View
          style={{ flexDirection: "row", height: "100%", alignItems: "center" }}
        >
          <View style={{ flex: 1 }}>
            <ProfileImage url={item.photoUrl} x={80} type={2} />
          </View>

          <View
            style={{
              flex: 2,
              flexDirection: "column",
              paddingLeft: 15,
              height: "80%"
            }}
          >
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "PoppinsMedium",
                  height: "100%",
                  textAlignVertical: "center",
                  fontSize: responsiveFontSize(2.5)
                }}
              >
                {item.username}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "PoppinsMedium",
                  height: "100%",
                  textAlignVertical: "center",
                  fontSize: responsiveFontSize(1.4),
                }}
              >
                {chopTimeStamp(item.timestamp)[0]}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "PoppinsMedium",
                  height: "100%",
                  textAlignVertical: "center",
                  fontSize: responsiveFontSize(1.4),
                }}
              >
                {chopTimeStamp(item.timestamp)[1]}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            {item.type == "joint" ? (
              <Image
                style={{
                  position: "relative",
                  left: 0,
                  height: 65,
                  width: 20,
                  alignSelf: "center",
                }}
                source={require("../../../data/img/joint.png")}
              />
            ) : null}
            {item.type == "bong" ? (
              <Image
                style={{
                  position: "relative",
                  left: 0,
                  height: 65,
                  width: 40,
                  alignSelf: "center",
                }}
                source={require("../../../data/img/bong.png")}
              />
            ) : null}
            {item.type == "vape" ? (
              <Image
                style={{
                  position: "relative",
                  left: 0,
                  height: 65,
                  width: 40,
                  alignSelf: "center",
                }}
                source={require("../../../data/img/vape.png")}
              />
            ) : null}
            {item.type == "cookie" ? (
              <Image
                style={{
                  position: "relative",
                  left: 0,
                  height: 55,
                  width: 50,
                  alignSelf: "center",
                }}
                source={require("../../../data/img/cookie.png")}
              />
            ) : null}
            {item.type == "pipe" ? (
              <Image
                style={{
                  position: "relative",
                  left: 0,
                  height: 65,
                  width: 40,
                  alignSelf: "center",
                }}
                source={require("../../../data/img/pipe.png")}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container} scrollEnabled={false}>
      <View style={{ alignItems: "center" }}>
        <LinearGradient
          colors={mapType != "standard" ? ["#1E2132", "rgba(0,0,0,0)"] : ["rgba(0,0,0,0.85)", "rgba(0,0,0,0)"]}
          style={{
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            zIndex: 3,
            position: "absolute",
            height: 150,
            marginTop: -20,
          }}
        >
        
        </LinearGradient>

        {!loading && localDataLoaded ? (
          <>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[{ height: windowHeight }, styles.map]}
            customMapStyle={mapStyle}
            showsUserLocation={true}
            mapType={mapType}
            followsUserLocation={true}
            region={region}
            onRegionChangeComplete={(region) => setRegion(region)}
            showsCompass={false}
            showsTraffic={false}
            showsIndoors={false}
            pitchEnabled={true}
            showsMyLocationButton={false}
            ref={camref}
            loadingEnabled={true}
            loadingBackgroundColor={"#131520"}
            loadingIndicatorColor={"#484F78"}
            
          >
            {view == "heatmap" ? 
            <>
            {localData.length == 0 ? 
              null
            : 
            <Heatmap
                points={localData.map((entry) => {
                  return {
                    latitude: entry.latitude,
                    longitude: entry.longitude,
                  };
                })}
                radius={40}
              /> } 
              </> : null}

            {view == "friends" ? (
              <>
                {<>{
                markers.map((marker, index) => (
                  <Marker
                    tracksViewChanges={false}
                    key={uuid.v4()}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    onPress={() => carouselRef.current.scrollToPage(index)}
                  >
                    <CustomMarker
                      photoUrl={marker.photoUrl}
                      type={marker.type}
                    />
                  </Marker>
                ))}</>}
              </>
            ) : null}
          </MapView>

          {view == "heatmap" && localData.length == 0 ?
          <View style={{position: "absolute", backgroundColor: mapType == "standard" ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.9)", height: "100%", width: "100%"}}>
            <Empty title={"Noch keine Einträge"} tip={"Mache Eintrge, um die Heatmap zu sehen."}/>
          </View> : null}

          {view == "friends" && markers.length == 0 ?
          <View style={{position: "absolute", backgroundColor: mapType == "standard" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.9)", height: "100%", width: "100%"}}>
            <Empty title={"Noch keine Freunde"} tip={"Oder deine Freunde teilen ihre letzte Aktivität nicht."}/>
          </View> : null}

          <View style={styles.iconbutton_container}>
              <IconButton backgroundColor={"#484F78"} icon={view == "heatmap" ? friends_icon : map_icon} onPress={() => {view == "heatmap" ? setView("friends") : setView("heatmap"); Vibration.vibrate(50)}}/>
              <Text style={styles.iconbutton_label}>{view == "heatmap" ? "Freunde" : "Heatmap"}</Text>
              <View style={{height: 10}}></View>
              <IconButton backgroundColor={"#484F78"}  icon={switch_icon} onPress={toggleMapType}/>
              <Text style={styles.iconbutton_label}>{mapType == "standard" ? "Satellite" : "Standard"}</Text>
          </View>
          </>
        ) : null}


        {view == "friends" ? (
          <View style={styles.carousel}>
            <Pages
              onScrollEnd={(index) => {
                setRegion({
                  latitude: markers[index].latitude,
                  longitude: markers[index].longitude,
                  longitudeDelta: region.longitudeDelta,
                  latitudeDelta: region.latitudeDelta,
                });
              }}
              ref={carouselRef}
            >
              {markers.map((marker) => {
                return <View key={uuid.v4()}>{renderItem(marker)}</View>;
              })}
            </Pages>
          </View>
        ) : null}

      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2132",
    width: "100%"
  },
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "#171717",
  },
  item: {
    height: 80,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#1E2132",
    position: "absolute",
    zIndex: 2,
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
  },
  carousel: {
    height: 112,
    width: "100%",
    position: "absolute",
    zIndex: 2,
    bottom: 0
  },
  touchable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  button: {
    fontFamily: "PoppinsLight",
    fontSize: 18,
    height: "100%",
    textAlignVertical: "center",
  },
  iconbutton_label: {
    color: "white",
    fontFamily: "PoppinsMedium",
    alignSelf: "center",
    textAlign: "center",
    fontSize: responsiveFontSize(1.5),
    marginTop: 5
  },
  iconbutton_container: {
    flexDirection: "column",
    alignSelf: "center",
    bottom: responsiveHeight(15),
    right: 0,
    position: "absolute",
    backgroundColor: "#1E2132",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  }
});
