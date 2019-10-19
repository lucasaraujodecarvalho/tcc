import React, {Component} from 'react';
import api from '../services/api';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const DeputadoDetalhado = ({navigation}) => (
    <View>
        <Image
            style={styles.imagemCentro} 
            source={{uri: navigation.state.params.deputadoDetalhado.urlFoto}}>
        </Image>
        <Text>{navigation.state.params.deputadoDetalhado.nome}</Text>
        <Text>{navigation.state.params.deputadoDetalhado.siglaPartido}</Text>
        <Text>{navigation.state.params.deputadoDetalhado.siglaUf}</Text>
        <Text>{navigation.state.params.deputadoDetalhado.email}</Text>
    </View>   
);

    DeputadoDetalhado.navigationOptions = ({ navigation }) => ({
        title: `DEP. ${navigation.state.params.deputadoDetalhado.nome}`
    });

export default DeputadoDetalhado;


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fafafa'
    },
    list: {
        padding: 20
    },
    imagemCentro: {
        justifyContent: 'center',
        alignItems: 'center',
        width:125, 
        height: 125
    },
    productContainer: {
        backgroundColor: '#EEE',
        borderWidth: 1,
        borderColor: '#0066ff',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    nomeDeputado: {
        fontSize: 16,
        marginTop: 5,
        lineHeight: 24,
        left: 135
    },
    productDescription: {
        fontSize: 16,
        marginTop: 5,
        lineHeight: 24,
        left: 135
    },
    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#0066ff',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    productButtonText: {
        fontSize: 16,
        color: '#0066ff',
        fontWeight: 'bold'
    }


});