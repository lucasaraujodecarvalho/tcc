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
import Favoritos from './pages/favoritos';
import DeputadosFavoritos from './pages/deputadosFavoritos';
import SenadoresFavoritos from './pages/senadoresFavoritos';

export default createStackNavigator ({
    Login,
    Cadastrar,
    Main,
    Deputado,
    Projetos,
    Senador,
    DeputadoDetalhado,
    ProjetoDetalhado,
    SenadorDetalhado,
    Favoritos,
    DeputadosFavoritos,
    SenadoresFavoritos
}, 
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#0066ff"
        },
        headerTintColor: "#FFF"
    },
})
