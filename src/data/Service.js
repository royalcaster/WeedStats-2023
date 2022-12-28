//Firebase
import { setDoc, doc, getDoc } from "@firebase/firestore";
import { firestore } from "./FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage"

//Tools
import toGermanDate from "./DateConversion";
import { summary, streakRanges, trackRecord } from "date-streaks";

// Lädt das Nutzer-Objekt aus dem AsyncStorage
const getLocalUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("current_user");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error:", e);
  }
};

const user = getLocalUser();

//gibt Ausssage über Existent des Nutzerobjekts zurück -> nicht über Existenz des Eintrags in der DB!
export const userExists = () => {
 if (user != null) {
  return true;
 }
 else {
  return false;
 }
}

//gibt fertiges Nutzerobjekt zurück
export const getUserObject = async () => {
  await refreshUser();
  return user;
}

// Überschreibt Nutzer-Objekt mit aktuellen Daten
const refreshUser = async () => {
  let local_counters = {
    main: 0,
    joint: 0,
    bong: 0,
    vape: 0,
    pipe: 0,
    cookie: 0,
  };

  try {
    const jsonValue = await AsyncStorage.getItem(user.id + "_counters");
    jsonValue != null ? (local_counters = JSON.parse(jsonValue)) : null;
  } catch (e) {
    console.log("Error in beim Laden des lokalen Nutzers: ", e);
  }

  const docRef = doc(firestore, "users", user.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    //Nutzerdokument existiert -> Nutzer-State mit Daten füllen
    user = {
      username: docSnap.data().username,
      id: docSnap.data().id,
      email: docSnap.data().email,
      photoUrl: docSnap.data().photoUrl,
      friends: docSnap.data().friends,
      joint_counter: local_counters.joint,
      bong_counter: local_counters.bong,
      vape_counter: local_counters.vape,
      pipe_counter: local_counters.pipe,
      cookie_counter: local_counters.cookie,
      member_since: docSnap.data().member_since,
      last_entry_timestamp: docSnap.data().last_entry_timestamp,
      last_entry_latitude: docSnap.data().last_entry_latitude,
      last_entry_longitude: docSnap.data().last_entry_longitude,
      last_entry_type: docSnap.data().last_entry_type,
      last_feedback: docSnap.data().last_feedback,
      main_counter: local_counters.main,
    };
  } else {
    //Nutzer-Dokument existiert nicht -> loggt sich erstmalig ein -> Dokument erstellen
    try {
      await setDoc(doc(firestore, "users", user.id), {
        username: user.name,
        id: user.id,
        email: user.email,
        photoUrl: user.photoUrl,
        friends: [],
        username_array: createUsernameArray(user.name),
        joint_counter: null,
        bong_counter: null,
        vape_counter: null,
        pipe_counter: null,
        cookie_counter: null,
        last_entry_timestamp: null,
        last_entry_latitude: null,
        last_entry_longitude: null,
        last_entry_type: null,
        last_feedback: null,
        member_since: new Date().toISOString().slice(0, 10),
        main_counter: null,
      });
      const docSnap = await getDoc(doc(firestore, "users", user.id));
      if (docSnap.exists()) {
        user = {
          username: docSnap.data().username,
          id: docSnap.data().id,
          email: docSnap.data().email,
          photoUrl: docSnap.data().photoUrl,
          friends: docSnap.data().friends,
          joint_counter: local_counters.joint,
          bong_counter: local_counters.bong,
          vape_counter: local_counters.vape,
          pipe_counter: local_counters.pipe,
          cookie_counter: local_counters.cookie,
          member_since: docSnap.data().member_since,
          last_entry_timestamp: docSnap.data().last_entry_timestamp,
          last_entry_latitude: docSnap.data().last_entry_latitude,
          last_entry_longitude: docSnap.data().last_entry_longitude,
          last_entry_type: docSnap.data().last_entry_type,
          last_feedback: docSnap.data().last_feedback,
          main_counter: local_counters.main,
        };
      }
    } catch (e) {
      console.log("Error:", e);
      user = null;
    }

    //Einstellungs-Objekt im Local Storage erstmalig einrichten:
    try {
      const value = JSON.stringify({
        showJoint: true,
        showBong: false,
        showVape: true,
        showPipe: false,
        showCookie: true,
        shareMainCounter: true,
        shareTypeCounters: true,
        shareLastEntry: true,
        saveGPS: true,
        shareGPS: false,
        showTutorial: true,
      });
      await AsyncStorage.setItem("settings", value);
    } catch (e) {
      console.log("Error beim erstellen des lokalen Config-Objekt:", e);
    }

    //Counter-Object im Local Storage erstmalig einrichten:
    try {
      const value = JSON.stringify({
        main: 0,
        joint: 0,
        bong: 0,
        vape: 0,
        pipe: 0,
        cookie: 0,
      });
      await AsyncStorage.setItem(user.id + "_counters", value);
    } catch (e) {
      console.log("Error in beim erstellen des lokalen Counter-Objekt: ", e);
    }
  }
};

