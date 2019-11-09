import React, {Component} from 'react';
import api from '../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import escapeRegExp from 'escape-string-regexp';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';

export default class Deputado extends Component {
    static navigationOptions = {
        title: "Deputados Federais"
    };

    state = {
            dados: [],
            search: '',
            dadosSelect: []
        };

    componentDidMount() {
        this.loadDeputados();
    }

    loadDeputados = async () => {
        const response = await api.get('/deputados');

        const { dados } = response.data;

        this.setState({ 
            dados:[...this.state.dados, ...dados],
            dadosSelect:[...this.state.dadosSelect, ...dados]
        });
        console.disableYellowBox = true;
    }

    handleSearch = search => {
        const { dados } = this.state;
        const match = new RegExp(escapeRegExp(search), 'i');
    
        const dadosSelect = dados.filter(_ => match.test(_.nome));
    
        this.setState({ 
            search,
            dadosSelect:[...dadosSelect]
        });
      };
    

    renderItem = ({ item }) => (
            <TouchableOpacity style={styles.productContainer}
            onPress={() => {
                this.props.navigation.navigate('DeputadoDetalhado', { id: item.id, nome:item.nome });
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
        const {dadosSelect} = this.state;
        return (
            <View style={styles.container}>
                
                <Icon name="search" size={20} color="#0094FF"/><TextInput
                onChangeText={this.handleSearch}
                value={dadosSelect}></TextInput>
                
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.dadosSelect}
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
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
        borderColor: '#0066ff',
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
        borderColor: '#fafafa',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    productButtonText: {
        fontSize: 16,
        color: '#fafafa',
        fontWeight: 'bold'
    }


});