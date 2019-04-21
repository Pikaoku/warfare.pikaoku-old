import * as firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

export const fsListen =
    (collection, where) =>
        firebase.firestore().collection(collection).where(...where);

export const fsAdd =
    (collection, data, author) =>
        firebase
            .firestore()
            .collection(collection)
            .add({
                saved: [],
                saves: 0,
                ...data,
                created: firebase.firestore.FieldValue.serverTimestamp(),
                updated: firebase.firestore.FieldValue.serverTimestamp(),
                author: author,
                authorId: firebase.auth().currentUser.uid,
            });

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


