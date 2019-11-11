import React, {Component} from 'react';
import api from '../services/apiSenado';
import { Text, StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
export default class SenadorDetalhado extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: `Sen. ${navigation.getParam('NomeParlamentar')}`,
        };
    };

     constructor(props) {
        super(props);
        this.state = {
            parlamentar:[],
            identificacaoParlamentar: [],
            dadosBasicosParlamentar: [],
            mandatoAtual: [],
            primeiroSuplente:[],
            primeiroSuplenteNome: [],
            segundoSuplente: [],
            segundoSuplenteNome: [],
            materia:[],
            descricao:[]
        }
        this.componentDidMount = this.componentDidMount.bind(this);
                
    }

    componentDidMount() { 
        const { navigation } = this.props;
        this.loadSenadores(navigation);
        this.loadSuplentes(navigation);
    }

    
    loadSenadores = async (navigation) => {
        const CodigoParlamentar =  navigation.getParam('CodigoParlamentar')
        let senadores = await api.get(`/senador/${CodigoParlamentar}.json`);
        const { Parlamentar } = senadores.data.DetalheParlamentar;
        let stateTemp = this.state;

        stateTemp.parlamentar = Parlamentar;
        stateTemp.identificacaoParlamentar = Parlamentar.IdentificacaoParlamentar;
        stateTemp.dadosBasicosParlamentar = Parlamentar.DadosBasicosParlamentar;
        this.setState(stateTemp);
        console.disableYellowBox = true;
    }

    loadSuplentes = async (navigation) => {
        let CodigoParlamentar =  navigation.getParam('CodigoParlamentar')
        let parlamentarSuplente = await api.get(`/senador/${CodigoParlamentar}.json`);
        let suplentePrimeiro;
        let nomeParlamentarPrimeiro;
        let suplenteSegundo;
        let nomeParlamentarSegundo;

        for (let Parlamentar of parlamentarSuplente.data.DetalheParlamentar.Parlamentar.MandatoAtual.Suplentes.Suplente) {
            if (Parlamentar.DescricaoParticipacao == '1º Suplente') {
                suplentePrimeiro = Parlamentar.DescricaoParticipacao;
                nomeParlamentarPrimeiro = Parlamentar.NomeParlamentar;
            } else {
                suplenteSegundo = Parlamentar.DescricaoParticipacao;
                nomeParlamentarSegundo = Parlamentar.NomeParlamentar;
            }
        }
       this.state.primeiroSuplente = suplentePrimeiro;
       this.state.primeiroSuplenteNome = nomeParlamentarPrimeiro;
       this.state.segundoSuplente = suplenteSegundo;
       this.state.segundoSuplenteNome = nomeParlamentarSegundo;
       this.setState(this.state);
    }

    favoritar() {
        alert('Favoritou!');
    }

    render() {
        return (
            <ScrollView style={styles.productContainer}>
                 {/* <Icon name='star' size={30}></Icon> */}
                <TouchableOpacity onPress={this.favoritar}>
                <Icon name='star-o' size={30}></Icon>
                </TouchableOpacity>
                <Image style={styles.imagemCentro}
                    source={{uri: this.state.identificacaoParlamentar.UrlFotoParlamentar}}/>
                <View style={styles.deputadoContainer}>
                <Text style={styles.palavraNegrito}>DADOS PESSOAIS: </Text>
                <Text>Nome Parlamentar: {this.state.identificacaoParlamentar.NomeParlamentar}</Text>
                <Text>Nome Completo: {this.state.identificacaoParlamentar.NomeCompletoParlamentar}</Text>
                <Text>Sexo: {this.state.identificacaoParlamentar.SexoParlamentar}</Text>
                <Text>Data Nascimento: {moment (this.state.dadosBasicosParlamentar.DataNascimento).format('DD/MM/YYYY')}</Text>
                <Text>Sigla Partido: {this.state.identificacaoParlamentar.SiglaPartidoParlamentar}/{this.state.identificacaoParlamentar.UfParlamentar}</Text>
                <Text style={styles.separandoItens}>Naturalidade: {this.state.dadosBasicosParlamentar.Naturalidade}/{this.state.dadosBasicosParlamentar.UfNaturalidade}</Text>

                <Text style={styles.palavraNegrito} size={20}>CONTATO:</Text>
                <Text>Email: {this.state.identificacaoParlamentar.EmailParlamentar}</Text>
                <Text style={styles.separandoItens}>Endereço Parlamentar: {this.state.dadosBasicosParlamentar.EnderecoParlamentar}</Text>
                
                <Text style={styles.palavraNegrito} size={20}>SUPLENTES:</Text>
                <Text>{this.state.primeiroSuplente}: {this.state.primeiroSuplenteNome}</Text>
                <Text style={styles.separandoItens}>{this.state.segundoSuplente}: {this.state.segundoSuplenteNome}</Text>
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
        backgroundColor: '#0066ff',
        borderWidth: 1,
        borderColor: '#0066ff',
        borderRadius: 5
    },
    productContainer: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#0066ff',
        borderRadius: 0
    },
    deputadoContainer: {
        backgroundColor: '#EEE',
        borderWidth: 1,
        borderColor: '#0066ff',
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
        borderColor: '#0066ff',
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
        color: '#0066ff',
        fontWeight: 'bold'
    },
    separandoItens:{
        marginBottom: 10
    },
    palavraNegrito: {
        fontWeight: 'bold'
    }

});