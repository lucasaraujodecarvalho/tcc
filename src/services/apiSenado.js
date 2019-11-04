import axios from 'axios';

const apiSenado = axios.create({
    baseURL: 'http://legis.senado.leg.br/dadosabertos'
});

export default apiSenado;