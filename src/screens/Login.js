import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';

const width = Dimensions.get('screen').width;

type Props = {};
export default class Login extends Component<Props> {

    constructor(props){
        super(props);
        this.state = {
            usuario: '',
            senha: '',
            mensagem: ''
        };

        AsyncStorage.getItem('token')
            .then(token => {
                if(token) {
                    this.props.navigation.navigate('Feed');
                }
            })
    }

    efetuaLogin() {
        const uri = "http://10.0.2.2:8080/api/public/login";

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }

        fetch(uri, requestInfo)
            .then(response =>{
                if(response.ok) {
                    return response.text();
                }

                throw new Error("Não foi possível efetuar login");
            })
            .then(token=>{
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('usuario', this.state.usuario);
                this.props.navigation.navigate('Feed');
            })
            .catch(e => this.setState({mensagem: e.message}))
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput placeholder="Usuário..." style={styles.input}
                        onChangeText={texto=>this.setState({usuario: texto})}
                        autoCapitalize="none"></TextInput>
                        
                    <TextInput placeholder="Senha..." style={styles.input}
                        onChangeText={texto=>this.setState({senha: texto})}
                        secureTextEntry={true}></TextInput>
                    
                    <Button title="Login" onPress={this.efetuaLogin.bind(this)}></Button>
                </View>

                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>
            </View>       
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
      fontWeight: 'bold',
      fontSize: 26  
    },
    form: {
        width: width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    mensagem: {
        marginTop: 15,
        color: '#e74c3c'
    }
});