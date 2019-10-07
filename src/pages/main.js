import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "Portal Parlamentar"
    };

    render() {
        return (
            console.disableYellowBox = true,
            <ScrollView contentContainerStyle={styles.contentContainer}>
            <View
              style={[styles.linearGradient, styles.container]}>
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
                    this.props.navigation.navigate('Gastos');
            }}>
                <Text style={styles.text}>Gastos</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fafafa'
    },
    productContainer: {
        backgroundColor: '#3cb371',
        borderWidth: 1,
        borderColor: '#3cb371',
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
        color: "#3cb371",
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