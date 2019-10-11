import React from 'react';

import { Text } from 'react-native';

const DeputadoDetalhado = (navigation) => (
    <Text>TESTE DO TESTE</Text>
    
    
);
    // async function deputado(id) {
    // await api.get('/deputados/${id}');
    // }
    DeputadoDetalhado.navigationOptions = ({ navigation }) => ({
        title: 'DEP. ' + navigation.state.params.deputadoDetalhado.nome
    });

export default DeputadoDetalhado;