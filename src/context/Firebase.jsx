import {createContext,useContext,useState,useEffect} from "react";
import {initializeApp} from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
onAuthStateChanged,
} from "firebase/auth";
import {getFirestore,collection,addDoc,getDocs } from "firebase/firestore";
import {getStorage,ref,uploadBytes} from "firebase/storage";


const FirebaseContext=createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyAeDLB1x0-IzCnz0EcPUd4oDg0sd9EGKS4",
    authDomain: "book-me-2ad75.firebaseapp.com",
    projectId: "book-me-2ad75",
    storageBucket: "book-me-2ad75.appspot.com",
    messagingSenderId: "741630322768",
    appId: "1:741630322768:web:4b64c816f6809c76354955"
  };

export const useFirebase=()=>useContext(FirebaseContext);

const firebaseapp=initializeApp(firebaseConfig);
const firebaseAuth=getAuth(firebaseapp);
const firestore=getFirestore(firebaseapp)
const storage=getStorage(firebaseapp);

// console.log(firestore,"bnb");
const googleProvider=new GoogleAuthProvider();


export const FirebaseProvider=(props)=>{

const [user,setUser]=useState(null)

useEffect(()=>{

 onAuthStateChanged(firebaseAuth,user=>{
  console.log(user,"ioio");
    if(user){
        setUser(user)
    }
    else{
        setUser(null)
}
 })   

},[])


const signupUserWithEmailAndPassword=(email,password)=> 
createUserWithEmailAndPassword(firebaseAuth,email,password);

const signinUserWithEmailAndPassword=(email,password)=>signInWithEmailAndPassword(firebaseAuth,email,password)

const signinWithGoogle=()=>signInWithPopup(firebaseAuth,googleProvider);

console.log(user,"user kon hai");

const handleCreateNewListing = async (name, age, gender) => {
    try {
      const docRef = await addDoc(collection(firestore, "bookme"), {
        name,
        age,
        gender,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

const listAllBookme=()=>{
    return ( getDocs(collection(firestore,"bookme")))
}
const isLoggedin=user ? true :false;

    return(
        <FirebaseContext.Provider value=
        {{    
            signupUserWithEmailAndPassword,
            signinUserWithEmailAndPassword,
            signinWithGoogle,
            handleCreateNewListing,
            listAllBookme,
            isLoggedin
            
            }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
export {firebaseAuth,googleProvider}