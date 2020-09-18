import firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyCxXwvIJFV9BDZFyQZyBs7k9M0GiI1MRuU",
	authDomain: "testing-a6f79.firebaseapp.com",
	databaseURL: "https://testing-a6f79.firebaseio.com",
	projectId: "testing-a6f79",
	storageBucket: "testing-a6f79.appspot.com",
	messagingSenderId: "886214831731",
	appId: "1:886214831731:web:9d4fee09d2061fead04406",
	measurementId: "G-DH4LKFT44D"
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