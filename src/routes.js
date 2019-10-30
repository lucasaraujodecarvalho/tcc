import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';
import Deputado from './pages/deputado';
import DeputadoDetalhado from './pages/deputadoDetalhado';
import Login from './pages/login';
import Projetos from './pages/projetos';
import Senador from './pages/senador';
import ProjetoDetalhado from './pages/projetoDetalhado';

export default createStackNavigator ({
    Main,
    Deputado,
    Login,
    Projetos,
    Senador,
    DeputadoDetalhado,
    ProjetoDetalhado
}, 
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#0066ff"
        },
        headerTintColor: "#FFF"
    },
})
