import * as firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import { authState } from 'rxfire/auth'
import { collectionData, doc } from 'rxfire/firestore';
import { filter, switchMap } from 'rxjs/operators';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDYjGq1mw4uWBgw9euTp9ITp1pq1jZqvw4",
    authDomain: "pikaoku-tools.firebaseapp.com",
    databaseURL: "https://pikaoku-tools.firebaseio.com",
    projectId: "pikaoku-tools",
    storageBucket: "pikaoku-tools.appspot.com",
    messagingSenderId: "946348039508"
})

export const FIRESTORE_BASE_PATH = 'sites/warfare/'
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

app.storage().refFromURL('https://firebasestorage.googleapis.com/v0/b/pikaoku-tools.appspot.com/o/noun_wings_1113796.svg?alt=media&token=27c4eee5-dde0-424e-8696-b77c554055fa')


/**
 *          STREAMS
 */

// AUTH STREAMS
const login$ = authState(auth).pipe(filter(user => !!user))
const userSettings$ = authState(auth).pipe(
    filter(user => !!user),
    switchMap(
        user => doc(firestore.doc('users/' + user.uid))
    )
)


const COLLECTION_ASPECTS = FIRESTORE_BASE_PATH + 'aspects'
const COLLECTION_FEATURES = FIRESTORE_BASE_PATH + 'features'
const COLLECTION_UNITS = FIRESTORE_BASE_PATH + 'units'


// DATA STREAMS
const coreAspects$ = collectionData(firestore.collection(COLLECTION_ASPECTS).where('official', '==', true), 'id')
const coreFeatures$ = collectionData(firestore.collection(COLLECTION_FEATURES).where('official', '==', true), 'id')

const createObservableForUserCreatedData = collection => (
    authState(auth).pipe(
        filter(user => !!user),
        switchMap(
            user => collectionData(firestore.collection(collection).where('authorId', '==', user.uid), 'id')
        )
    )
)

const createObservableForUserSavedData = collection => (
    authState(auth).pipe(
        filter(user => !!user),
        switchMap(
            user => collectionData(firestore.collection(collection).where('saved', 'array-contains', user.uid), 'id')
        )
    )
)

const userAspects$ = createObservableForUserCreatedData(COLLECTION_ASPECTS)
const userFeatures$ = createObservableForUserCreatedData(COLLECTION_FEATURES)
const userUnits$ = createObservableForUserCreatedData(COLLECTION_UNITS)

const savedAspects$ = createObservableForUserSavedData(COLLECTION_ASPECTS)
const savedFeatures$ = createObservableForUserSavedData(COLLECTION_FEATURES)
const savedUnits$ = createObservableForUserSavedData(COLLECTION_UNITS)


// FUNCTIONS
const getCurrentUser = () => auth().getCurrentUser() || false


/**
 *          EXPORTS
 */

// Firebase Services
export { app, auth, firestore }

// Streams
export {
    login$,
    userSettings$,
    coreAspects$, coreFeatures$,
    userAspects$, userFeatures$,
    userUnits$,
    savedAspects$, savedFeatures$, savedUnits$
}

// Operations
export { collectionData }

// Functions
export { getCurrentUser }

/**
 *          LEGACY CODE
 */

export const FS_COL_FEATURES = FIRESTORE_BASE_PATH + 'features/'
export const FS_COL_ASPECTS = FIRESTORE_BASE_PATH + 'aspects/'
export const FS_COL_UNITS = FIRESTORE_BASE_PATH + 'units/'

export const fsListen =
    (collection, where) =>
        firebase.firestore().collection(collection).where(...where);

export const fsUpdate =
    (collection, id, data) =>
        firebase
            .firestore()
            .collection(collection)
            .doc(id)
            .update({
                ...data,
                updated: firebase.firestore.FieldValue.serverTimestamp()
            });

export const fsDelete =
    (collection, id) =>
        firebase
            .firestore()
            .collection(collection)
            .doc(id)
            .delete();

export default firebase
