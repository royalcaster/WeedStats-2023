//React
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Easing, Dimensions, TextInput, Modal } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks'

//Third Party
import BackButton from '../../../../common/BackButton';
import Button from '../../../../common/Button';

//Third Party
/* import moment from "moment";
import RNTextArea from "@freakycoder/react-native-text-area";
import uuid from 'react-native-uuid' */

//Firebase
import { setDoc, doc, getDoc, updateDoc } from "@firebase/firestore";
import { firestore } from "../../../../../data/FirebaseConfig";

const Feedback = ( { onexit, userid } ) => {

    const screen_width = Dimensions.get("screen").width;
    const fadeAnim = useRef(new Animated.Value(screen_width)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const [feedback, setFeedback] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [sent, setSent] = useState(false);
    const [locked, setLocked] = useState(false);
    const [user, setUser] = useState()

    useEffect(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.bezier(0,.79,0,.99),
          useNativeDriver: true,
        }).start();
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            easing: Easing.bezier(0,1.02,.21,.97),
            useNativeDriver: true,
          }).start();
      }, [fadeAnim, opacityAnim]);

      useEffect(() => {
        getUser();
        const [buttonBlocked, setButtonBlocked] = useState(false);
        if (moment(new Date(Date.now())).diff(moment(new Date(user.last_feedback * 1000)), "days")<7 &&
        moment(new Date(Date.now())).diff(moment(new Date(user.last_feedback * 1000)), "days")>0) {
        setButtonBlocked(true);
        }
      });

    const getUser = async () => {
        const docRef = doc(firestore, "users", userid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUser(docSnap.data());
            setLoading(false);
        }
    }

    useBackHandler(() => {
        hide();
        return true
    })
    
    const hide = () => {
        Animated.timing(fadeAnim, {
            toValue: screen_width,
            duration: 300,
            easing: Easing.bezier(0,.79,0,.99),
            useNativeDriver: true,
        }).start(({finished}) => {
            if (finished) {
                onexit();
            }
        });
    }

    const sendFeedback = async () => {
        setLoading(true);
        try{
            const docRef = doc(firestore, "users", user.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const now = moment(new Date(Date.now()));
                const last = moment(new Date(docSnap.data().last_feedback * 1000));
                
                /* if (now.diff(last, "days")<7) {
                    setLocked(true);
                    setLoading(false);
                }
                else {
                    
                } */

                await setDoc(doc(firestore, "feedback", uuid.v4()),{
                    email: email,
                    feedback: feedback
                });
                await updateDoc(doc(firestore, "users", user.id),{
                    last_feedback: Date.now(),
                });
                setSent(true);
                getUser();
                setLoading(false);
            }
        }
        catch(e){
            console.log("Error:",e);
        }
    }


    return (
        <Animated.View style={[{transform: [{translateX: fadeAnim}], opacity: opacityAnim, height: "100%"},styles.container]}>

            <Modal 
                animationType="fade"
                transparent={true}
                visible={sent}>
                <View style={{alignItems: "center", justifyContent: "center", backgroundColor:"rgba(0,0,0,0.5)", flex: 1}}>

                    <View style={{width: "90%", height: 300, backgroundColor: "#171717", alignSelf: "center", borderRadius: 25}}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.heading,{marginLeft: 0, textAlign: "center", height: "100%", textAlignVertical: "center", fontSize: 22}]}>Feedback gesendet</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.text,{fontSize: 15}]}>Danke, dass du uns hilfst, WeedStats besser zu machen.</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Button title={"Kein Problem!"} color={"#0080FF"} borderradius={25} fontColor={"white"} onPress={hide}/>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal 
                animationType="fade"
                transparent={true}
                visible={locked}>
                <View style={{alignItems: "center", justifyContent: "center", backgroundColor:"rgba(0,0,0,0.5)", flex: 1}}>

                    <View style={{width: "90%", height: 300, backgroundColor: "#171717", alignSelf: "center", borderRadius: 25}}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.heading,{marginLeft: 0, textAlign: "center", height: "100%", textAlignVertical: "center", fontSize: 22}]}>Achtung</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.text,{fontSize: 15}]}>Du hast in den letzten 30 Tagen bereist ein Feedback gesendet. Bald darfst du wieder!</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Button title={"Verstanden!"} color={"#0080FF"} borderradius={25} fontColor={"white"} onPress={hide}/>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{height: 50}} />

            <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                <View style={{marginLeft: 20}}>
                    <BackButton onPress={() => hide()}/>
                </View>
                <Text style={styles.heading}>Feedback senden</Text>
            </View>

            <View style={{height: 20}}></View>

            <View style={{flex: 4}}>
                <Text style={{color: "rgba(255,255,255,1)", fontFamily: "PoppinsBlack", width: "85%", alignSelf: "center", fontSize: 22}}>Deine Meinung zählt!</Text>
                <Text style={{color: "rgba(255,255,255,0.75)", fontFamily: "PoppinsLight", width: "85%", alignSelf: "center", fontSize: 15}}>
                Erzähl uns, wie du WeedStats findest. 
                Optional kannst du deine Email-Adresse für eine Antwort angeben, 
                ansonsten bleibt dein Feedback selbstverständlich anonym.</Text>

                <View style={{height: 20}}></View>

                <View style={{flex: 1}}>
                    <View style={{width: "75%", alignSelf: "center", flexDirection: "row"}}>
                        <Text style={{fontFamily: "PoppinsLight", color: "rgba(255,255,255,0.75)", fontSize: 12, flex: 1}}>Email-Adresse</Text>
                        <Text style={{fontFamily: "PoppinsLight", color: "#E19707", fontSize: 12, textAlign: "right", flex: 1}}>optional</Text>
                    </View>
                    <TextInput style={styles.input} placeholder={"Email-Adresse..."} placeholderTextColor={"rgba(255,255,255,0.2)"} value={email} onChangeText={(text) => setEmail(text)}/>
                </View>

                <View style={{height: 10}}></View>

                <View style={{flex: 4}}>

                <View style={{width: "75%", alignSelf: "center", flexDirection: "row"}}>
                    <Text style={{fontFamily: "PoppinsLight", color: "rgba(255,255,255,0.75)", fontSize: 12, flex: 1}}>Feedback</Text>
                    <Text style={{fontFamily: "PoppinsLight", color: "#D90F0F", fontSize: 12, textAlign: "right", flex: 1}}>erforderlich</Text>
                </View>
                <RNTextArea
                    maxCharLimit={300}
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    exceedCharCountColor="#990606"
                    placeholder={"Dein Feedback..."}
                    onChangeText={(text) => setFeedback(text)}
                    value={feedback}
                    style={{backgroundColor: "#171717", borderRadius: 15, width: "90%", alignSelf: "center", height: 200}}
                    textInputStyle={{fontFamily: "PoppinsLight", color: "white", fontSize: 15, textAlignVertical: "top"}}
                    spellCheck={false}
                />

                </View>

            </View>
            
            <View style={{flex: 1, justifyContent: "center"}}>

            <View style={{flexDirection: "row"}}>
                 
            {!buttonBlocked && !loading ? 
                    <View style={{flex: 1}}>
                        <Button title={"Senden"} color={"#0080FF"} borderradius={25} fontColor={"white"} onPress={() => {setLoading(true); sendFeedback()}}/>
                    </View>
            :
                    <View style={{flex: 1}}>
                        <Text style={{color: "white", fontFamily: "PoppinsBlack", textAlign: "center", fontSize: 18}}>Nächstes Feedback in:   <Text style={{color: "#0080FF", fontSize: 35}}>{/* {moment(new Date(user.last_feedback)).add(7,'days').diff(moment(new Date(Date.now())), "days")} */}</Text>   Tagen.</Text>
                    </View>
            }
                
            </View>

            <View style={{height: 20}}></View>

            <Text style={{color: "rgba(255,255,255,0.75)", fontFamily: "PoppinsLight", width: "80%", alignSelf: "center", fontSize: 13, textAlign: "left", textAlign: "center"}}>
            Beachte, dass du auf 1 Feedback alle 7 Tage bschränkt bist. </Text>

            </View>

        </Animated.View>
    )
}

