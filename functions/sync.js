const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.fireWrite = functions.firestore.document('/pages/{pageId}').onWrite((change, context) => {
    const pageDoc = change.after.data();
    const pageId = change.after.id;
    const db = admin.database().ref('pages');

    const {status} = pageDoc;
    if (status !== 'published') {
      return db.child(pageId).set(null);
    }

    return db.child(pageId).set(pageDoc);
})
