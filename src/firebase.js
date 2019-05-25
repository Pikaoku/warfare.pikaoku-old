import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { authState } from 'rxfire/auth'
import { collectionData } from 'rxfire/firestore';
import { filter } from 'rxjs/operators';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDYjGq1mw4uWBgw9euTp9ITp1pq1jZqvw4",
    authDomain: "pikaoku-tools.firebaseapp.com",
    databaseURL: "https://pikaoku-tools.firebaseio.com",
    projectId: "pikaoku-tools",
    storageBucket: "pikaoku-tools.appspot.com",
    messagingSenderId: "946348039508"
})

const firestore = firebase.firestore(app)

firestore
    .enablePersistence()
    .catch(
        (err) => {
            switch (err.code) {
                case 'failed-precondition':
                    // Multiple Tabs
                    break;
                case 'unimplemented':
                    break;
                default:
                    break;
            }
        }
    )

const auth = firebase.auth(app)

const loggedIn$ = authState(auth).pipe(filter(user => !!user))

export { app, auth, firestore, collectionData, loggedIn$ }

export default firebase