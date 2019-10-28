import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "Portal Parlamentar"
    };

    render() {
        return (
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
                        this.props.navigation.navigate('Login');
                    }}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#8A2BE2'
    },
    productContainer: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#8A2BE2',
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
        color: "#8A2BE2",
        marginTop: 50,
        padding: 10,
        textAlign: "center",
        fontSize: 30,
        lineHeight: 30
      },
    text: {
        color: "#8A2BE2",
        textAlign: "center",
        fontSize: 20
      }


});