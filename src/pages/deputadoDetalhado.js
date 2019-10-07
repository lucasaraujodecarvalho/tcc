import React from 'react';

import { Text } from 'react-native';

const DeputadoDetalhado = (navigation) => (
    <Text>TESTE DO TESTE</Text>
);

    DeputadoDetalhado.navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deputadoDetalhado.nome
    });

export default DeputadoDetalhado;