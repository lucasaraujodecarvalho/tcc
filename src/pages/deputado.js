import React, { Component } from 'react';
import api from '../services/api'

import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default class Deputado extends Component {
    static navigationOptions = {
        title: "Deputados Federais"
    };

    state = {
        dados: []
    };

    componentDidMount() {
        this.loadDeputados();
    }

    loadDeputados = async () => {
        const response = await api.get('/deputados');

        const { dados } = response.data;

        this.setState({ 
            dados:[...this.state.dados, ...dados]
        });
        console.disableYellowBox = true;
    }

    renderItem = ({ item }) => (
            <TouchableOpacity style={styles.productContainer}
            onPress={() => {
                this.props.navigation.navigate('DeputadoDetalhado', { deputadoDetalhado: item });
            }}>
                <ImageBackground 
                    style={{ width:125, height: 125 }}
                    source={{uri: item.urlFoto}}>
                    <Text style={styles.nomeDeputado}>{item.nome}</Text>
                    <Text style={styles.productDescription}>{item.siglaPartido}/{item.siglaUf}</Text>
                </ImageBackground>
            </TouchableOpacity>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.dados}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fafafa'
    },
    list: {
        padding: 20
    },
    productContainer: {
        backgroundColor: '#EEE',
        borderWidth: 1,
        borderColor: '#3cb371',
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
        borderColor: '#3cb371',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    productButtonText: {
        fontSize: 16,
        color: '#3cb371',
        fontWeight: 'bold'
    }


});