export default Feedback

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#1E2132",
        flexDirection: "column",
        flex: 1,
        position: "absolute",
        zIndex: 21
    },
    text: {
        alignSelf: "center",
        fontFamily: "PoppinsLight",
        fontSize: 18,
        color: "white",
        maxWidth: 200,
        textAlign: "center"
    },
    bold: {
        fontFamily: "PoppinsBlack"
    },
    image: {
        height: 150,
        width: 200,
        alignSelf: "center"
    },
    close: {
        color: "#696969",
        fontSize:40,
        position: "relative",
    },
    close_text: {
        marginLeft: 20,
        borderRadius: 15,
        position: "absolute",
        bottom: 20
    },
    cancelButton: { 
        width: "80%",
        alignSelf: "center",
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        flexDirection: "row",
        position: "absolute",
        bottom: 20
    },
    cancel_icon: {
        fontSize: 25,
        color: "white",
        textAlignVertical: "center",
    },
    pressable_back: {
        width: 80, 
        padding: 10, 
        borderRadius: 25, 
        marginLeft: 10
    },
    icon_back: {
        color: "white", 
        fontSize: 30, 
        left: 5
    },
    heading: {
      color: "white",
      fontSize: 20,
      fontFamily: "PoppinsBlack",
      marginLeft: 20,
      textAlign: "left"
    },
    input: {
        backgroundColor: "#171717",
        width: "90%",
        alignSelf: "center",
        borderRadius: 15,
        height: 50,
        fontFamily: "PoppinsLight",
        paddingLeft: 20,
        color: "white",
        fontSize: 15
    }
});