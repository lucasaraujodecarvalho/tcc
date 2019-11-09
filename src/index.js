import React from 'react';
import Routes from './routes';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

let config = {
    apiKey: "AIzaSyDcMpfHc_H_7BoJhqbwhgd1ZNZRLv8Ea28",
    authDomain: "portal-parlamentar.firebaseapp.com",
    databaseURL: "https://portal-parlamentar.firebaseio.com",
    projectId: "portal-parlamentar",
    storageBucket: "portal-parlamentar.appspot.com",
    messagingSenderId: "488822797633",
    appId: "1:488822797633:web:b809f7b12370b352ef9dc0",
    measurementId: "G-8P0TBQKQET"
  };
  firebase.initializeApp(config);

const App = () => <Routes />;

export default App;