// Holt alle Einträge aus dem lokalen Speicher
export const getRelevantKeys = async (user) => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log("Fehler beim Laden der Einträge-Keys aus dem lokalen Speicher:", e);
  }

  return keys.filter((key) => key.includes(user.id + "_entry_"));
};

// Holt alle Einträge-Daten aus dem lokalen Speicher
export const getLocalData = async (user, callback) => {
  let buffer = [];
  try {
    const jsonData = await AsyncStorage.multiGet(await getRelevantKeys(user));
    jsonData.forEach((entry) => buffer.push(JSON.parse(entry[1])));
    buffer.sort((a, b) => {
      return a.number - b.number;
    });
    callback();
    return buffer;
  } catch (e) {
    console.log("Fehler beim Laden der Einträge Daten aus dem Lokalen Speicher:", e);
  }
};

// -------------------
export const calcDailyAverage = (array, localData) => {
  return (
    array.length /
    ((localData[localData.length - 1].timestamp - localData[0].timestamp) /
      (60 * 60 * 24 * 1000))
  );
};

// -------------------
export const filterByType = (array, type) => {
  if (type === "main") {
    return array;
  }
  return array.filter((entry) => {
    return entry.type === type;
  });
};

// -------------------
export const filterByMostRecent = (array, days) => {
  if (days === 0) {
    return array;
  }

  const now = Date.now();

  return array.filter((entry) => {
    return now - entry.timestamp <= days * 1000 * 60 * 60 * 24;
  });
};

// -------------------
export const getEntryDates = (array) => {
  let dates = array.map((entry) => {
    let date = new Date(entry.timestamp);
    date.setUTCHours(0, 0, 0, 0);
    return +date;
  });

  dates = dates.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });

  return dates;
};

// -------------------
export const getBreakDates = ({ rec }) => {
  // Konvertiert Object in verschachteltes Array
  let dates = Object.entries(rec);

  // Filtert nach den Daten, an denen nicht gesmoked wurde
  dates = dates.filter((entry) => entry[1] === false);

  // Wirft das überflüssige zweite property weg -> eindim. Array
  dates = dates.map((entry) => Date.parse(entry[0]));

  return dates;
};

// -------------------
export const createLineChartData = (array, datapoints) => {
  if (array.length == 0) {
    return [
      ["keine Angaben", "keine Angaben"],
      [0, 0],
    ];
  }

  const first = array[0].timestamp;
  const step = (Date.now() - first) / datapoints;
  let chartData = new Array(datapoints).fill(0);
  let chartLabels = new Array(datapoints);

  array.forEach((entry) => {
    for (let i = 0; i < datapoints; i++) {
      if (
        first + i * step <= entry.timestamp &&
        entry.timestamp < first + (i + 1) * step
      ) {
        chartData[i]++;
        break;
      }
    }
  });

  for (let i = 0; i < datapoints; i++) {
    chartLabels[i] = toGermanDate(new Date(first + (i + 0.5) * step));
  }

  return [chartLabels, chartData];
};

// -------------------
export const createBarChartData = (array) => {
  let chartData = new Array(7).fill(0);
  let i;

  array.forEach((entry) => {
    i = new Date(entry.timestamp).getDay();
    i == 0 ? (i = 6) : (i = i - 1);
    chartData[i]++;
  });

  return chartData;
};

// -------------------
export const calcStreak = (array) => {
  const dates = getEntryDates(array);
  const length = Math.ceil((Date.now() - dates[0]) / (1000 * 60 * 60 * 24));
  const rec = trackRecord({ dates, length });
  const sum1 = summary(dates);
  const ranges1 = streakRanges(dates);
  const breakDates = getBreakDates({ rec });
  const sum2 = summary(breakDates);
  const ranges2 = streakRanges(breakDates);

  return {
    currentStreak: sum1.currentStreak,
    longestStreak: sum1.longestStreak,
    today: sum1.todayInStreak,
    within: sum1.withinCurrentStreak,
    startCurrent: toGermanDate(ranges1[0].start),
    rangeLongest: ranges1.find(
      ({ duration }) => duration === sum1.longestStreak
    ),
    currentBreak: sum2.currentStreak,
    longestBreak: sum2.longestStreak,
    startCurrentBreak: ranges2[0] ? toGermanDate(ranges2[0].start) : null,
    rangeLongestBreak: ranges2[0]
      ? ranges2.find(({ duration }) => duration === sum2.longestStreak)
      : null,
  };
};

//nimmt in (1-7) und gibt Wochentag zurück
export const getDayName = (x) => {
const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
if (x > 0 && x < 8) {
  return days[x-1];
}
else {
  return null;
}
}

export const getLastMessage = (timestamp) => {
  const last_entry = new Date(timestamp * 1000);

  return last_entry.toISOString()
}