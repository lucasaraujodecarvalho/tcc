import React, { Component } from 'react';
import api from '../services/api'

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default class Projetos extends Component {
    static navigationOptions = {
        title: "Projetos"
    };

    state = {
        dados: []
    };

    componentDidMount() {
        this.loadProjetos();
    }

    loadProjetos = async () => {
        const response = await api.get('/proposicoes?siglaTipo=PL&ano=2019&ordem=ASC&ordenarPor=id');

        const { dados } = response.data;

        this.setState({ 
            dados:[...this.state.dados, ...dados]
        });
        console.disableYellowBox = true;
    }

    renderItem = ({ item }) => (
            <TouchableOpacity style={styles.productContainer}
            onPress={() => {
                this.props.navigation.navigate('ProjetoDetalhado', 
                { id: item.id, siglaTipo: item.siglaTipo, numero: item.numero, ano: item.ano});
            }}>
                <Text>{item.siglaTipo} {item.numero}/{item.ano}</Text>
                <Text style={styles.palavraNegrito}>Ementa</Text>
                <Text style={styles.ementaDescription}>{item.ementa}</Text>
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
        borderColor: '#0066ff',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    palavraNegrito: {
        fontWeight: 'bold'
    },
    ementaDescription: {
        color: '#999',
    }


});