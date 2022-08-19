import firebase from "firebase/app"
import "firebase/auth"

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCl9TLYNIkuqKG_O737o9DK-DdamtSQLTU",
    authDomain: "war-room-chat.firebaseapp.com",
    projectId: "war-room-chat",
    storageBucket: "war-room-chat.appspot.com",
    messagingSenderId: "693493831020",
    appId: "1:693493831020:web:1bc35303a23fde02ab0f49",
}).auth();