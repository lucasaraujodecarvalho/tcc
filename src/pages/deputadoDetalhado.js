import React, {Component} from 'react';
import api from '../services/api';
import { ScrollView, Text, Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { TextMask } from 'react-native-masked-text'
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
            valorTotalDespesasManutencao:[],
            tipoDespesaManutencao:[],
            valorTotalDespesasCombustivel:[],
            tipoDespesaCombustivel:[],
            valorTotalDespesasDivulgacao:[],
            tipoDespesaDivulgacao:[],
            valorTotalDespesasTelefonia:[],
            tipoDespesaTelefonia:[],
            valorTotalDespesasServicosPostais:[],
            tipoDespesaServicosPostais:[],
            valorTotalDespesasFornecimento:[],
            tipoDespesaFornecimento:[],
            valorTotalDespesasEmissao:[],
            tipoDespesaEmissao:[],
            valorTotalDespesasHospedagem:[],
            tipoDespesaHospedagem:[],
            valorTotalDespesasServico:[],
            tipoDespesaServico:[],
            valorTotalDespesasLocacao:[],
            tipoDespesaLocacao:[],
            valorTotalDespesasConsultorias:[],
            tipoDespesaConsultorias:[],
            valorTotalDespesasPassagens:[],
            tipoDespesaPassagens:[]
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
        let deputado = await api.get(`/deputados/${id}/despesas?ano=2019&itens=100`)
        let totalGastos = 0;
        let tipoDespesasManutencao = '';
        let totalGastosManutencao = 0;
        let tipoDespesasCombustivel = '';
        let totalGastosCombustivel = 0;
        let tipoDespesasDivulgacao = '';
        let totalGastosDivulgacao = 0;
        let tipoDespesasTelefonia = '';
        let totalGastosTelefonia = 0;
        let tipoDespesasServicosPostais = '';
        let totalGastosServicosPostais = 0;
        let tipoDespesasFornecimento = '';
        let totalGastosFornecimento = 0;
        let tipoDespesasEmissao = '';
        let totalGastosEmissao = 0;
        let tipoDespesasHospedagem = '';
        let totalGastosHospedagem = 0;
        let tipoDespesasServico = '';
        let totalGastosServico = 0;
        let tipoDespesasLocacao = '';
        let totalGastosLocacao = 0;
        let tipoDespesasConsultorias = '';
        let totalGastosConsultorias = 0;
        let tipoDespesasPassagens = '';
        let totalGastosPassagens = 0;
                
        for (let gasto of deputado.data.dados) {
            if(gasto.ano == '2019'){
                totalGastos += gasto.valorLiquido; 
            }
            if(gasto.tipoDespesa == 'MANUTENÇÃO DE ESCRITÓRIO DE APOIO À ATIVIDADE PARLAMENTAR'){
                totalGastosManutencao += gasto.valorLiquido; 
                tipoDespesasManutencao = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'COMBUSTÍVEIS E LUBRIFICANTES.'){
                totalGastosCombustivel += gasto.valorLiquido; 
                tipoDespesasCombustivel = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'DIVULGAÇÃO DA ATIVIDADE PARLAMENTAR.'){
                totalGastosDivulgacao += gasto.valorLiquido; 
                tipoDespesasDivulgacao = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'TELEFONIA'){
                totalGastosTelefonia += gasto.valorLiquido; 
                tipoDespesasTelefonia = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'SERVIÇOS POSTAIS'){
                totalGastosServicosPostais += gasto.valorLiquido; 
                tipoDespesasServicosPostais = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'FORNECIMENTO DE ALIMENTAÇÃO DO PARLAMENTAR'){
                totalGastosFornecimento += gasto.valorLiquido; 
                tipoDespesasFornecimento = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'Emissão Bilhete Aéreo'){
                totalGastosEmissao += gasto.valorLiquido; 
                tipoDespesasEmissao = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'HOSPEDAGEM ,EXCETO DO PARLAMENTAR NO DISTRITO FEDERAL.'){
                totalGastosHospedagem += gasto.valorLiquido; 
                tipoDespesasHospedagem = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'SERVIÇO DE TÁXI, PEDÁGIO E ESTACIONAMENTO'){
                totalGastosServico += gasto.valorLiquido; 
                tipoDespesasServico = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'LOCAÇÃO OU FRETAMENTO DE VEÍCULOS AUTOMOTORES'){
                totalGastosManutencao += gasto.valorLiquido; 
                tipoDespesasManutencao = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'CONSULTORIAS, PESQUISAS E TRABALHOS TÉCNICOS.'){
                totalGastosConsultorias += gasto.valorLiquido; 
                tipoDespesasConsultorias = gasto.tipoDespesa;
            }
            if(gasto.tipoDespesa == 'PASSAGENS AÉREAS'){
                totalGastosPassagens += gasto.valorLiquido; 
                tipoDespesasPassagens = gasto.tipoDespesa;
            }
        }
        this.state.valorTotal = totalGastos;
        this.state.valorTotalManutencao = totalGastosManutencao;
        this.state.tipoDespesaManutencao = tipoDespesasManutencao;
        this.state.valorTotalDespesasCombustivel = totalGastosCombustivel;
        this.state.tipoDespesaCombustivel = tipoDespesasCombustivel;
        this.state.valorTotalDespesasDivulgacao = totalGastosDivulgacao;
        this.state.tipoDespesaDivulgacao = tipoDespesasDivulgacao;
        this.state.valorTotalDespesasTelefonia = totalGastosTelefonia;
        this.state.tipoDespesaTelefonia = tipoDespesasTelefonia;
        this.state.valorTotalDespesasServicosPostais = totalGastosServicosPostais;
        this.state.tipoDespesaServicosPostais = tipoDespesasServicosPostais;
        this.state.valorTotalDespesasFornecimento = totalGastosFornecimento;
        this.state.tipoDespesaFornecimento = tipoDespesasFornecimento;
        this.state.valorTotalDespesasEmissao = totalGastosEmissao;
        this.state.tipoDespesaEmissao = tipoDespesasEmissao;
        this.state.valorTotalDespesasHospedagem = totalGastosHospedagem;
        this.state.tipoDespesaHospedagem = tipoDespesasHospedagem;
        this.state.valorTotalDespesasServico = totalGastosServico;
        this.state.tipoDespesaServico = tipoDespesasServico;
        this.state.valorTotalDespesasLocacao = totalGastosLocacao;
        this.state.tipoDespesaLocacao = tipoDespesasLocacao;
        this.state.valorTotalDespesasConsultorias = totalGastosConsultorias;
        this.state.tipoDespesaConsultorias = tipoDespesasConsultorias;
        this.state.valorTotalDespesasPassagens = totalGastosPassagens;
        this.state.tipoDespesaPassagens = tipoDespesasPassagens;
        this.setState(this.state);
    }

    render() {
        return (
                <ScrollView style={styles.productContainer}>
                    <Image style={styles.imagemCentro}
                    source={{uri: this.state.status.urlFoto}}/>
                    <View style={styles.deputadoContainer}>
                        <Text style={styles.palavraNegrito}>Dados Pessoais: </Text>
                        <Text>Nome Civil: { this.state.dados.nomeCivil }</Text>
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
                        <TextMask type={'money'} value={this.state.valorTotal}>R$ </TextMask>
                        <Text style={styles.palavraNegrito}>Principais Despesas:</Text>
                        
                        {this.state.tipoDespesaManutencao ? <Text>Manutenção de Escritório de apoio á atividade parlamentar: </Text> : null}
                        {this.state.tipoDespesaManutencao ? <TextMask  type={'money'} value={this.state.valorTotalManutencao}/> : null}

                        {this.state.tipoDespesaCombustivel ? <Text>Divulgação da atividade parlamentar: </Text> : null}
                        {this.state.tipoDespesaCombustivel ? <TextMask type={'money'} value={this.state.valorTotalDespesasCombustivel}/> : null}

                        {this.state.tipoDespesaDivulgacao ? <Text>Telefonia: </Text> : null}
                        {this.state.tipoDespesaDivulgacao ? <TextMask type={'money'} value={this.state.valorTotalDespesasDivulgacao}/> : null}

                        {this.state.tipoDespesaTelefonia ? <Text>Serviços Postais: </Text> : null}
                        {this.state.tipoDespesaTelefonia ? <TextMask type={'money'} value={this.state.valorTotalDespesasTelefonia}/> : null}

                        {this.state.tipoDespesaServicosPostais ? <Text>Fornecimento de alimentação do parlamentar: </Text> : null}
                        {this.state.tipoDespesaServicosPostais ? <TextMask type={'money'} value={this.state.valorTotalDespesasServicosPostais}>{this.state.tipoDespesaServicosPostais}</TextMask> : null}

                        {this.state.tipoDespesaFornecimento ? <Text>Emissão bilhete aéreo: </Text> : null}
                        {this.state.tipoDespesaFornecimento ? <TextMask type={'money'} value={this.state.valorTotalDespesasFornecimento}/> : null}

                        {this.state.tipoDespesaEmissao ? <Text>Hospedagem, Exceto do parlamentar no Distrito Federal: </Text> : null}
                        {this.state.tipoDespesaEmissao ? <TextMask type={'money'} value={this.state.valorTotalDespesasEmissao}/> : null}

                        {this.state.tipoDespesaHospedagem ? <Text>Serviço de táxi, pedágio e estacionamento: </Text> : null}
                        {this.state.tipoDespesaHospedagem ? <TextMask type={'money'} value={this.state.valorTotalDespesasHospedagem}/> : null}

                        {this.state.tipoDespesaServico ? <Text>Locação ou fretamento de veículos automotores: </Text> : null}
                        {this.state.tipoDespesaServico ? <TextMask type={'money'} value={this.state.valorTotalDespesasServico}/> : null}
                        
                        {this.state.tipoDespesaConsultorias ? <Text>Consultorias, pesquisas e trabalhos técnicos: </Text> : null}
                        {this.state.tipoDespesaConsultorias ? <TextMask type={'money'} value={this.state.valorTotalDespesasConsultorias}/> : null}

                        {this.state.tipoDespesaPassagens ? <Text>Passagens Aéreas: </Text> : null}
                        {this.state.tipoDespesaPassagens ? <TextMask type={'money'} value={this.state.valorTotalDespesasPassagens}/> : null}

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