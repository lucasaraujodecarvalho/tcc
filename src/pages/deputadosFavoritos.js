import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

export default class DeputadosFavoritos extends Component {
    static navigationOptions = {
        title: "Deputados Fedarais Favoritos"
    };

    constructor(props){
        super(props);
        console.disableYellowBox = true;
    }

    render() {
        return (
            <View>
               <Text>...</Text>
            </View>
        );
    }
}