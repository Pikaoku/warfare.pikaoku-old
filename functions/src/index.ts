import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch from 'algoliasearch';

admin.initializeApp();

const env = functions.config();

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const indexes: any = {
    'aspects': client.initIndex('aspects'),
    'features': client.initIndex('features'),
    'units': client.initIndex('units')
};


const db = functions.region('europe-west1').firestore;

exports.onCreate =
    db.document('sites/warfare/{category}/{objectID}')
        .onCreate((snap, context) => {
            return indexes[context.params.category]
                .addObject({
                    objectID: context.params.objectID,
                    ...snap.data()
                })
        });

exports.onUpdate =
    db.document('sites/warfare/{category}/{objectID}')
        .onUpdate((snap, context) => {
            return indexes[context.params.category]
                .saveObject({
                    objectID: context.params.objectID,
                    ...snap.after.data()
                })
        });

exports.onDelete =
    db.document('sites/warfare/{category}/{objectID}')
        .onDelete((snap, context) => {
            return indexes[context.params.category]
                .deleteObject(context.params.objectID)
        });
