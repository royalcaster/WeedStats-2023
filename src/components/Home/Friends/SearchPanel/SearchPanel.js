//React
import React, {useContext, useEffect, useRef, useState} from "react";
import { Animated, View, StyleSheet, TextInput, Dimensions, Easing, Text, ScrollView, ActivityIndicator, TouchableNativeFeedback, Modal } from "react-native";
import { useBackHandler } from '@react-native-community/hooks'

//Custom Components
import BackButton from '../../../common/BackButton'
import FriendListItem from "../FriendList/FriendListItem/FriendListItem";

//Firebase
import { doc, getDoc, updateDoc, getDocs, collection, query, where } from "@firebase/firestore";
import { firestore } from "../../../../data/FirebaseConfig";
import Antdesign from 'react-native-vector-icons/AntDesign'

//Third Party
import uuid from 'react-native-uuid'

//Service
import { UserContext } from "../../../../data/UserContext";
import { LanguageContext } from "../../../../data/LanguageContext";

const SearchPanel = ({onExit}) => {

    const user = useContext(UserContext)
    const language = useContext(LanguageContext);

    const screen_height = Dimensions.get("screen").height;
    const [modalVisible, setModalVisible] = useState(false);
    const [activeRequested, setActiveRequested] = useState(null);
    const [alreadySent, setAlreadySent] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const slideAnim = useRef(new Animated.Value(screen_height)).current;
    const textInputRef = useRef(null);

    useEffect(() => {
        Animated.timing(slideAnim,{
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.bezier(0,1.02,.21,.97)
        }).start();
    });
    
    const hide = () => {
        Animated.timing(slideAnim,{
            toValue: screen_height,
            duration: 300,
            useNativeDriver: true,
        }).start(({finished}) => {
            if (finished) {
                onExit();
            }
        });
        textInputRef.current.blur();
    }

    useBackHandler(() => {
        hide();
        return true
    })

    const searchUsers = async (text) => {
        setLoading(true);
        var resultBuffer = [];

        var length = text.length;
        if (length != 0) {
            try {
                const docRef = collection(firestore,"users");
                const q = query(docRef, where("username_array", "array-contains", text));
                const docSnap = await getDocs(q);
    
                docSnap.forEach((doc) => {
                    if (doc.exists()) {
                        resultBuffer.push({
                            id: doc.data().id,
                            username: doc.data().username,
                            requests: doc.data().requests
                        });
                       }
                });
            }
            catch(e){
                console.log("Error", e);
            }
        }
        else {
            setResults(null);
        }

        setResults(resultBuffer);
        setLoading(false);
    }

    const makeFriendRequest = async (id) => {

        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);

        var requested;
        if (docSnap.exists()) {
                requested = {
                id: docSnap.data().id,
                requests: docSnap.data().requests
            }
        }

        if (requested.requests != null && requested.requests.includes(user.id)) {
            console.log("Anfrage bereits gesendet!");
            setAlreadySent(true);
        }
        else {
            try{
                const docRef = doc(firestore, "users", requested.id);
                const docSnap = await getDoc(docRef);
                
                
                if (docSnap.exists()) {
                    var buffer = docSnap.data().requests;
                    updateDoc(docRef,{
                        requests: buffer.concat(user.id)
                    });
                }
            }
            catch(e){
                console.log("Error:", e)
            }
        setModalVisible(false);
        }
        
    }

    return (
        <Animated.View style={[styles.container,{transform: [{translateY: slideAnim}]}]}>
            <View style={{height: 50}}></View>

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)"}}>
                <View style={styles.modal_container}>
                    {!alreadySent ? <><View style={{flex: 1, justifyContent: "center", paddingHorizontal: 50}}>

                        {language.language_short == "de" ? 
                        <Text style={styles.heading}><Text style={[{color: "#0080FF"}]}>{activeRequested ? activeRequested.username : null}</Text> {language.searchpanel_question}</Text>
                        :
                        <Text style={styles.heading}>{language.searchpanel_question}<Text style={[{color: "#0080FF"}]}> {activeRequested ? activeRequested.username : null}</Text> ? </Text>
                        }

                        
                    </View>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.05)", true)} onPress={() => setModalVisible(false)}>
                                <View style={styles.touchable}>
                                    <Antdesign name="close" style={[styles.icon,{color: "#eb4034"}]}/>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.05)", true)} onPress={() => makeFriendRequest(activeRequested.id)}>
                                <View style={styles.touchable}>
                                    <Antdesign name="check" style={[styles.icon,{color: "#3BA426"}]}/>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View></> 
                    
                    : <View style={{flex: 1, justifyContent: "center"}}><Antdesign style={styles.info_icon} name="exclamationcircleo"/><View style={{height: 30}}></View><Text style={[styles.heading,{textAlign: "center"}]}>Du hast bereits eine Freundschaftsanfrage an <Text>{activeRequested ? activeRequested.username : null}</Text> gesendet.</Text><View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.05)", true)} onPress={() => setModalVisible(false)}>
                                <View style={styles.touchable}>
                                    <Antdesign name="close" style={[styles.icon,{color: "#eb4034"}]}/>
                                </View>
                            </TouchableNativeFeedback>
                        </View></View>}
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
                    <Text style={[styles.heading,{textAlign: "left"}]}>{language.searchpanel_title}</Text>
                </View>
            </View>

            <TextInput ref={textInputRef} blurOnSubmit={true} autoFocus={true} style={styles.input} onChangeText={(text) => {searchUsers(text)}}></TextInput>
            
            <ScrollView style={{width: "100%", flex: 1, alignSelf: "center", marginTop: 20}}>

            {!results || results.length == 0 ? 
            <View style={{width: "100%", marginTop: 100}}>
                <Text style={{fontFamily: "PoppinsMedium", fontSize: 15, color: "#484F78", alignSelf: "center"}}>{language.searchpanel_empty}</Text>
            </View> : <>
            {loading ? <ActivityIndicator color={"#0080FF"} size={"large"} style={{marginTop: 50}}/> : (
                results.map((result) => {
                    return <FriendListItem key={uuid.v4()} userid={result.id} onPress={() => {setActiveRequested(result);setModalVisible(true)}}/>
                })
            )}
            </>}

            </ScrollView>

            
        </Animated.View>
    );
}

export default SearchPanel

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "#131520",
        zIndex: 10,
        position: "absolute",
    },
    input: {
        backgroundColor: "#1E2132",
        width: "90%",
        alignSelf: "center",
        height: 60,
        borderRadius: 10,
        paddingLeft: 20,
        color: "white",
        fontSize: 18,
        fontFamily: "PoppinsMedium",
    },
    modal_container: {
        backgroundColor: "#1E2132",
        width: "90%",
        height: 300,
        alignSelf: "center",
        borderRadius: 25,
        flexDirection: "column"
    },
    heading: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: 20,
        textAlign: "center"
    },
    touchable: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        fontSize: 40
    },
    info_icon: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        marginTop: 20
    }
});