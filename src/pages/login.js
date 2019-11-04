import React, {Component} from 'react';
import api from '../services/api';
import { ScrollView, Text, Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
export default class Login extends Component {

    static navigationOptions = {
        title: "Login"
    };

    constructor(props) {
     super(props);
     this.state = {};

     let firebaseConfig = {
        apiKey: "AIzaSyDcMpfHc_H_7BoJhqbwhgd1ZNZRLv8Ea28",
        authDomain: "portal-parlamentar.firebaseapp.com",
        databaseURL: "https://portal-parlamentar.firebaseio.com",
        projectId: "portal-parlamentar",
        storageBucket: "portal-parlamentar.appspot.com",
        messagingSenderId: "488822797633",
        appId: "1:488822797633:web:b809f7b12370b352ef9dc0",
        measurementId: "G-8P0TBQKQET"
      };
      firebase.initializeApp(firebaseConfig);
     }

    render() {
        return (
               <View>
                   <Text>...</Text>
               </View>
        );
    }
}