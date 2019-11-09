import React, {Component} from 'react';
import {  Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { Button } from 'react-native-elements';
export default class Cadastrar extends Component {

    static navigationOptions = {
        title: "Login",
    };

    constructor(props) {
     super(props);
     this.state = {
         email: '',
         senha: ''
     };
    this.logar = this.logar.bind(this);
     }


     logar () {
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.props.navigation.navigate('Main');
                alert('Login com sucesso!');
            }
        })

         firebase.auth().signInWithEmailAndPassword(
             this.state.email, 
             this.state.senha
             ).catch((error)=>{
                if (error.code == 'auth/invalid-email') {
                    alert('E-mail invalido!');
                } else if (error.code == 'auth/wrong-password') {
                    alert("Senha errada!");
                } else {
                    alert('Tente novamente mais tarde !');
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

                   <Button title="Logar" onPress={this.logar} />

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