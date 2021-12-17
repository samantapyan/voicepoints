import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/firebase-functions';


class FirebaseService {

    init(success) {
        console.log("INIT---")
        const firebaseConfig = {
            apiKey: "AIzaSyCj1MKGCOp_qwaDFAMu7VHArtBFvu5PyL0",
            authDomain: "voicepoints-c0a52.firebaseapp.com",
            projectId: "voicepoints-c0a52",
            storageBucket: "voicepoints-c0a52.appspot.com",
            messagingSenderId: "22513631057",
            appId: "1:22513631057:web:ff47afdf69098e9ecf5d70",
            measurementId: "G-0TT2QQR8NB"
        };
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        console.log("chchch",this.auth);
        this.functions = firebase.functions();
        success(true);

    }
    addUser = (data, callback) => {
        console.log("---- +++ ----",this.db.collection('users'));
        this.db
            .collection('users')
            .doc(data.uid)
            .set(data)
            .then(r => {
                callback(r)
            })
    }
    getAllCountries = (callback) => {
        let result = []
        this.db
            .collection('countries')
            .where('id', '!=', 0)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(snap => {
                    result.push(snap.data())
                })
                callback(result)
            })
    }
    updateCountry = (data, callback) => {
        this.db
            .collection('countries')
            .doc(data.docId)
            .update(data)
            .then(querySnapshot => {
                callback(true)
            })
    }
    getCurrenUser = (callback) =>{
       callback(firebase.auth().currentUser)
    }

    addJury = (data, callback) =>{
        this.db
            .collection('juries')
            .doc(data.docId)
            .set(data)
            .then(querySnapshot => {
                callback(true)
            })
    }
    getAllJuries = (callback) =>{
        let result = []
        this.db
            .collection('juries')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(d => {
                    result.push(d.data())
                })
                callback(result)
            })
    }
}

const Instance = new FirebaseService();



console.log("MAL",Instance);
export default Instance;

// export const auth = firebase.auth()
// export const auth = null


