import firebase from '../../../../firebase';

export const fsAdd =
    (collection, data, username) =>
        firebase
            .firestore()
            .collection(collection)
            .add({
                saved: [],
                saves: 0,
                ...data,
                created: firebase.firestore.FieldValue.serverTimestamp(),
                updated: firebase.firestore.FieldValue.serverTimestamp(),
                author: username,
                authorId: firebase.auth().currentUser.uid,
            })

export default fsAdd