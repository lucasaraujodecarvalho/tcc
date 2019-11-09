import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

export default class Main extends Component {
    static navigationOptions = {
        title: "Portal Parlamentar"
    };

    constructor(props){
        super(props);
        this.sair = this.sair.bind(this);
    }

    sair() {
        firebase.auth().signOut();
            this.props.navigation.navigate('Main')
            alert('Logout com sucesso !');
     }

    render() {
        return (
            console.disableYellowBox = true,
            <View
                style={[styles.linearGradient, styles.container, styles.contentContainer]}>
                <Text style={styles.title}></Text>
    
                <TouchableOpacity style={styles.productContainer}
                    onPress={() => {
                        this.props.navigation.navigate('Deputado');
                    }}>
                <Text style={styles.text}>Deputados Federais</Text>
                </TouchableOpacity>
              
                <TouchableOpacity style={styles.productContainer}
                    onPress={() => {
                        this.props.navigation.navigate('Senador');
                    }}>
                    <Text style={styles.text}>Senadores</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.productContainer}
                    onPress={() => {
                    this.props.navigation.navigate('Projetos');
                    }}>
                    <Text style={styles.text}>Projetos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.productContainer}
                    onPress={() => {
                        this.props.navigation.navigate('Cadastrar');
                    }}>
                    <Text style={styles.text}>Cadastrar</Text>
                </TouchableOpacity>

                <Button title="Sair" onPress={this.sair} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fafafa'
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