import React, {Component} from 'react';
import api from '../services/apiSenado';
import { Text, StyleSheet, ScrollView, View, Image } from 'react-native';
import moment from 'moment';
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
            // suplentes: [],
            // primeiroSuplente:[],
            // primeiroSuplenteNome: [],
            // segundoSuplente: [],
            // segundoSuplenteNome: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
                
    }

    componentDidMount() { 
        const { navigation } = this.props;
        this.loadSenadores(navigation);
        // this.loadSenadoresSuplentes(navigation);
    }

    
    loadSenadores = async (navigation) => {
        const CodigoParlamentar =  navigation.getParam('CodigoParlamentar')
        let senadores = await api.get(`/senador/${CodigoParlamentar}.json`);
        const { Parlamentar } = senadores.data.DetalheParlamentar;
        console.log(Parlamentar);
        let stateTemp = this.state;

        stateTemp.parlamentar = Parlamentar;
        stateTemp.identificacaoParlamentar = Parlamentar.IdentificacaoParlamentar;
        stateTemp.dadosBasicosParlamentar = Parlamentar.DadosBasicosParlamentar;
        // stateTemp.suplentes = Parlamentar.MandatoAtual;

        this.setState(stateTemp);
        console.disableYellowBox = true;
    }

    // loadSenadoresSuplentes = async (navigation) => {
    //     const CodigoParlamentar =  navigation.getParam('CodigoParlamentar')
    //     let senadores = await api.get(`/senador/${CodigoParlamentar}.json`);
    //     console.log(senadores);

    //     let suplentePrimeiro;
    //     let nomeParlamentarPrimeiro;
    //     let suplenteSegundo;
    //     let nomeParlamentarSegundo;

    //     for (let Parlamentar of senadores.data.DetalheParlamentar) {
    //         if (Suplente.DescricaoParticipacao == '1º Suplente') {
    //             suplentePrimeiro = Parlamentar.MandatoAtual.Suplentes.Suplente.DescricaoParticipacao;
    //             nomeParlamentarPrimeiro = Parlamentar.MandatoAtual.Suplentes.Suplente.NomeParlamentar;
    //         }
    //         // suplenteSegundo = Suplente.DescricaoParticipacao;
    //         // nomeParlamentarSegundo = Suplente.NomeParlamentar;

    //     }
    //    this.state.primeiroSuplente = suplentePrimeiro;
    //    this.state.primeiroSuplenteNome = nomeParlamentarPrimeiro;
    //    this.setState(this.state);
    // }

    render() {
        return (
            <ScrollView style={styles.productContainer}>
                <Image style={styles.imagemCentro}
                    source={{uri: this.state.identificacaoParlamentar.UrlFotoParlamentar}}/>
                <View style={styles.deputadoContainer}>
                <Text style={styles.palavraNegrito}>Dados Pessoais: </Text>
                <Text>Nome Parlamentar: {this.state.identificacaoParlamentar.NomeParlamentar}</Text>
                <Text>Nome Completo: {this.state.identificacaoParlamentar.NomeCompletoParlamentar}</Text>
                <Text>Sexo: {this.state.identificacaoParlamentar.SexoParlamentar}</Text>
                <Text>Data Nascimento: {moment (this.state.dadosBasicosParlamentar.DataNascimento).format('DD/MM/YYYY')}</Text>
                <Text>Sigla Partido: {this.state.identificacaoParlamentar.SiglaPartidoParlamentar}/{this.state.identificacaoParlamentar.UfParlamentar}</Text>
                <Text style={styles.separandoItens}>Naturalidade: {this.state.dadosBasicosParlamentar.Naturalidade}/{this.state.dadosBasicosParlamentar.UfNaturalidade}</Text>

                <Text style={styles.palavraNegrito} size={20}>CONTATO:</Text>
                <Text>Email: {this.state.identificacaoParlamentar.EmailParlamentar}</Text>
                <Text  style={styles.separandoItens}>Endereço Parlamentar: {this.state.dadosBasicosParlamentar.EnderecoParlamentar}</Text>
                {/* <Text>Teste: {this.state.suplentes.DescricaoParticipacao}</Text> */}
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