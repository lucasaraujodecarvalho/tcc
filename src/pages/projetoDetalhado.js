import React, {Component} from 'react';
import api from '../services/api';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
export default class projetoDetalhado extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: `${navigation.getParam('siglaTipo')} ${navigation.getParam('numero')}/${navigation.getParam('ano')}`,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            dados:[],
            status:[],
            autores:[]
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        const { navigation } = this.props;
        this.componentDidMount(navigation);
    }

    componentDidMount(navigation) {
        this.loadProjetos(navigation);
        this.loadAutoresProjetos(navigation);
    }

    loadProjetos = async (navigation) => {
        
        const id =  navigation.getParam('id')
        let projetos = await api.get(`/proposicoes/${id}`)
        const { dados } = projetos.data;
        let stateTemp = this.state;
        stateTemp.dados = dados;
        stateTemp.status = dados.statusProposicao;
        this.setState(stateTemp);
        console.disableYellowBox = true;
    }

    loadAutoresProjetos = async (navigation) => {
        const id =  navigation.getParam('id')
        let autores = await api.get(`/proposicoes/${id}/autores`)
        let nomeAutor;

        for (let autor of autores.data.dados) {
            nomeAutor = autor.nome;
        }
        this.state.autores = nomeAutor;
        this.setState(this.state);
    }

    render() {
        return (
            <ScrollView style={styles.productContainer}>
                <Text style={styles.nomeProjeto}>{ this.state.dados.siglaTipo } { this.state.dados.numero }/{ this.state.dados.ano }</Text>
                
                <Text style={styles.palavraNegrito}>Ementa: </Text>
                
                <Text style={styles.separandoItens}>{ this.state.dados.ementa }</Text>
                
                <Text style={styles.palavraNegrito}>Regime:</Text>  
                
                <Text style={styles.separandoItens}>{ this.state.status.regime }</Text>    
                
                <Text style={styles.palavraNegrito}>Despacho: </Text>
                
                <Text style={styles.separandoItens}>{ this.state.status.despacho }</Text> 
                
                <Text style={styles.palavraNegrito}>Ementa Detalhada: </Text> 
                
                <Text style={styles.separandoItens}>{ this.state.dados.ementaDetalhada }</Text>

                <Text style={styles.palavraNegrito}>Autor do Projeto: </Text> 
                
                <Text style={styles.separandoItens}>{ this.state.autores}</Text>

                <Text style={styles.palavraNegrito}></Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fafafa'
    },
    separandoItens:{
        marginBottom: 20
    },
    productContainer: {
        backgroundColor: '#EEE',
        borderWidth: 1,
        borderColor: '#8A2BE2',
        borderRadius: 5,
        padding: 20
    },
    nomeProjeto: {
        fontSize: 16,
        marginTop: 5,
        lineHeight: 24,
        left: 100,
        fontWeight: 'bold'
    },
    palavraNegrito: {
        fontWeight: 'bold'
    },
});