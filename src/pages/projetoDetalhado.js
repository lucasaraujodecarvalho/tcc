import React from 'react';

import { Text, View } from 'react-native';

const ProjetoDetalhado = ({navigation}) => (
    <View>
        <Text>{navigation.state.params.projetoDetalhado.siglaTipo}</Text>
        <Text>{navigation.state.params.projetoDetalhado.codTipo}</Text>
        <Text>{navigation.state.params.projetoDetalhado.numero}</Text>
        <Text>{navigation.state.params.projetoDetalhado.ano}</Text>
        <Text>{navigation.state.params.projetoDetalhado.ementa}</Text>
        <Text>{navigation.state.params.projetoDetalhado.ementaDetalhada}</Text>
    </View>   
);

    ProjetoDetalhado.navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.projetoDetalhado.siglaTipo + ' ' +
               navigation.state.params.projetoDetalhado.numero + '/' +
               navigation.state.params.projetoDetalhado.ano
    });

export default ProjetoDetalhado;