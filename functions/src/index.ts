import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch from 'algoliasearch';

admin.initializeApp();

const env = functions.config();

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const aspects = client.initIndex('aspects');
const features = client.initIndex('features');
const units = client.initIndex('units');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const db = functions.region('europe-west1').firestore;

exports.helloWorld =
    functions
        .region('europe-west1')
        .https
        .onRequest(
            (request, response) => {
                response.send("Hello from Firebase!");
            }
        );

exports.updateAspect =
    db.document('sites/warfare/aspect/{aspectId}')
        .onUpdate(
            (snap, context) => {
                const objectId = snap.after.id;
                const data = snap.after.data();
                return aspects.saveObject({
                    objectId,
                    ...data
                })
            }
        );

exports.createAspect =
    db.document('sites/warfare/aspects/{aspectId}')
        .onCreate(
            (snap, context) => {
                const data = snap.data();
                const objectId = snap.id;
                return aspects.addObject({
                    objectId,
                    ...data
                })
            }
        );

exports.deleteAspect =
    db.document('sites/warfare/aspects/{aspectId}')
        .onDelete(
            (snap, context) => {
                const objectId = snap.id;
                return aspects.deleteObject(objectId)
            }
        );

exports.updateFeature =
    db.document('sites/warfare/features/{featureId}')
        .onUpdate(
            (snap, context) => {
                const data = snap.after.data();
                const objectId = snap.after.id;
                return features.saveObject({
                    ...data,
                    objectId
                })
            }
        );

exports.createFeature =
    db.document('sites/warfare/features/{featureId}')
        .onCreate(
            (snap, context) => {
                const data = snap.data();
                const objectId = snap.id;
                return features.addObject({
                    objectId,
                    ...data
                })
            }
        );

exports.deleteFeature =
    db.document('sites/warfare/features/{featureId}')
        .onDelete(
            (snap, context) => {
                const objectId = snap.id;
                return features.deleteObject(objectId)
            }
        );


exports.updateUnit =
    db.document('sites/warfare/units/{unitId}')
        .onUpdate(
            (snap, context) => {
                const data = snap.after.data();
                const objectId = snap.after.id;
                return units.saveObject({
                    ...data,
                    objectId
                })
            }
        );

exports.createUnit =
    db.document('sites/warfare/units/{unitId}')
        .onCreate(
            (snap, context) => {
                const data = snap.data();
                const objectId = snap.id;
                return units.addObject({
                    objectId,
                    ...data
                })
            }
        );

exports.deleteUnit =
    db.document('sites/warfare/units/{unitId}')
        .onDelete(
            (snap, context) => {
                const objectId = snap.id;
                return units.deleteObject(objectId)
            }
        );