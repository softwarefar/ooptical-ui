// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiMap: 'AIzaSyA5nbF48JkVcPiI0WoK1Vxxbl4W-M5HEcw',
    apiKey: 'AIzaSyA5nbF48JkVcPiI0WoK1Vxxbl4W-M5HEcw',
    authDomain: 'ooptical-aeb33.firebaseapp.com',
    databaseURL: 'https://ooptical-aeb33.firebaseio.com',
    projectId: 'ooptical-aeb33',
    storageBucket: 'ooptical-aeb33.appspot.com',
    messagingSenderId: '511769902143'
  },
  algolia: {
    apiKey: 'c75e67cfec34299c3a36f8253ddb4312',
    appId: '5HX54EFK9T'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
