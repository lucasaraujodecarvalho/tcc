import React, {Component} from 'react';
import api from '../services/api';
import { ScrollView, Text, Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
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
            valorTotal:[],
            valorTotalDespesas:[]
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
        let totalDespesas = ""
                
        for (let gasto of deputado.data.dados) {
            if(gasto.ano == '2019'){
                totalGastos += gasto.valorLiquido; 
                totalDespesas = gasto.tipoDespesa;
            }
        }
        this.state.valorTotal = totalGastos;
        this.state.valorTotalDespesas = totalDespesas;
        this.setState(this.state);
    }

    render() {
        return (
                <ScrollView style={styles.productContainer}>
                    <Image style={styles.imagemCentro}
                    source={{uri: this.state.status.urlFoto}}/>
                    <View style={styles.deputadoContainer}>
                        <Text style={styles.palavraNegrito}>Dados Pessoais: </Text>
                        <Text style={styles.fontColor}>Nome Civil: { this.state.dados.nomeCivil }</Text>
                        <Text>Nome Eleitoral: { this.state.status.nomeEleitoral }</Text> 
                        <Text>UF do Partido: { this.state.status.siglaUf }</Text> 
                        <Text>Sigla Partido: { this.state.status.siglaPartido }</Text> 
                        <Text>Situação do Parlamentar: { this.state.status.situacao }</Text>
                        <Text>Condição Eleitoral: { this.state.status.condicaoEleitoral }</Text>
                        <Text style={styles.separandoItens}>Nascimento: { moment(this.state.dados.dataNascimento).format('DD/MM/YYYY') } { this.state.dados.municipioNascimento }, { this.state.dados.ufNascimento }</Text>

                        <Text style={styles.palavraNegrito} size={20}>CONTATO:</Text>
                        <Text><Icon name='phone'size={14}/> {this.state.gabinete.telefone}</Text> 
                        <Text style={styles.separandoItens}><Icon name='envelope-o' size={14}/> { this.state.gabinete.email }</Text>    
                    
                        <Text style={styles.palavraNegrito} size={20}>GASTOS:</Text>
                        <Text style={styles.palavraNegrito}><Icon name='usd' size={14}/> Total de Gastos 2019-2022: </Text>
                        <Text>R$ {this.state.valorTotal}</Text>
                        <Text style={styles.palavraNegrito}>Principal Despesa:</Text>
                        <Text>{this.state.valorTotalDespesas}</Text>
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
    list: {
        padding: 20
    },
    imagemCentro: {
        left: 100,
        width: 150, 
        height: 195,
        backgroundColor: '#8A2BE2',
        borderWidth: 1,
        borderColor: '#8A2BE2',
        borderRadius: 5
    },
    productContainer: {
        backgroundColor: '#8A2BE2',
        borderWidth: 1,
        borderColor: '#8A2BE2',
        borderRadius: 0
    },
    deputadoContainer: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#8A2BE2',
        borderRadius: 5,
        padding: 20
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
        borderColor: '#8A2BE2',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    icones: {
        padding: 20
    },
    productButtonText: {
        fontSize: 16,
        color: '#8A2BE2',
        fontWeight: 'bold'
    },
    separandoItens:{
        marginBottom: 10
    },
    palavraNegrito: {
        fontWeight: 'bold'
    }


});