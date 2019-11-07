import React, {Component} from 'react';
import api from '../services/apiSenado';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default class Senador extends Component {
    static navigationOptions = {
        title: "Senadores"
    };

    state = {
        Parlamentar: []
    };

    componentDidMount() {
        this.loadSenadores();
    }

    loadSenadores = async () => {
        const response = await api.get('/senador/lista/atual.json');

        const { Parlamentar } = response.data.ListaParlamentarEmExercicio.Parlamentares;

        this.setState({ 
            Parlamentar:[...this.state.Parlamentar, ...Parlamentar]
        });
        console.disableYellowBox = true;
    }

    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.productContainer}
        onPress={() => {
            this.props.navigation.navigate('SenadorDetalhado', { CodigoParlamentar: item.IdentificacaoParlamentar.CodigoParlamentar, NomeParlamentar:item.IdentificacaoParlamentar.NomeParlamentar });
        }}>
            <ImageBackground 
                style={{ width:125, height: 125 }}
                source={{uri: item.IdentificacaoParlamentar.UrlFotoParlamentar}}>
                <Text style={styles.nomeDeputado}>{item.IdentificacaoParlamentar.NomeParlamentar}</Text>
                <Text style={styles.productDescription}>{item.IdentificacaoParlamentar.SiglaPartidoParlamentar}/{item.IdentificacaoParlamentar.UfParlamentar}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.Parlamentar}
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