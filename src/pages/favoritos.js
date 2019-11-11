import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

export default class Favoritos extends Component {
    static navigationOptions = {
        title: "Favoritos"
    };

    constructor(props){
        super(props);
        console.disableYellowBox = true;
    }

    render() {
        return (
            <View
                style={[styles.linearGradient, styles.container, styles.contentContainer]}>
                <Text style={styles.title}></Text>
    
                <TouchableOpacity style={styles.productContainer}
                    onPress={() => {
                        this.props.navigation.navigate('DeputadosFavoritos');
                    }}>
                <Text style={styles.text}>Deputados Federais</Text>
                </TouchableOpacity>
              
                <TouchableOpacity style={styles.productContainer}
                    onPress={() => {
                        this.props.navigation.navigate('SenadoresFavoritos');
                    }}>
                    <Text style={styles.text}>Senadores</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fafafa'
    },
    corBotao:{
        backgroundColor: '#0066ff'
    },
    productContainer: {
        backgroundColor: '#0066ff',
        borderWidth: 1,
        borderColor: '#0066ff',
        borderRadius: 5,
        padding: 20,
        marginBottom: 10
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
      },
    contentContainer: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      },
    title: {
        color: "#0066ff",
        marginTop: 50,
        padding: 10,
        textAlign: "center",
        fontSize: 30,
        lineHeight: 30
      },
    text: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 20
      }


});