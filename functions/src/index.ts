'use strict';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';


// Initialize the Algolia Client
const client: algoliasearch.Client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index: algoliasearch.Index = client.initIndex('customer_search');

exports.indexCustomer = functions.firestore
  .document('customers/{customerId}')
  .onCreate((snapshot:DocumentSnapshot) => {
      const data: FirebaseFirestore.DocumentData = snapshot.data();
      const objectID: string = snapshot.id;
      // Add the data to the algolia index
      return index.addObject({objectID, ...data});
    }
  );

exports.unindexCustomer = functions.firestore
  .document('customers/{customerId}')
  .onDelete((snapshot:DocumentSnapshot) => {
      const objectId: string = snapshot.id;
      // Delete an ID from the index
      return index.deleteObject(objectId);
    }
  );

exports.upindexCustomer = functions.firestore
  .document('customers/{customerId}')
  .onUpdate((change: functions.Change<DocumentSnapshot>) => {
      const data: FirebaseFirestore.DocumentData = change.after.data();
      const objectID: string = change.after.id;
      // Update the data to the algolia index
      return index.saveObject({objectID, ...data});
    }
  );
