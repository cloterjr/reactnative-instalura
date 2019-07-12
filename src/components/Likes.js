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
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

type Props = {};
export default class Likes extends Component<Props> {

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png');
    }
    
    exibeLikes(likers) {
        if(likers.length <= 0)
          return null;
    
        return (
            <Text style={styles.likes}>
              {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )
    }

    render(){
        const { foto, likeCallback } = this.props;

        return(
            <View>
                <TouchableOpacity onPress={()=>likeCallback(foto.id)}>
                  <Image style={styles.botaoDeLike}
                  source={this.carregaIcone(foto.likeada)}></Image>
                </TouchableOpacity>

                {this.exibeLikes(foto.likers)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    botaoDeLike: {
      marginBottom: 10,
      height: 40,
      width: 40
    },
    likes: {
        fontWeight: 'bold'
    }
  });
