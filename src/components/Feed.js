/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet, 
  FlatList,
  Platform,
  AsyncStorage
} from 'react-native';
import Post from './Post';
import InstaluraFetchService from '../services/InstaluraFetchService';
import Notificacao from '../api/Notificacao';

type Props = {};
export default class Feed extends Component<Props> {

  constructor () {
    super();
    this.state = {
      fotos: [

      ],
      status: ''
    };
  }

  componentDidMount(){

    InstaluraFetchService.get('/fotos')
      .then(json => this.setState({fotos: json}));
  }

  like(idFoto){
    const listaOriginal = this.state.fotos;

    const foto = this.state.fotos.find(foto=>foto.id === idFoto);

    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => {
        let novaLista = [];

        if(!foto.likeada) {
    
        novaLista = [
          ...foto.likers,
          {login: usuarioLogado}
        ]
    
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== usuarioLogado
          })
        }

        return novaLista;
      })
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }
    
        const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);
    
        this.setState({fotos});
      });

      InstaluraFetchService.post(`/fotos/${idFoto}/liker`)
      .catch(e => {
        this.setState({fotos: listaOriginal});
        Notificacao.exibe('Ops', 'Algo deu errado!');
      });
  }

  adicionaComentario(idFoto, valorComentario, inputComentario){
    if(valorComentario === '')
       return;

    const foto = this.state.fotos.find(foto=>foto.id === idFoto);

    InstaluraFetchService.post(`/fotos/${idFoto}/comment`, {texto: valorComentario})
    .then(comentario => [...foto.comentarios, comentario])
    .then(novaLista => {
      const fotoAtualizada = {
        ...foto,
        comentarios: novaLista
      };
  
      const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);
  
      this.setState({fotos});
      inputComentario.clear();
    })
    .catch(e => Notificacao.exibe('Ops', 'Não foi possível adicionar um novo comentário.'));

  }

  render() {

    return (
      <FlatList style={styles.container}
        keyExtractor={item => item.id.toString()} 
        data={this.state.fotos}
        renderItem={ ({item}) => 
          <Post foto={item} 
            likeCallback={this.like.bind(this)}
            comentarioCallback={this.adicionaComentario.bind(this)}></Post>
        }>
      </FlatList>
    );
  }
}

const margem = Platform.OS == 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    marginTop: margem
  }
});