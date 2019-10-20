import React, {Component} from 'react';
import api from '../services/api';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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
            status:[]
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        const { navigation } = this.props;
        this.componentDidMount(navigation);
    }

    componentDidMount(navigation) {
        this.loadProjetos(navigation);
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

    render() {
        return (
            <View style={styles.container}>
                <Text>{ this.state.dados.dataApresentacao }</Text>
                <Text>{ this.state.status.regime }</Text>     
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

// const ProjetoDetalhado = ({navigation}) => (
//     <View>
//         <Text>{navigation.state.params.projetoDetalhado.siglaTipo}</Text>
//         <Text>{navigation.state.params.projetoDetalhado.codTipo}</Text>
//         <Text>{navigation.state.params.projetoDetalhado.numero}</Text>
//         <Text>{navigation.state.params.projetoDetalhado.ano}</Text>
//         <Text>{navigation.state.params.projetoDetalhado.ementa}</Text>
//         <Text>{navigation.state.params.projetoDetalhado.dataApresentacao}</Text>
//     </View>   
// );

//     ProjetoDetalhado.navigationOptions = ({ navigation }) => ({
//         title: navigation.state.params.projetoDetalhado.siglaTipo + ' ' +
//                navigation.state.params.projetoDetalhado.numero + '/' +
//                navigation.state.params.projetoDetalhado.ano
//     });

// export default ProjetoDetalhado;