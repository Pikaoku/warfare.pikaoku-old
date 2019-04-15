import firebase from 'firebase/app';
import 'firebase/firestore';

if (firebase) {
    let one = 1
}

export const feedFeatures = () => {
    firebase.firestore().collection('sites/warfare/features');
};