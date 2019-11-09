import React, {Component} from 'react';
import {  Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { Button } from 'react-native-elements';
export default class Cadastrar extends Component {

    static navigationOptions = {
        title: "Cadastrar",
    };

    constructor(props) {
     super(props);
     this.state = {
         email: '',
         senha: ''
     };
    this.cadastrar = this.cadastrar.bind(this);
     }


     cadastrar () {
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.props.navigation.navigate('Main')
                alert('Cadastrado com sucesso!');
            }
        })

         firebase.auth().createUserWithEmailAndPassword(
             this.state.email, 
             this.state.senha
             ).catch((error)=>{

                if (error.code == 'auth/weak-password') {
                    alert("Sua senha deve ter pelo menos 6 caracteres!");
                }
                if (error.code == 'auth/email-already-in-use') {
                    alert('Este e-mail já possui uma conta.');
                } else if (error.code == 'auth/invalid-email') {
                    alert('E-mail inválido!')
                } else {
                    alert('Ocorreu um erro !');
                }
             })
     }

    render() {
        return (
               <View style={styles.container}>
                   <Text>E-mail:</Text>
                   <TextInput onChangeText={(email)=>this.setState({email})} style={styles.input}></TextInput>

                   <Text>Senha:</Text>
                   <TextInput secureTextEntry={true} onChangeText={(senha)=>this.setState({senha})} style={styles.input}></TextInput>

                   <Button style={styles.separandoBotao} title="Cadastrar" onPress={this.cadastrar} />

                   <TouchableOpacity style={styles.productContainer}
                    onPress={() => {
                    this.props.navigation.navigate('Login');
                    }}>
                    <Text style={styles.text}>Já tenho cadastro</Text>
                    </TouchableOpacity>
               </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:10,
        marginTop:20
    },
    input:{
        height:40,
        borderWidth:1,
        borderColor:'#000000',
        margin:10
    },
    separandoBotao:{
        marginBottom: 10
    },
    text: {
        marginTop: 20,
        color: "#000000",
        textAlign: "center",
        fontSize: 16,
        marginBottom: 15
      }
})