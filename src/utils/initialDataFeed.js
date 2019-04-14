import firebase from 'firebase/app';
import 'firebase/firestore';

export const feedFeatures = () => {
    ['experience', 'type', 'equipment'].map(
        type =>
            firebase.firestore().collection('sites/warfare/aspects').add({
                attack: 0,
                author: 'warfare.pikaoku',
                authorId: false,
                cost: 0,
                costMod: 0,
                defense: 0,
                description: '',
                lore: '',
                morale: 0,
                name: 'None',
                official: true,
                power: 0,
                toughness: 0,
                traits: [],
                type: type,
                version: 1
            })
    )
};