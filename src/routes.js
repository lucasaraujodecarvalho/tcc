import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';
import Deputado from './pages/deputado';
import DeputadoDetalhado from './pages/deputadoDetalhado';
import Cadastrar from './pages/cadastrar';
import Projetos from './pages/projetos';
import Senador from './pages/senador';
import ProjetoDetalhado from './pages/projetoDetalhado';
import SenadorDetalhado from './pages/senadorDetalhado';
import Login from './pages/login';

export default createStackNavigator ({
    Main,
    Deputado,
    Cadastrar,
    Projetos,
    Senador,
    DeputadoDetalhado,
    ProjetoDetalhado,
    SenadorDetalhado,
    Login
}, 
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#0066ff"
        },
        headerTintColor: "#FFF"
    },
})
