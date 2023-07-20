import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// ... other firebase imports
export const googleAuthProvider = new GoogleAuthProvider();

export const firebaseApp = initializeApp({
	apiKey: "AIzaSyDPn4UfDFpZAPJ7S8Id1HtAtQwG2z0Q1lI",
	authDomain: "save-my-money-4c632.firebaseapp.com",
	projectId: "save-my-money-4c632",
	storageBucket: "save-my-money-4c632.appspot.com",
	messagingSenderId: "79581777665",
	appId: "1:79581777665:web:0097ca13b6aef510431500",
	measurementId: "G-Q5YKKWVNXR",
});

// used for the firestore refs
export const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const usuariosRef = collection(db, "usuarios");
