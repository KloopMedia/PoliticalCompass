import firebase from 'firebase';

const firebaseConfig = {
		apiKey: "AIzaSyAsHkL31D3SoLKJB7KckZJhP-5OeAKEr24",
    authDomain: "politicalcompass-ab7db.firebaseapp.com",
    databaseURL: "https://politicalcompass-ab7db.firebaseio.com",
    projectId: "politicalcompass-ab7db",
    storageBucket: "politicalcompass-ab7db.appspot.com",
    messagingSenderId: "784296265940",
    appId: "1:784296265940:web:37d3c65879cb09cebe5341",
    measurementId: "G-47ZKW7PQ4L"
}
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
	firebase.auth().signInWithPopup(provider);
};

export const signInAnonymously = () => {
	firebase.auth().signInAnonymously()
}

export default firebase;