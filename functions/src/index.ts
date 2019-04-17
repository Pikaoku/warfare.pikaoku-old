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
            });


exports.updateAspect =
    db.document('sites/warfare/aspect/{aspectId}')

exports.createAspect =
    db.document('sites/warfare/aspects/{aspectId}')
        .onCreate(
            (snap, context) => {
                const data = snap.data();
                const objectId = snap.id;
                return index.addObject({
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
                return index.deleteObject(objectId)
            }
        );