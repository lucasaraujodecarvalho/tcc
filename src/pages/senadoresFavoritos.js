import React, {Component} from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import escapeRegExp from 'escape-string-regexp';

export default class SenadoresFavoritos extends Component {
  static navigationOptions = {
    title: 'Senadores Favoritos',
  };

  state = {
    parlamentar: [],
    dados: [],
    deputadoSelect: [],
    search: '',
    dadosSelect: [],
  };

  componentDidMount() {
    this.setSenadorCheckin();
  }

  setSenadorCheckin = async () => {
    let parlamentar = await AsyncStorage.getItem('senadorCheckin');
    if (parlamentar) {
      parlamentar = JSON.parse(parlamentar);
    } else {
        parlamentar = [];
    }
    this.setState({
        parlamentar: [...this.state.parlamentar, ...parlamentar],
      dadosSelect: [...this.state.dadosSelect, ...parlamentar],
    });
    console.disableYellowBox = true;
    console.log(parlamentar);
  };

  handleSearch = search => {
    const {parlamentar} = this.state;
    const match = new RegExp(escapeRegExp(search), 'i');
    const dadosSelect = parlamentar.filter(_ => match.test(_.nome));
    this.setState({
      search,
      dadosSelect: [...dadosSelect],
    });
  };
  
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
    const {dadosSelect} = this.state;
    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={this.handleSearch}
                value={dadosSelect} 
                placeholder="Pesquisar"
                style={styles.input}>
            </TextInput>
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
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  list: {
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#0066ff',
    margin: 10,
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
    left: 135,
  },
  productDescription: {
    fontSize: 16,
    marginTop: 5,
    lineHeight: 24,
    left: 135,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fafafa',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    color: '#fafafa',
    fontWeight: 'bold',
  },
});
