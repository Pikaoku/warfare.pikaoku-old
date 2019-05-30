import firebase from '../../../../firebase';
export const fsAdd =
    (collection, data, author) => {
        debugger;
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
            })
    };