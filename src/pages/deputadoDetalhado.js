import React, {Component} from 'react';
import api from '../services/api';
import { View, Text, FlatList, StyleSheet } from 'react-native';
export default class DeputadoDetalhado extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: `DEP. ${navigation.getParam('nome')}`,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            dados:[],
            status:[],
            gabinete:[]
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        const { navigation } = this.props;
        this.componentDidMount(navigation);
        
    }
    

    componentDidMount(navigation) {
        this.loadDeputados(navigation);
    }

    loadDeputados = async (navigation) => {
        
        const id =  navigation.getParam('id')
        let deputado = await api.get(`/deputados/${id}`)
        const { dados } = deputado.data;
        let stateTemp = this.state;
        stateTemp.dados = dados;
        stateTemp.status = dados.ultimoStatus;
        stateTemp.gabinete = dados.ultimoStatus.gabinete;
        this.setState(stateTemp);
        console.disableYellowBox = true;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{ this.state.dados.nomeCivil }</Text>
                <Text>{ this.state.status.nome }</Text> 
                <Text>{ this.state.gabinete.nome }</Text>        
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