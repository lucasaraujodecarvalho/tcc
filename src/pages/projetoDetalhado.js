import React from 'react';

import { Text } from 'react-native';

const ProjetoDetalhado = (navigation) => (
    <Text>TESTE DO TESTE DO ProjetosDetalhado</Text>
);

    ProjetoDetalhado.navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.projetoDetalhado.siglaTipo + ' ' +
               navigation.state.params.projetoDetalhado.numero + '/' +
               navigation.state.params.projetoDetalhado.ano
    });

export default ProjetoDetalhado;