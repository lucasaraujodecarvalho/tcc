import React, {Component} from 'react';
import api from '../services/api';
import { View, Text, Image, StyleSheet } from 'react-native';
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
            gabinete:[],
            valorTotal:[]
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        const { navigation } = this.props;
        this.componentDidMount(navigation);
        
    }
    

    componentDidMount(navigation) {
        this.loadDeputados(navigation);
        this.loadDeputadosGastos(navigation);
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
    }

    loadDeputadosGastos = async (navigation) => {
        const id =  navigation.getParam('id')
        let deputado = await api.get(`/deputados/${id}/despesas`)
        let totalGastos = 0;
                
        for (let gasto of deputado.data.dados) {
            if(gasto.ano=='2019'){
                totalGastos += gasto.valorLiquido;      
            }
        }
        this.state.valorTotal = totalGastos;
        this.setState(this.state);
    }

    render() {
        return (
                <View>
                    <Image style={styles.imagemCentro}
                    source={{uri: this.state.status.urlFoto}}/>
                    <Text style={styles.nomeDeputado}>{ this.state.dados.nomeCivil }</Text>
                    <Text>{ this.state.status.nomeEleitoral }</Text> 
                    <Text>{ this.state.status.siglaUf }</Text> 
                    <Text>{ this.state.status.siglaPartido }</Text> 
                    <Text>{ this.state.gabinete.telefone }</Text> 
                    <Text>{ this.state.gabinete.email }</Text>      
                    <Text>{ this.state.status.situacao }</Text>
                    <Text>{ this.state.status.condicaoEleitoral }</Text>
                    <Text>{ this.state.dados.dataNascimento }</Text>
                    <Text>{ this.state.dados.ufNascimento }</Text>
                    <Text>{ this.state.dados.municipioNascimento }</Text>
                    <Text> Total de Gastos em 2019: R$ {this.state.valorTotal}</Text>
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
        left: 100,
        width:160, 
        height: 195,
        backgroundColor: '#0066ff',
        borderWidth: 1,
        borderColor: '#0066ff',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
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