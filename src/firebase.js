import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseCongig = {
    apiKey: "AIzaSyCxpUXk9f-z45jixPLULvToq9RMYRvOg3o",
    authDomain: "letschat-f9f4c.firebaseapp.com",
    projectId: "letschat-f9f4c",
    storageBucket: "letschat-f9f4c.appspot.com",
    messagingSenderId: "900421065662",
    appId: "1:900421065662:web:f2c053ad6e0a935f8437ef"
};

const app = initializeApp(firebaseCongig)
export const auth = getAuth(app)